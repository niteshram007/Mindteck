import { constants, createWriteStream, existsSync, mkdirSync, realpathSync, unlinkSync } from "node:fs";
import { access, copyFile, unlink } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { MultipartFile } from "@fastify/multipart";

import { CollectionNameType } from "../constants/collection";
import CustomError from "../error";

const INVESTOR_UPLOAD_TO_ASSET_DIR: Record<string, string> = {
  investor_annual_report: "investor_pdf",
  investor_financial_info: "investor_pdf",
  investor_pdf_with_title: "investor_pdf",
  investor_share_holding_pattern: "investor_pdf",
  investor_stock_exchange_filing: "investor_pdf",
  investor_subsidiaries_financial: "investor_pdf",
  investor_policies: "investor_pdf",
  investor_notice: "notice_pdf",
  investor_postal_ballot: "postal_ballot_pdf",
  investor_buyback: "buyback_pdf",
};

const normalizePathForMatch = (value: string) => value.replace(/\\/g, "/");

const isInvestorUploadPrefix = (prefix: CollectionNameType) => String(prefix || "").startsWith("investor_");

const sanitizeInvestorFileName = (fileName: string) => {
  const extension = extname(fileName || "").toLowerCase();
  const baseName = basename(fileName || "", extension);

  const slugBase = String(baseName || "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  const safeBase = slugBase || `file-${Date.now()}`;
  return `${safeBase}${extension}`;
};

const getInvestorAssetMirrorPaths = (destination: string) => {
  const absoluteDestination = normalizePathForMatch(resolve(destination));
  const uploadToken = "/upload/";
  const uploadTokenIndex = absoluteDestination.lastIndexOf(uploadToken);

  if (uploadTokenIndex === -1) {
    return [];
  }

  const relativeUploadPath = absoluteDestination.slice(uploadTokenIndex + uploadToken.length);
  const segments = relativeUploadPath.split("/").filter(Boolean);

  if (segments.length < 2) {
    return [];
  }

  const [uploadCollection, ...relativeFileSegments] = segments;
  const assetDirectory = INVESTOR_UPLOAD_TO_ASSET_DIR[uploadCollection];

  if (!assetDirectory) {
    return [];
  }

  const publicRoot = resolve(process.cwd(), "../client/public");
  const relativeFilePath = relativeFileSegments.join("/");

  return [join(publicRoot, "assets", assetDirectory, relativeFilePath)];
};

const mirrorInvestorAssetToPublic = async (destination: string) => {
  const mirrorPaths = getInvestorAssetMirrorPaths(destination);

  for (const mirrorPath of mirrorPaths) {
    try {
      if (!existsSync(dirname(mirrorPath))) {
        mkdirSync(dirname(mirrorPath), { recursive: true });
      }

      if (
        existsSync(destination) &&
        existsSync(mirrorPath) &&
        normalizePathForMatch(realpathSync(destination)) ===
          normalizePathForMatch(realpathSync(mirrorPath))
      ) {
        continue;
      }

      await copyFile(destination, mirrorPath);
    } catch (error) {
      console.warn(`Failed investor asset mirror for ${mirrorPath}:`, error);
    }
  }
};

async function saveFile(
  fileData: MultipartFile,
  uploadDir: string,
  prefix: CollectionNameType,
  maxFileSize: number = 20 * 1024 * 1024,
): Promise<{ filePath: string; mimetype: string }> {
  const originalFileName = fileData.filename;
  const preferredFileName = isInvestorUploadPrefix(prefix)
    ? sanitizeInvestorFileName(originalFileName)
    : originalFileName;

  const baseName = basename(preferredFileName, extname(preferredFileName));
  const extension = extname(preferredFileName);

  let fileName = preferredFileName;
  let filePath = join(uploadDir, prefix, fileName);

  // Prevent accidental overwrite if a same-name file already exists.
  if (existsSync(filePath)) {
    fileName = `${baseName}-${Date.now()}${extension}`;
    filePath = join(uploadDir, prefix, fileName);
  }

  const fileNameWithPrefix = prefix + "/" + fileName;

  if (!existsSync(dirname(filePath))) {
    mkdirSync(dirname(filePath), { recursive: true });
  }

  let totalBytes = 0;

  const writeStream = createWriteStream(filePath);

  // Listen to incoming data to track size
  fileData.file.on("data", (chunk: Buffer) => {
    totalBytes += chunk.length;
  });

  try {
    // Use pipeline to write safely
    await pipeline(fileData.file, writeStream);

    // Check size **after pipeline completes**
    if (totalBytes > maxFileSize) {
      // Remove partial file
      unlinkSync(filePath);
      throw new CustomError(
        `File exceeds the allowed limit of ${maxFileSize / (1024 * 1024)} MB. Uploaded: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`,
      );
    }
  } catch (error: any) {
    // Remove partial file in case of any other error
    if (existsSync(filePath)) unlinkSync(filePath);
    throw new CustomError("Error saving file: " + error.message);
  }

  return {
    filePath: fileNameWithPrefix,
    mimetype: fileData.mimetype,
  };
}

async function deleteFile(filePath: string): Promise<void> {
  try {
    await access(filePath, constants.W_OK); // Check if file exists and is writable
    await unlink(filePath); // Delete the file
  } catch (error: unknown) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`File not found: ${filePath}, skipping deletion.`);
      return; // Exit without throwing an error
    }

    console.error("Failed to delete file:", error);
    throw new Error(`Error deleting file: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

async function moveFile(source: string, destination: string): Promise<void> {
  const sourceExists = existsSync(source);

  if (!sourceExists) {
    if (existsSync(destination)) {
      // Destination already exists (for example, copied by a background sync).
      await mirrorInvestorAssetToPublic(destination);
      return;
    }

    throw new CustomError(`File not found: ${source}`);
  }

  if (!existsSync(dirname(destination))) {
    mkdirSync(dirname(destination), { recursive: true });
  }

  try {
    await copyFile(source, destination);
    await mirrorInvestorAssetToPublic(destination);
    await unlink(source);
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(`Error moving file: ${(error as Error).message}`);
    } else {
      throw new CustomError('Error moving file');
    }
  }
}

export { deleteFile, moveFile, saveFile };
