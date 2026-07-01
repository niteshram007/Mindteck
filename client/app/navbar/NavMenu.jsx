"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const CAREER_URL = "http://careers.mindteck.com/";
const AI_ML_SOLUTION_PATH = "/ai-ml-solutions";
const IOT_SERVICE_PATH = "/internet-of-things";
const CONTACT_PATH = "/contact";
const CONTACT_ALIASES = new Set([
  "contact",
  "/contact",
  "contact-us",
  "/contact-us",
  "contactus",
  "/contactus",
]);
const HOME_PATH_ALIASES = new Set(["", "/", "/home-page-2", "/home-page-2/"]);
const IOT_SOLUTION_CHILDREN = [
  { label: "Asset Tracking", url: "/asset-tracking" },
  { label: "Fleet Management", url: "/fleet-management" },
  { label: "Productivity Improvement", url: "/productivity-improvement" },
];
const PRIMARY_MENU_LABELS = new Set([
  "about us",
  "industries",
  "services",
  "service",
  "solutions",
  "solution",
]);

const normalizeMenuLabel = (label = "") => {
  const safeLabel = String(label || "");
  const normalizedLabel = safeLabel.replace(/\bHealth Care\b/g, "Healthcare");
  const normalizedKey = normalizedLabel.trim().toLowerCase();

  if (
    normalizedKey === "software product testing - iv & v" ||
    normalizedKey === "software product testing- iv & v" ||
    normalizedKey === "iv and v" ||
    normalizedKey === "iv&v"
  ) {
    return "IV & V";
  }

  if (normalizedLabel === "Medical Device and Healthcare") {
    return "Medical Devices and Healthcare";
  }

  return normalizedLabel;
};

const isPrimaryMenuSection = (item) =>
  PRIMARY_MENU_LABELS.has(normalizeMenuLabel(item?.label || "").trim().toLowerCase());

const isIoTNode = (item) => {
  const label = normalizeMenuLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "").toLowerCase();
  return (
    label === "internet of things" ||
    label === "iot" ||
    label === "iot service" ||
    label === "iot services" ||
    href === IOT_SERVICE_PATH
  );
};

const isIoTSolutionChild = (item) => {
  const label = normalizeMenuLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "").toLowerCase();
  return IOT_SOLUTION_CHILDREN.some(
    (entry) =>
      entry.label.toLowerCase() === label || entry.url.toLowerCase() === href,
  );
};

const getIoTSolutionChildSortIndex = (item) => {
  const label = normalizeMenuLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "").toLowerCase();
  const matchedIndex = IOT_SOLUTION_CHILDREN.findIndex(
    (entry) =>
      entry.label.toLowerCase() === label || entry.url.toLowerCase() === href,
  );

  return matchedIndex === -1 ? 999 : matchedIndex;
};

const buildIoTSolutionChildren = (children = [], promotedChildren = []) => {
  const combinedChildren = [
    ...(Array.isArray(children) ? children.filter(Boolean) : []),
    ...(Array.isArray(promotedChildren) ? promotedChildren.filter(Boolean) : []),
  ];
  const dedupedChildren = [];
  const seen = new Set();

  combinedChildren.forEach((child) => {
    if (!child) return;

    const label = normalizeMenuLabel(child?.label || "");
    const href = normalizeMenuPath(child?.url || "");
    const key = `${href.toLowerCase()}::${label.trim().toLowerCase()}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    dedupedChildren.push({
      ...child,
      label,
      url: href,
      children: Array.isArray(child?.children) ? child.children.filter(Boolean) : [],
    });
  });

  return dedupedChildren.sort((left, right) => {
    const priorityDiff =
      getIoTSolutionChildSortIndex(left) - getIoTSolutionChildSortIndex(right);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return String(left?.label || "").localeCompare(String(right?.label || ""));
  });
};

const normalizeMobileNavbar = (items = []) => {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const promotedIoTChildren = safeItems.filter((item) => isIoTSolutionChild(item));

  return safeItems
    .filter((item) => isPrimaryMenuSection(item) && !isIoTSolutionChild(item))
    .map((item) => {
      const itemLabel = normalizeMenuLabel(item?.label || "").trim().toLowerCase();

      if (itemLabel !== "solutions" && itemLabel !== "solution") {
        return item;
      }

      const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
      const existingAIML = children.find((childItem) => {
        const label = normalizeMenuLabel(childItem?.label || "").trim().toLowerCase();
        const href = normalizeMenuPath(childItem?.url || "").toLowerCase();
        return label === "ai/ml" || label === "ai ml" || href === AI_ML_SOLUTION_PATH;
      });
      const existingIoT = children.find((childItem) => isIoTNode(childItem));
      const remainingChildren = children.filter((childItem) => {
        const label = normalizeMenuLabel(childItem?.label || "").trim().toLowerCase();
        const href = normalizeMenuPath(childItem?.url || "").toLowerCase();
        return !isIoTNode(childItem) && !(label === "ai/ml" || label === "ai ml" || href === AI_ML_SOLUTION_PATH);
      });
      const aiMlNode = existingAIML
        ? { ...existingAIML, label: "AI/ML", url: AI_ML_SOLUTION_PATH }
        : { label: "AI/ML", url: AI_ML_SOLUTION_PATH, children: [] };
      const iotNode = existingIoT
        ? {
            ...existingIoT,
            label: "Internet of Things",
            url: IOT_SERVICE_PATH,
            children: buildIoTSolutionChildren(existingIoT?.children || [], promotedIoTChildren),
          }
        : {
            label: "Internet of Things",
            url: IOT_SERVICE_PATH,
            children: buildIoTSolutionChildren([], promotedIoTChildren),
          };

      return {
        ...item,
        children: [aiMlNode, iotNode, ...remainingChildren],
      };
    });
};

const normalizeMenuPath = (path = "") => {
  const normalizedPath = String(path || "").trim();
  if (!normalizedPath || normalizedPath === "#") return "";

  if (/^https?:\/\//i.test(normalizedPath)) {
    try {
      const externalUrl = new URL(normalizedPath);
      const hashKey = String(externalUrl.hash || "")
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/\/+$/, "");
      const pathnameKey = String(externalUrl.pathname || "/")
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/\/+$/, "");

      if (hashKey === "#feedback-form-section" && HOME_PATH_ALIASES.has(pathnameKey)) {
        return CONTACT_PATH;
      }
    } catch (_error) {
      // Ignore malformed URL and continue with original handling.
    }
  }

  const normalizedKey = normalizedPath
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/\/+$/, "");

  if (normalizedKey === "#feedback-form-section" || CONTACT_ALIASES.has(normalizedKey)) {
    return CONTACT_PATH;
  }

  if (/^\/?home-page-2\/?$/i.test(normalizedPath)) return "/";
  if (
    normalizedPath.startsWith("/") ||
    normalizedPath.startsWith("#") ||
    /^https?:\/\//i.test(normalizedPath)
  ) {
    return normalizedPath;
  }
  return `/${normalizedPath}`;
};

const isExternalHref = (href = "") => /^https?:\/\//i.test(href);

const isCareerLink = (href = "", label = "") => {
  const hrefValue = String(href || "").trim().toLowerCase();
  const labelValue = String(label || "").trim().toLowerCase();
  return (
    hrefValue === "/career" ||
    hrefValue === "career" ||
    labelValue === "career" ||
    labelValue === "careers"
  );
};

const normalizePathname = (value = "") => {
  const pathOnly = String(value || "").split("?")[0].split("#")[0] || "/";
  if (pathOnly === "/") return "/";
  return pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
};

const extractPathname = (href = "") => {
  const value = String(href || "").trim();
  if (!value || value === "#" || value.startsWith("#")) return "";
  if (/^https?:\/\//i.test(value)) {
    try {
      return normalizePathname(new URL(value).pathname || "/");
    } catch (_error) {
      return "";
    }
  }
  return normalizePathname(value);
};

const isPathActive = (href = "", pathname = "/") => {
  const target = extractPathname(href);
  if (!target) return false;
  const current = normalizePathname(pathname || "/");
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
};

const hasActiveDescendant = (item, pathname = "/") => {
  if (!item) return false;
  const nodePath = normalizeMenuPath(item?.url);
  if (isPathActive(nodePath, pathname)) return true;
  const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
  return children.some((childItem) => hasActiveDescendant(childItem, pathname));
};

export function MobileNav({ navbarConfig, topMenuBar }) {
  const safeNavbar = normalizeMobileNavbar(navbarConfig);
  const safeTopMenu = Array.isArray(topMenuBar) ? topMenuBar.filter(Boolean) : [];
  const pathname = usePathname();
  const currentPathname = normalizePathname(pathname || "/");

  return (
    <div className="relative text-popover-foreground">
      <nav className="text-sm">
        {safeNavbar.map((item) => (
          <NavMenu
            item={item}
            pathname={currentPathname}
            key={item?._id || item?.url || item?.label}
          />
        ))}
        {safeTopMenu.map((item) => (
          <NavMenu
            item={item}
            pathname={currentPathname}
            key={item?._id || item?.url || item?.label}
          />
        ))}
      </nav>
    </div>
  );
}

const NavMenu = ({ item, pathname = "/" }) => {
  if (!item) return null;

  const itemPath = normalizeMenuPath(item?.url);
  const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
  const label = normalizeMenuLabel(item.label);
  const isCareer = isCareerLink(itemPath, label);
  const isExternal = isExternalHref(itemPath);
  const isCurrentItemActive = isPathActive(itemPath, pathname);
  const hasCurrentDescendant = children.some((childItem) =>
    hasActiveDescendant(childItem, pathname),
  );
  const isCurrentBranchActive = isCurrentItemActive || hasCurrentDescendant;

  if (children.length === 0) {
    return (
      <div
        key={item?.url}
        className={`w-full py-2 px-0 text-sm font-medium border-b border-[#00473080]${isCurrentItemActive ? " text-secondary font-semibold" : ""}`}
      >
        {itemPath ? (
          isCareer ? (
            <a href={CAREER_URL} className="block w-full py-1">
              {label}
            </a>
          ) : isExternal ? (
            <a
              href={itemPath}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-1"
            >
              {label}
            </a>
          ) : (
            <Link href={itemPath} className="block w-full py-1">
              {label}
            </Link>
          )
        ) : (
          <span className="block w-full py-1">{label}</span>
        )}
      </div>
    );
  }
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger className="group flex justify-between items-center w-full border-b border-[#00473080]">
          <div
            className={`flex w-full py-2 px-0 text-sm font-medium${isCurrentBranchActive ? " text-secondary font-semibold" : ""}`}
          >
            <p>{label}</p>
            <ChevronDown
              className="ml-auto transition-transform group-data-[state=open]:rotate-180"
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="translate-x-2 group-data-[collapsible=icon]:hidden">
            {children.map((childItem, index) => {
              if (!childItem) return null;

              const childChildren = Array.isArray(childItem?.children)
                ? childItem.children.filter(Boolean)
                : [];
              const childPath = normalizeMenuPath(childItem?.url);
              const childLabel = normalizeMenuLabel(childItem.label);
              const childIsCareer = isCareerLink(childPath, childLabel);
              const childIsExternal = isExternalHref(childPath);
              const isChildActive = isPathActive(childPath, pathname);

              return childChildren.length === 0 ? (
                childPath ? (
                  childIsCareer ? (
                    <a
                      key={childItem?._id || index}
                      href={CAREER_URL}
                      className={`block w-full p-2 text-sm font-normal${isChildActive ? " text-secondary font-semibold" : ""}`}
                    >
                      {childLabel}
                    </a>
                  ) : childIsExternal ? (
                    <a
                      key={childItem?._id || index}
                      href={childPath}
                      target="_blank"
                      rel="noreferrer"
                      className={`block w-full p-2 text-sm font-normal${isChildActive ? " text-secondary font-semibold" : ""}`}
                    >
                      {childLabel}
                    </a>
                  ) : (
                    <Link
                      key={childItem?._id || index}
                      href={childPath}
                      className={`block w-full p-2 text-sm font-normal${isChildActive ? " text-secondary font-semibold" : ""}`}
                    >
                      {childLabel}
                    </Link>
                  )
                ) : (
                  <span
                    key={childItem?._id || index}
                    className={`block w-full p-2 text-sm font-normal${isChildActive ? " text-secondary font-semibold" : ""}`}
                  >
                    {childLabel}
                  </span>
                )
              ) : (
                <NavMenu
                  item={childItem}
                  pathname={pathname}
                  key={childItem?._id || index}
                />
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
