import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DropdownItem = ({ item, isSubMenu }) => {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  const investorPathPrefix = "/investors/";
  const itemLabel = String(item?.label || "").trim();
  const normalizedItemLabel = itemLabel.toLowerCase();

  const normalizePath = (value = "") =>
    String(value).trim().replace(/^\/+|\/+$/g, "");

  const normalizeInvestorPathname = (value = "") => {
    if (!value.startsWith(investorPathPrefix)) {
      return normalizePath(value);
    }
    return normalizePath(value.slice(investorPathPrefix.length));
  };

  const isExternalPath = (value = "") => /^https?:\/\//i.test(String(value));
  const normalizedCurrentPath = normalizeInvestorPathname(pathname);

  const isPathActive = (value = "") => {
    if (!value || isExternalPath(value)) {
      return false;
    }

    const normalizedMenuPath = normalizePath(value);
    if (!normalizedMenuPath) {
      return false;
    }

    return (
      currentPage === normalizedMenuPath ||
      normalizedCurrentPath === normalizedMenuPath ||
      normalizedCurrentPath.startsWith(`${normalizedMenuPath}/`)
    );
  };

  const isActive = Boolean(
    isPathActive(item?.path) || item?.children?.some((el) => isPathActive(el?.path))
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Small delay to prevent menu from closing when moving to submenu
  };

  React.useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    [],
  );

  const linkPath = item?.target ? item.path : `/investors/${item.path}`;
  const shouldForceTopScroll =
    linkPath === "/investors" || linkPath === "/investors/press-room";
  const isHavingChild = item?.children?.length > 0;
  const shouldAlignDropdownRight =
    !isSubMenu && normalizedItemLabel === "other information";
  const textClassName = isSubMenu
    ? "block w-full text-sm font-[300] leading-snug whitespace-normal break-words text-left"
    : "inline-flex max-w-full items-center justify-center text-center text-md font-[500] leading-tight whitespace-normal break-words";
  const labelClassName = isSubMenu
    ? ""
    : "block max-w-[140px] xl:max-w-none";

  const handleTriggerClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <li
      key={itemLabel}
      className={`flex items-center ${
        isSubMenu
          ? "px-2 py-2 border-b border-gray-200 whitespace-normal text-left"
          : "min-h-[42px] min-w-0 px-2 py-3 justify-center gap-1 text-center md:flex-[1_1_140px] xl:flex-[0_0_auto]"
      } relative overflow-visible ${isActive ? "bg-secondary" : ""}`}
      onMouseEnter={isHavingChild ? handleMouseEnter : undefined}
      onMouseLeave={isHavingChild ? handleMouseLeave : undefined}
    >
      {isHavingChild ? (
        <button
          type="button"
          className={`${textClassName} ${isSubMenu ? "justify-between" : "gap-1"} text-left`}
          onClick={handleTriggerClick}
          onFocus={handleMouseEnter}
          aria-expanded={isOpen}
        >
          <span className={labelClassName}>{itemLabel}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      ) : item.path ? item?.target ? (
        <a
          href={item.path}
          className={textClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={labelClassName}>{item.label}</span>
        </a>
      ) : (
        <Link
          href={linkPath}
          scroll={true}
          className={textClassName}
          onClick={() => {
            if (!shouldForceTopScroll) {
              return;
            }
            window.requestAnimationFrame(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            });
          }}
        >
          <span className={labelClassName}>{item.label}</span>
        </Link>
      ) : (
        <span className={textClassName}>
          <span className={labelClassName}>{itemLabel}</span>
        </span>
      )}

      {item.children && isOpen && (
        <div
          className={cn(
            isSubMenu
              ? "relative left-0 top-0 mt-2 w-full max-w-full text-black rounded-md border bg-popover p-2 shadow-md"
              : "absolute top-full mt-1 z-[1180] text-black rounded-md border bg-popover p-2 shadow-xl",
            isSubMenu
              ? "max-h-none overflow-visible"
              : "w-[360px] lg:w-[480px] xl:w-[520px] max-w-[calc(100vw-24px)] max-h-[70vh] overflow-y-auto",
            isSubMenu
              ? "origin-top-left"
              : shouldAlignDropdownRight
                ? "right-0 left-auto origin-top-right"
                : "left-0 origin-top-left"
          )}
        >
          {item.children.map((child, index) => (
            <DropdownItem key={index} item={child} isSubMenu />
          ))}
        </div>
      )}
    </li>
  );
};
export default DropdownItem;
