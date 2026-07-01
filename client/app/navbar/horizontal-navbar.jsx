"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { isExternalPath, normalizeMenuPath } from "../utils/cmsLinks";

const cms_domain = process.env.NEXT_PUBLIC_CMS_DOMAIN || "";
const CAREER_URL = "http://careers.mindteck.com/";
const AI_ML_PATH = "/ai-ml-solutions";
const AI_ML_SERVICE_PATH = "/ai-ml-services";
const IOT_SERVICE_PATH = "/internet-of-things";
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

const normalizeLabel = (label = "") =>
  label === "Service" ? "Services" : label;

const isPrimaryMenuSection = (item) =>
  PRIMARY_MENU_LABELS.has(normalizeLabel(item?.label || "").trim().toLowerCase());

const isIoTNode = (item) => {
  const label = normalizeLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();
  return (
    label === "internet of things" ||
    label === "iot" ||
    label === "iot service" ||
    label === "iot services" ||
    href === IOT_SERVICE_PATH
  );
};

const isIoTSolutionChild = (item) => {
  const label = normalizeLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();
  return IOT_SOLUTION_CHILDREN.some(
    (entry) =>
      entry.label.toLowerCase() === label || entry.url.toLowerCase() === href,
  );
};

const getIoTSolutionChildSortIndex = (item) => {
  const label = normalizeLabel(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();
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

    const label = normalizeLabel(child?.label || "");
    const href = normalizeMenuPath(child?.url || "", cms_domain);
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

const getSmartCityAnchor = (label = "") => {
  const value = String(label || "").trim().toLowerCase();
  if (value.includes("smart parking")) return "SmartParking";
  if (value.includes("smart utilit") || value.includes("smart metering")) {
    return "SmartUtilities";
  }
  if (value.includes("smart healthcare")) return "SmartHealthcareSolutions";
  if (value.includes("smart governance")) return "SmartGovernance";
  if (value.includes("smart building") || value.includes("infrastructure")) {
    return "SmartBuilding";
  }
  return "";
};

const withSmartCityAnchor = (href = "", label = "") => {
  const hrefValue = String(href || "").trim();
  if (!hrefValue) return hrefValue;

  const normalizedHref = hrefValue.toLowerCase();
  const isSmartCityRoute =
    normalizedHref === "/smartcity-solutions" ||
    normalizedHref === "smartcity-solutions" ||
    normalizedHref.startsWith("/smartcity-solutions#") ||
    normalizedHref.startsWith("smartcity-solutions#");

  if (!isSmartCityRoute) {
    return hrefValue;
  }

  const anchor = getSmartCityAnchor(label);
  if (!anchor) {
    return "/smartcity-solutions";
  }

  return `/smartcity-solutions#${anchor}`;
};

const normalizePathname = (value = "") => {
  if (!value) return "/";
  const pathOnly = String(value || "").split("?")[0].split("#")[0] || "/";
  if (pathOnly === "/") return "/";
  return pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
};

const extractInternalPathname = (href = "") => {
  const value = String(href || "").trim();
  if (!value || value === "#" || value.startsWith("#")) return "";

  try {
    if (isExternalPath(value)) {
      const parsed = new URL(value);
      return normalizePathname(parsed.pathname || "/");
    }
  } catch (_error) {
    return "";
  }

  return normalizePathname(value);
};

const isActivePath = (href = "", currentPathname = "/") => {
  const targetPath = extractInternalPathname(href);
  if (!targetPath) return false;

  const normalizedCurrentPath = normalizePathname(currentPathname);
  if (targetPath === "/") {
    return normalizedCurrentPath === "/";
  }

  return (
    normalizedCurrentPath === targetPath ||
    normalizedCurrentPath.startsWith(`${targetPath}/`)
  );
};

const renderMenuLink = ({
  href,
  label,
  className,
  externalTarget = false,
  isActive = false,
}) => {
  const safeLabel = normalizeLabel(label);
  const resolvedHref = withSmartCityAnchor(href, safeLabel);
  const composedClassName = `${className}${isActive ? " text-secondary" : ""}`;

  if (!resolvedHref || resolvedHref === "#") {
    return <span className={composedClassName}>{safeLabel}</span>;
  }

  if (isCareerLink(resolvedHref, safeLabel)) {
    return (
      <a href={CAREER_URL} className={composedClassName}>
        {safeLabel}
      </a>
    );
  }

  if (isExternalPath(resolvedHref)) {
    return (
      <a
        href={resolvedHref}
        target={externalTarget ? "_blank" : undefined}
        rel={externalTarget ? "noreferrer" : undefined}
        className={composedClassName}
      >
        {safeLabel}
      </a>
    );
  }

  if (String(resolvedHref).includes("#")) {
    return (
      <a href={resolvedHref} className={composedClassName}>
        {safeLabel}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={composedClassName}>
      {safeLabel}
    </Link>
  );
};

export const MainMenuNav = ({ mainNav }) => {
  const [open, setOpen] = React.useState(false);
  const navItems = React.useMemo(() => {
    const safeItems = Array.isArray(mainNav) ? mainNav.filter(Boolean) : [];
    const isAIMLNode = (childItem) => {
      const childLabel = normalizeLabel(childItem?.label || "").trim().toLowerCase();
      const childHref = normalizeMenuPath(childItem?.url || "", cms_domain).toLowerCase();
      return (
        childLabel === "ai/ml" ||
        childLabel === "ai ml" ||
        childLabel.includes("artificial intelligence") ||
        childHref === "/ai-ml-services" ||
        childHref === AI_ML_PATH
      );
    };
    const promotedIoTChildren = safeItems.filter((item) => isIoTSolutionChild(item));
    const primaryItems = safeItems.filter(
      (item) => isPrimaryMenuSection(item) && !isIoTSolutionChild(item),
    );

    return primaryItems.map((item) => {
      const itemLabel = normalizeLabel(item?.label || "").trim().toLowerCase();
      const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
      const existingAIML = children.find((childItem) => isAIMLNode(childItem));
      const existingIoT = children.find((childItem) => isIoTNode(childItem));
      const remainingChildren = children.filter((childItem) => !isAIMLNode(childItem));

      if (itemLabel === "services" || itemLabel === "service") {
        const aiMlNode = existingAIML
          ? { ...existingAIML, label: "AI/ML", url: AI_ML_SERVICE_PATH }
          : { label: "AI/ML", url: AI_ML_SERVICE_PATH, children: [] };
        const remainingServiceChildren = remainingChildren.filter(
          (childItem) => !isIoTNode(childItem),
        );
        const iotNode = existingIoT
          ? { ...existingIoT, label: "Internet of Things", url: IOT_SERVICE_PATH }
          : { label: "Internet of Things", url: IOT_SERVICE_PATH, children: [] };

        return {
          ...item,
          children: [aiMlNode, iotNode, ...remainingServiceChildren],
        };
      }

      if (itemLabel !== "solutions" && itemLabel !== "solution") {
        return item;
      }

      const aiMlNode = existingAIML
        ? { ...existingAIML, label: "AI/ML", url: AI_ML_PATH }
        : { label: "AI/ML", url: AI_ML_PATH, children: [] };
      const remainingSolutionChildren = remainingChildren.filter(
        (childItem) => !isIoTNode(childItem),
      );
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
        children: [aiMlNode, iotNode, ...remainingSolutionChildren],
      };
    });
  }, [mainNav]);
  const pathname = usePathname();
  const currentPathname = normalizePathname(pathname || "/");

  return (
    <section className="flex justify-center py-1">
      <div className="flex flex-wrap w-full justify-center lg:justify-evenly items-center font-inter gap-x-3 gap-y-2">
        {navItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <NavDropDownMenu
              item={item}
              open={open}
              setOpen={setOpen}
              menuId={String(idx)}
              currentPathname={currentPathname}
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const NavDropDownMenu = ({ item, open, setOpen, menuId, currentPathname }) => {
  if (!item) return null;

  const closeTimerRef = React.useRef(null);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    clearCloseTimer();
    setOpen(menuId);
  };

  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen((currentOpen) => (currentOpen === menuId ? null : currentOpen));
    }, 220);
  };

  React.useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  const triggerHref = normalizeMenuPath(item?.url || "", cms_domain);
  const label = normalizeLabel(item?.label || "");
  const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
  const hasChildren = children.length > 0;
  const isCurrentItemActive = isActivePath(triggerHref, currentPathname);

  if (!hasChildren) {
    return renderMenuLink({
      href: triggerHref,
      label,
      className:
        "h-9 px-3 inline-flex items-center rounded-md border border-transparent text-xs sm:text-sm md:text-base font-medium font-inter whitespace-nowrap transition-all duration-200 ease-out hover:text-secondary hover:bg-secondary/10 hover:border-secondary/30",
      externalTarget: true,
      isActive: isCurrentItemActive,
    });
  }

  const hasActiveDescendant = children.some((childItem) =>
    hasMenuItemActivePath(childItem, currentPathname),
  );
  const isCurrentMenuActive = isCurrentItemActive || hasActiveDescendant;
  const isCurrentMenuHovered = open === menuId;

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownMenu
        modal={false}
        open={open === menuId}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            handleMouseEnter();
          } else {
            handleMouseLeave();
          }
        }}
      >
        <DropdownMenuTrigger
          type="button"
          onMouseEnter={handleMouseEnter}
          className={`h-9 px-3 inline-flex items-center rounded-md border border-transparent text-xs sm:text-sm md:text-base font-medium font-inter whitespace-nowrap bg-transparent transition-all duration-200 ease-out hover:text-secondary hover:bg-secondary/10 hover:border-secondary/30${isCurrentMenuActive || isCurrentMenuHovered ? " text-secondary bg-secondary/10 border-secondary/30" : ""}`}
        >
          {label}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[1300]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children.map((childItem, idx) => {
            if (!childItem) return null;

            const childChildren = Array.isArray(childItem?.children)
              ? childItem.children.filter(Boolean)
              : [];

            if (childChildren.length > 0) {
              return (
                <NavSubMenu
                  key={idx}
                  item={childItem}
                  currentPathname={currentPathname}
                />
              );
            }

            const childHref = normalizeMenuPath(childItem?.url || "", cms_domain);
            const childLabel = normalizeLabel(childItem?.label || "");
            const isChildActive = isActivePath(
              withSmartCityAnchor(childHref, childLabel),
              currentPathname,
            );

            return (
              <DropdownMenuItem
                key={idx}
                className={`font-inter data-[highlighted]:bg-transparent data-[highlighted]:text-secondary focus:bg-transparent focus:text-secondary${isChildActive ? " text-secondary font-semibold" : ""}`}
              >
                {renderMenuLink({
                  href: childHref,
                  label: childLabel,
                  className: "w-full block transition-colors",
                  externalTarget: true,
                  isActive: isChildActive,
                })}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const NavSubMenu = ({ item, currentPathname }) => {
  if (!item) return null;

  const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
  const itemHref = normalizeMenuPath(item?.url || "", cms_domain);
  const isSubMenuActive =
    isActivePath(withSmartCityAnchor(itemHref, normalizeLabel(item?.label || "")), currentPathname) ||
    children.some((childItem) => hasMenuItemActivePath(childItem, currentPathname));

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={`font-inter w-full transition-colors data-[highlighted]:bg-transparent data-[highlighted]:text-secondary hover:text-secondary${isSubMenuActive ? " text-secondary font-semibold" : ""}`}
      >
        {normalizeLabel(item?.label || "")}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="z-[1300]">
        {children.map((childItem, idx) => {
          if (!childItem) return null;

          const childChildren = Array.isArray(childItem?.children)
            ? childItem.children.filter(Boolean)
            : [];

          if (childChildren.length > 0) {
            return (
              <NavSubMenu
                key={idx}
                item={childItem}
                currentPathname={currentPathname}
              />
            );
          }

          const childHref = normalizeMenuPath(childItem?.url || "", cms_domain);
          const childLabel = normalizeLabel(childItem?.label || "");
          const isChildActive = isActivePath(
            withSmartCityAnchor(childHref, childLabel),
            currentPathname,
          );

          return (
            <DropdownMenuItem
              key={idx}
              className={`font-inter data-[highlighted]:bg-transparent data-[highlighted]:text-secondary focus:bg-transparent focus:text-secondary${isChildActive ? " text-secondary font-semibold" : ""}`}
            >
              {renderMenuLink({
                href: childHref,
                label: childLabel,
                className: "w-full block transition-colors",
                externalTarget: true,
                isActive: isChildActive,
              })}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

const hasMenuItemActivePath = (item, currentPathname = "/") => {
  if (!item) return false;

  const label = normalizeLabel(item?.label || "");
  const href = normalizeMenuPath(item?.url || "", cms_domain);
  const resolvedHref = withSmartCityAnchor(href, label);

  if (isActivePath(resolvedHref, currentPathname)) {
    return true;
  }

  const children = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
  return children.some((childItem) => hasMenuItemActivePath(childItem, currentPathname));
};
