import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import {
  mkdir,
  readdir,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { join, resolve, sep } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ROOT_DIRECTORY = join(process.cwd(), "public", "assets", "investor_pdf");
const ADMIN_ROLES = new Set(["Admin", "SuperAdmin"]);
const DEFAULT_PAGE_SIZE = 100;
const MAX_PAGE_SIZE = 500;
const BOOTSTRAP_CACHE_TTL_MS = 30_000;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CMS_API_BASE ||
  "http://127.0.0.1:9000/";
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};
let bootstrapCache = {
  value: null,
  expiresAt: 0,
};

const parsePathParts = (input = "") =>
  String(input || "")
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

const normalizePath = (input = "") => parsePathParts(input).join("/");

const encodePath = (input = "") =>
  normalizePath(input)
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");

const sanitizeName = (input = "") =>
  String(input || "")
    .normalize("NFKC")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const getParentPath = (input = "") => {
  const parts = parsePathParts(input);
  parts.pop();
  return parts.join("/");
};

const parsePositiveInteger = (input, fallback) => {
  const parsed = Number.parseInt(String(input ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

const toJson = (payload, status = 200) =>
  NextResponse.json(payload, {
    status,
    headers: NO_STORE_HEADERS,
  });

const resolveWithinRoot = (relativeInput = "") => {
  const relativePath = normalizePath(relativeInput);
  const absoluteRoot = resolve(ROOT_DIRECTORY);
  const absolutePath = resolve(absoluteRoot, relativePath || ".");

  if (absolutePath !== absoluteRoot && !absolutePath.startsWith(absoluteRoot + sep)) {
    throw new Error("Invalid path.");
  }

  return { relativePath, absolutePath, absoluteRoot };
};

const decodeJwtPayload = (token = "") => {
  const [_, payloadToken] = String(token || "").split(".");

  if (!payloadToken) {
    return {};
  }

  try {
    return JSON.parse(Buffer.from(payloadToken, "base64url").toString("utf8"));
  } catch {
    try {
      return JSON.parse(Buffer.from(payloadToken, "base64").toString("utf8"));
    } catch {
      return {};
    }
  }
};

const getTokenFromRequest = (request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((entry) => entry.trim());

  for (const entry of cookies) {
    const equalIndex = entry.indexOf("=");
    if (equalIndex <= 0) {
      continue;
    }

    const key = entry.slice(0, equalIndex).trim();
    if (key !== "token") {
      continue;
    }

    const value = entry.slice(equalIndex + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  const authorizationHeader = request.headers.get("authorization") || "";
  if (/^Bearer\s+/i.test(authorizationHeader)) {
    return authorizationHeader.replace(/^Bearer\s+/i, "").trim();
  }

  return "";
};

const ensureAdmin = async (request) => {
  const token = getTokenFromRequest(request);

  if (!token) {
    return {
      ok: false,
      response: toJson({ message: "Unauthorized request." }, 401),
    };
  }

  try {
    const verifyUrl = new URL("public/auth/verify", API_BASE_URL);
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ token }),
    });

    if (!verifyResponse.ok) {
      return {
        ok: false,
        response: toJson({ message: "Session expired. Please login again." }, 401),
      };
    }
  } catch {
    return {
      ok: false,
      response: toJson({ message: "Unable to verify admin session." }, 503),
    };
  }

  const payload = decodeJwtPayload(token);
  if (!ADMIN_ROLES.has(payload.role)) {
    return {
      ok: false,
      response: toJson({ message: "Access denied." }, 403),
    };
  }

  return { ok: true };
};

const readDirectoryTree = async (relativePath = "") => {
  const { absolutePath } = resolveWithinRoot(relativePath);
  const entries = await readdir(absolutePath, { withFileTypes: true });
  const nodes = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    if (!entry.isDirectory()) {
      continue;
    }

    const nextRelativePath = [relativePath, entry.name].filter(Boolean).join("/");
    const children = await readDirectoryTree(nextRelativePath);
    nodes.push({
      type: "directory",
      name: entry.name,
      path: normalizePath(nextRelativePath),
      children,
    });
  }

  nodes.sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: "base" }));

  return nodes;
};

const summarizeDirectory = async (relativePath = "") => {
  const { absolutePath } = resolveWithinRoot(relativePath);
  const entries = await readdir(absolutePath, { withFileTypes: true });
  let fileCount = 0;
  let folderCount = 0;
  let totalBytes = 0;

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const nextRelativePath = [relativePath, entry.name].filter(Boolean).join("/");

    if (entry.isDirectory()) {
      folderCount += 1;
      const summary = await summarizeDirectory(nextRelativePath);
      fileCount += summary.fileCount;
      folderCount += summary.folderCount;
      totalBytes += summary.totalBytes;
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".pdf")) {
      continue;
    }

    const { absolutePath: fileAbsolutePath } = resolveWithinRoot(nextRelativePath);
    const info = await stat(fileAbsolutePath);
    fileCount += 1;
    totalBytes += Number(info.size || 0);
  }

  return { fileCount, folderCount, totalBytes };
};

const buildBootstrapPayload = async () => {
  const [children, summary] = await Promise.all([readDirectoryTree(""), summarizeDirectory("")]);

  return {
    root: {
      type: "directory",
      name: "investor_pdf",
      path: "",
      children,
    },
    summary,
  };
};

const getBootstrapPayload = async () => {
  const now = Date.now();
  if (bootstrapCache.value && bootstrapCache.expiresAt > now) {
    return bootstrapCache.value;
  }

  const nextValue = await buildBootstrapPayload();
  bootstrapCache = {
    value: nextValue,
    expiresAt: now + BOOTSTRAP_CACHE_TTL_MS,
  };
  return nextValue;
};

const invalidateBootstrapCache = () => {
  bootstrapCache = {
    value: null,
    expiresAt: 0,
  };
};

const ensurePdfFileName = (input = "") => {
  const normalized = sanitizeName(input).replace(/\.pdf$/i, "");
  return `${normalized || `document-${Date.now()}`}.pdf`;
};

const uploadFiles = async (formData) => {
  const targetPath = String(formData.get("targetPath") || "");
  const { relativePath: safeTargetPath, absolutePath: targetAbsolutePath } =
    resolveWithinRoot(targetPath);
  await mkdir(targetAbsolutePath, { recursive: true });

  const files = formData.getAll("files");
  if (!files.length) {
    throw new Error("Select at least one PDF file to upload.");
  }

  const uploadedPaths = [];

  for (const currentFile of files) {
    if (!(currentFile instanceof File)) {
      continue;
    }

    const originalName = String(currentFile.name || "").trim();
    if (!originalName.toLowerCase().endsWith(".pdf")) {
      throw new Error("Only .pdf files are allowed.");
    }

    const fileName = ensurePdfFileName(originalName);
    const relativeFilePath = [safeTargetPath, fileName].filter(Boolean).join("/");
    const { absolutePath: fileAbsolutePath } = resolveWithinRoot(relativeFilePath);

    const fileBuffer = Buffer.from(await currentFile.arrayBuffer());
    await writeFile(fileAbsolutePath, fileBuffer);
    uploadedPaths.push(relativeFilePath);
  }

  if (!uploadedPaths.length) {
    throw new Error("No valid files were uploaded.");
  }

  return {
    message:
      uploadedPaths.length === 1
        ? "PDF uploaded successfully."
        : `${uploadedPaths.length} PDF files uploaded successfully.`,
  };
};

const createFolder = async (payload = {}) => {
  const parentPath = String(payload.parentPath || "");
  const folderName = sanitizeName(payload.folderName || "");

  if (!folderName) {
    throw new Error("Folder name is required.");
  }

  const relativeFolderPath = [normalizePath(parentPath), folderName].filter(Boolean).join("/");
  const { absolutePath } = resolveWithinRoot(relativeFolderPath);
  await mkdir(absolutePath, { recursive: true });
  return { message: "Folder created successfully." };
};

const renameEntry = async (payload = {}) => {
  const targetPath = normalizePath(payload.targetPath || "");
  const requestedName = sanitizeName(payload.newName || "");

  if (!targetPath) {
    throw new Error("Root folder cannot be renamed.");
  }

  if (!requestedName) {
    throw new Error("New name is required.");
  }

  const { absolutePath: sourceAbsolutePath, relativePath: sourceRelativePath } =
    resolveWithinRoot(targetPath);
  const sourceStat = await stat(sourceAbsolutePath);

  const finalName = sourceStat.isFile() ? ensurePdfFileName(requestedName) : requestedName;
  const parentPath = getParentPath(sourceRelativePath);
  const destinationRelativePath = [parentPath, finalName].filter(Boolean).join("/");
  const { absolutePath: destinationAbsolutePath } = resolveWithinRoot(destinationRelativePath);

  if (sourceAbsolutePath === destinationAbsolutePath) {
    throw new Error("Source and destination names are same.");
  }

  await rename(sourceAbsolutePath, destinationAbsolutePath);
  return { message: "Renamed successfully." };
};

const deleteEntry = async (payload = {}) => {
  const targetPath = normalizePath(payload.targetPath || "");
  if (!targetPath) {
    throw new Error("Root folder cannot be deleted.");
  }

  const { absolutePath } = resolveWithinRoot(targetPath);
  const targetStat = await stat(absolutePath);

  if (targetStat.isDirectory()) {
    await rm(absolutePath, { recursive: true, force: true });
    return { message: "Folder deleted successfully." };
  }

  await unlink(absolutePath);
  return { message: "File deleted successfully." };
};

const moveEntry = async (payload = {}) => {
  const sourcePath = normalizePath(payload.sourcePath || "");
  const destinationFolderPath = normalizePath(payload.destinationFolderPath || "");

  if (!sourcePath) {
    throw new Error("Select an item to move.");
  }

  const { absolutePath: sourceAbsolutePath, relativePath: sourceRelativePath } =
    resolveWithinRoot(sourcePath);
  const sourceStat = await stat(sourceAbsolutePath);
  const sourceName = sourceRelativePath.split("/").filter(Boolean).pop() || "";

  const {
    absolutePath: destinationFolderAbsolutePath,
    relativePath: destinationFolderRelativePath,
  } = resolveWithinRoot(destinationFolderPath);
  await mkdir(destinationFolderAbsolutePath, { recursive: true });

  if (
    sourceStat.isDirectory() &&
    destinationFolderRelativePath &&
    destinationFolderRelativePath.startsWith(`${sourceRelativePath}/`)
  ) {
    throw new Error("A folder cannot be moved inside itself.");
  }

  const destinationRelativePath = [destinationFolderRelativePath, sourceName]
    .filter(Boolean)
    .join("/");
  const { absolutePath: destinationAbsolutePath } = resolveWithinRoot(destinationRelativePath);

  if (sourceAbsolutePath === destinationAbsolutePath) {
    throw new Error("Item is already in the selected folder.");
  }

  await rename(sourceAbsolutePath, destinationAbsolutePath);
  return { message: "Moved successfully." };
};

const listFolderEntries = async ({
  relativePath = "",
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
}) => {
  const normalizedRelativePath = normalizePath(relativePath);
  const normalizedSearch = String(search || "").trim().toLowerCase();
  const { absolutePath } = resolveWithinRoot(normalizedRelativePath);
  const entries = await readdir(absolutePath, { withFileTypes: true });

  const visibleEntries = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const isDirectory = entry.isDirectory();
    const isPdfFile = entry.isFile() && entry.name.toLowerCase().endsWith(".pdf");
    if (!isDirectory && !isPdfFile) {
      continue;
    }

    if (normalizedSearch && !entry.name.toLowerCase().includes(normalizedSearch)) {
      continue;
    }

    const nextRelativePath = [normalizedRelativePath, entry.name].filter(Boolean).join("/");
    visibleEntries.push({
      type: isDirectory ? "directory" : "file",
      name: entry.name,
      path: normalizePath(nextRelativePath),
    });
  }

  visibleEntries.sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === "directory" ? -1 : 1;
    }
    return left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
  });

  const total = visibleEntries.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedEntries = visibleEntries.slice(startIndex, startIndex + pageSize);

  const detailedEntries = await Promise.all(
    pagedEntries.map(async (entry) => {
      if (entry.type === "directory") {
        return {
          ...entry,
          size: 0,
          updatedAt: "",
          url: "",
        };
      }

      const { absolutePath: fileAbsolutePath } = resolveWithinRoot(entry.path);
      const info = await stat(fileAbsolutePath);
      return {
        ...entry,
        size: info.size,
        updatedAt: info.mtime.toISOString(),
        url: `/assets/investor_pdf/${encodePath(entry.path)}?v=${Math.trunc(info.mtimeMs)}`,
      };
    }),
  );

  return {
    path: normalizedRelativePath,
    entries: detailedEntries,
    pagination: {
      page: safePage,
      pageSize,
      total,
      totalPages,
      hasPreviousPage: safePage > 1,
      hasNextPage: safePage < totalPages,
    },
  };
};

export async function GET(request) {
  const authState = await ensureAdmin(request);
  if (!authState.ok) {
    return authState.response;
  }

  try {
    await mkdir(ROOT_DIRECTORY, { recursive: true });
    const requestUrl = new URL(request.url);
    const view = String(requestUrl.searchParams.get("view") || "bootstrap").toLowerCase();

    if (view === "folder") {
      const path = normalizePath(requestUrl.searchParams.get("path") || "");
      const search = String(requestUrl.searchParams.get("search") || "");
      const requestedPage = parsePositiveInteger(requestUrl.searchParams.get("page"), 1);
      const requestedPageSize = parsePositiveInteger(
        requestUrl.searchParams.get("pageSize"),
        DEFAULT_PAGE_SIZE,
      );
      const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, requestedPageSize));

      const payload = await listFolderEntries({
        relativePath: path,
        page: requestedPage,
        pageSize,
        search,
      });
      return toJson(payload);
    }

    const payload = await getBootstrapPayload();
    return toJson(payload);
  } catch {
    return toJson({ message: "Failed to load documents." }, 500);
  }
}

export async function POST(request) {
  const authState = await ensureAdmin(request);
  if (!authState.ok) {
    return authState.response;
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let message = "Updated successfully.";
    let action = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      action = String(formData.get("action") || "").trim();

      if (action === "upload") {
        ({ message } = await uploadFiles(formData));
      } else {
        throw new Error("Unsupported multipart action.");
      }
    } else {
      const payload = await request.json();
      action = String(payload?.action || "").trim();

      if (action === "create-folder") {
        ({ message } = await createFolder(payload));
      } else if (action === "rename") {
        ({ message } = await renameEntry(payload));
      } else if (action === "delete") {
        ({ message } = await deleteEntry(payload));
      } else if (action === "move") {
        ({ message } = await moveEntry(payload));
      } else {
        throw new Error("Unsupported action.");
      }
    }

    invalidateBootstrapCache();
    return toJson({ message });
  } catch (error) {
    return toJson(
      {
        message: error instanceof Error ? error.message : "Operation failed.",
      },
      400,
    );
  }
}
