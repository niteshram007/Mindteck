export const revalidate = 300;
import Link from "next/link";
import LogoWhite from "../assets/images/logo-white.png";
import LogoDark from "../assets/images/logo-dark.png";
import { MainMenuNav } from "./horizontal-navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { MobileNav } from "./NavMenu";
import { ensureAboutUsChildren } from "../utils/aboutMenu";
import { getCmsMenu } from "../utils/cmsMenu";
import { normalizeMenuPath } from "../utils/cmsLinks";
import SearchBar from "./SearchBar";
import FooterAwareNavVisibility from "./FooterAwareNavVisibility";

const cms_domain = process.env.NEXT_PUBLIC_CMS_DOMAIN || "";
const CAREER_URL = "http://careers.mindteck.com/";
const AI_ML_SOLUTION_PATH = "/ai-ml-solutions";
const AI_ML_SERVICE_PATH = "/ai-ml-services";
const IOT_SERVICE_PATH = "/internet-of-things";
const TALENT_SERVICE_PATH = "/talent";
const LEGACY_IT_TALENT_SERVICE_PATH = "/it-talent";
const IOT_SOLUTION_CHILDREN = [
  { label: "Asset Tracking", url: "/asset-tracking" },
  { label: "Fleet Management", url: "/fleet-management" },
  { label: "Productivity Improvement", url: "/productivity-improvement" },
];

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

const isExternalHref = (href = "") => /^https?:\/\//i.test(href);
const PRIMARY_MENU_ORDER = ["about us", "industries", "services", "service", "solutions", "solution"];
const IOT_SOLUTION_CHILD_LABELS = new Set(
  IOT_SOLUTION_CHILDREN.map((item) => String(item.label || "").trim().toLowerCase()),
);
const IOT_SOLUTION_CHILD_URLS = new Set(
  IOT_SOLUTION_CHILDREN.map((item) => String(item.url || "").trim().toLowerCase()),
);

const getPrimaryMenuPriority = (label = "") => {
  const normalizedLabel = String(label || "").trim().toLowerCase();
  const priority = PRIMARY_MENU_ORDER.indexOf(normalizedLabel);
  return priority === -1 ? 999 : priority;
};

const isPrimaryMenuSection = (item) =>
  getPrimaryMenuPriority(item?.label || "") !== 999;

const overrideMenuLabel = (label = "", href = "") => {
  if (label === "Service") {
    return "Services";
  }

  if (label === "Solution") {
    return "Solutions";
  }

  if (href === "/data-storage") {
    return "Storage";
  }

  if (href === "/iv-and-v") {
    return "IV & V";
  }

  if (href === IOT_SERVICE_PATH) {
    return "Internet of Things";
  }

  if (href === TALENT_SERVICE_PATH || href === LEGACY_IT_TALENT_SERVICE_PATH) {
    return "Talent";
  }

  return label;
};

const isAIMLMenuItem = (item) => {
  const label = String(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();

  return (
    label === "ai/ml" ||
    label === "ai ml" ||
    label.includes("artificial intelligence") ||
    href === AI_ML_SERVICE_PATH
  );
};

const isIoTMenuItem = (item) => {
  const label = String(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();

  return (
    label === "iot" ||
    label === "iot service" ||
    label === "iot services" ||
    label === "internet of things" ||
    href === IOT_SERVICE_PATH
  );
};

const isITTalentMenuItem = (item) => {
  const label = String(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();

  return (
    label === "it talent" ||
    label === "it-talent" ||
    label === "talent" ||
    label.includes("it talent") ||
    href === TALENT_SERVICE_PATH ||
    href === LEGACY_IT_TALENT_SERVICE_PATH
  );
};

const isIoTSolutionChildItem = (item) => {
  const label = String(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();

  return IOT_SOLUTION_CHILD_LABELS.has(label) || IOT_SOLUTION_CHILD_URLS.has(href);
};

const getIoTSolutionChildSortIndex = (item) => {
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();
  const label = String(item?.label || "").trim().toLowerCase();
  const hrefIndex = IOT_SOLUTION_CHILDREN.findIndex(
    (entry) => entry.url.toLowerCase() === href,
  );

  if (hrefIndex !== -1) {
    return hrefIndex;
  }

  const labelIndex = IOT_SOLUTION_CHILDREN.findIndex(
    (entry) => entry.label.toLowerCase() === label,
  );

  return labelIndex === -1 ? 999 : labelIndex;
};

const getServiceSortIndex = (item) => {
  const label = String(item?.label || "").trim().toLowerCase();
  const href = normalizeMenuPath(item?.url || "", cms_domain).toLowerCase();

  if (isAIMLMenuItem(item)) return 0;
  if (label.includes("business process") || href === "/bpm-services") return 1;
  if (
    label === "eds" ||
    label.includes("embedded design") ||
    label.includes("electronic design") ||
    href === "/electronic-design-services-embedded-systems-and-applications"
  ) {
    return 2;
  }
  if (label === "cloud" || href === "/cloud-service") return 3;
  if (label.includes("data engineering") || href === "/data-engineering") return 4;
  if (label.includes("digital transformation") || href === "/digital-transformation") {
    return 5;
  }
  if (isIoTMenuItem(item)) return 6;
  if (
    label.includes("it infrastructure") ||
    href === "/it-infrastructure-and-data-centre-transformation"
  ) {
    return 7;
  }
  if (
    label === "iv & v" ||
    label.includes("software product testing") ||
    href === "/iv-and-v"
  ) {
    return 8;
  }
  if (isITTalentMenuItem(item)) return 9;

  return 999;
};

const ensureServicesChildren = (children = []) => {
  const safeChildren = Array.isArray(children) ? children.filter(Boolean) : [];
  const existingAIML = safeChildren.find((item) => isAIMLMenuItem(item));
  const existingIoT = safeChildren.find((item) => isIoTMenuItem(item));
  const existingITTalent = safeChildren.find((item) => isITTalentMenuItem(item));
  const remainingChildren = safeChildren.filter(
    (item) => !isAIMLMenuItem(item) && !isIoTMenuItem(item) && !isITTalentMenuItem(item),
  );

  const aiMlNode = existingAIML
    ? { ...existingAIML, label: "AI/ML", url: AI_ML_SERVICE_PATH }
    : { label: "AI/ML", url: AI_ML_SERVICE_PATH, children: [] };
  const iotNode = existingIoT
    ? { ...existingIoT, label: "Internet of Things", url: IOT_SERVICE_PATH }
    : { label: "Internet of Things", url: IOT_SERVICE_PATH, children: [] };
  const itTalentNode = existingITTalent
    ? { ...existingITTalent, label: "Talent", url: TALENT_SERVICE_PATH }
    : { label: "Talent", url: TALENT_SERVICE_PATH, children: [] };

  return [aiMlNode, iotNode, ...remainingChildren, itTalentNode].sort(
    (left, right) => getServiceSortIndex(left) - getServiceSortIndex(right),
  );
};

const ensureSolutionsChildren = (children = []) => {
  const safeChildren = Array.isArray(children) ? children.filter(Boolean) : [];
  const existingAIML = safeChildren.find((item) => isAIMLMenuItem(item));
  const existingIoT = safeChildren.find((item) => isIoTMenuItem(item));
  const remainingChildren = safeChildren.filter(
    (item) => !isAIMLMenuItem(item) && !isIoTMenuItem(item),
  );

  const aiMlNode = existingAIML
    ? { ...existingAIML, label: "AI/ML", url: AI_ML_SOLUTION_PATH }
    : { label: "AI/ML", url: AI_ML_SOLUTION_PATH, children: [] };
  const iotNode = existingIoT
    ? { ...existingIoT, label: "Internet of Things", url: IOT_SERVICE_PATH }
    : { label: "Internet of Things", url: IOT_SERVICE_PATH, children: [] };

  return [aiMlNode, iotNode, ...remainingChildren];
};

const ensureIoTSolutionChildren = (children = [], promotedChildren = []) => {
  const combinedChildren = [
    ...(Array.isArray(children) ? children.filter(Boolean) : []),
    ...(Array.isArray(promotedChildren) ? promotedChildren.filter(Boolean) : []),
  ];
  const dedupedChildren = [];
  const seen = new Set();

  combinedChildren.forEach((child) => {
    if (!child) return;

    const href = normalizeMenuPath(child?.url || "", cms_domain);
    const label = overrideMenuLabel(child?.label || "", href);
    const key = `${href.toLowerCase()}::${String(label || "").trim().toLowerCase()}`;

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

const promoteIoTSolutionItemsIntoSolutions = (items = []) => {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const promotedChildren = safeItems.filter((item) => isIoTSolutionChildItem(item));
  const remainingItems = safeItems.filter((item) => !isIoTSolutionChildItem(item));

  return remainingItems.map((item) => {
    const normalizedLabel = String(item?.label || "").trim().toLowerCase();

    if (normalizedLabel !== "solutions" && normalizedLabel !== "solution") {
      return item;
    }

    const safeChildren = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
    const existingIoTIndex = safeChildren.findIndex((child) => isIoTMenuItem(child));
    const existingIoTNode = existingIoTIndex === -1 ? null : safeChildren[existingIoTIndex];
    const nextChildren = safeChildren.filter((_, index) => index !== existingIoTIndex);
    const iotNode = {
      ...(existingIoTNode || {}),
      label: "Internet of Things",
      url: IOT_SERVICE_PATH,
      children: ensureIoTSolutionChildren(existingIoTNode?.children || [], promotedChildren),
    };

    const aiMlIndex = nextChildren.findIndex((child) => isAIMLMenuItem(child));
    const insertionIndex = aiMlIndex === 0 ? 1 : 0;
    nextChildren.splice(insertionIndex, 0, iotNode);

    return {
      ...item,
      children: nextChildren,
    };
  });
};

const relabelMenuItems = (items = []) =>
  (Array.isArray(items) ? items : []).map((item) => {
    const href = normalizeMenuPath(item?.url || "", cms_domain);
    const label = overrideMenuLabel(item?.label || "", href);
    const children = relabelMenuItems(item?.children || []);
    const normalizedLabel = String(label).trim().toLowerCase();

    return {
      ...item,
      label,
      children:
        normalizedLabel === "about us"
          ? ensureAboutUsChildren(children, {
              resolveUrl: (value) => normalizeMenuPath(value || "", cms_domain).toLowerCase(),
              createItem: () => ({
                label: "Sales Team",
                url: "/sales-team",
                children: [],
              }),
            })
          : normalizedLabel === "services" || normalizedLabel === "service"
          ? ensureServicesChildren(children)
          : normalizedLabel === "solutions" || normalizedLabel === "solution"
            ? ensureSolutionsChildren(children)
          : children,
    };
  });

export async function MainNavBar({
  isHome,
  hiddenSidebar,
  spacerClassName = "h-[84px] lg:h-[132px]",
}) {
  const [mainMenu, topNav] = await Promise.all([
    getCmsMenu("main", { revalidate: 900 }),
    getCmsMenu("header", { revalidate: 900 }),
  ]);

  const safeTopNav = relabelMenuItems(
    Array.isArray(topNav) ? topNav.filter(Boolean) : [],
  );
  const safeMainMenu = promoteIoTSolutionItemsIntoSolutions(
    relabelMenuItems(Array.isArray(mainMenu) ? mainMenu.filter(Boolean) : []),
  )
    .filter((item) => isPrimaryMenuSection(item))
    .sort(
      (left, right) =>
        getPrimaryMenuPriority(left?.label || "") -
        getPrimaryMenuPriority(right?.label || ""),
    );

  return (
    <>
      <FooterAwareNavVisibility />
      <div
        data-main-navbar="true"
        className="fixed top-0 left-0 right-0 z-[1200] bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)] transition-transform transition-opacity duration-300 ease-out"
      >
        <div className="container py-2">
          <header>
            <div className="flex justify-between items-center gap-5">
              <Link href={"/"} className="shrink-0 flex items-center">
                <Image
                  width={236}
                  height={50}
                  src={isHome ? LogoWhite.src : LogoDark.src}
                  alt="logo"
                  priority={Boolean(isHome)}
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 236px"
                  className="w-[180px] sm:w-[210px] lg:w-[236px] h-auto object-contain"
                />
              </Link>
              <div className="hidden lg:flex min-w-0 flex-1 justify-end">
                <div className="flex flex-col items-end justify-center gap-2 min-w-0">
                  <div className="flex flex-nowrap items-center justify-end gap-3 min-w-0">
                    <ul className="flex top-menu items-center mr-1 flex-nowrap">
                      {safeTopNav.map((el, index) => {
                        const label = el?.label || "";
                        const href = normalizeMenuPath(el?.url || "", cms_domain);
                        const isCareer = isCareerLink(href, label);
                        const isExternal = isExternalHref(href);

                        return (
                          <li
                            className="text-xs font-light whitespace-nowrap"
                            key={el?.url || el?._id || `${label}-${index}`}
                          >
                            {isCareer ? (
                              <a href={CAREER_URL} className="font-inter">
                                {label}
                              </a>
                            ) : isExternal ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="font-inter"
                              >
                                {label}
                              </a>
                            ) : (
                              <Link href={href} className="font-inter">
                                {label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <SearchBar isHome={isHome} />
                  </div>
                    <MainMenuNav mainNav={safeMainMenu} />
                </div>
              </div>
              <div className="lg:hidden mr-2 flex items-center pt-2">
                <Sheet>
                  <SheetTrigger>
                    <Menu />
                  </SheetTrigger>
                  <SheetContent
                    className="flex-col h-[100vh] overflow-y-auto bg-[#C2D1C7]"
                    side="left"
                  >
                    <SheetHeader>
                      <SheetTitle>
                        <Link
                          href="/"
                          className="flex justify-center items-center mb-8"
                        >
                          <Image
                            width={180}
                            height={50}
                            src={LogoDark.src}
                            alt="logo"
                            priority={false}
                            sizes="180px"
                          />
                        </Link>
                      </SheetTitle>
                    </SheetHeader>

                    <MobileNav
                      navbarConfig={safeMainMenu}
                      topMenuBar={safeTopNav}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div aria-hidden="true" className={spacerClassName} />
    </>
  );
}
