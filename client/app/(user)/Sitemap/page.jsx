import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import * as motion from "motion/react-client";
import BannerImage from "../../assets/images/banners-and-bg/privacypolicyBanner.jpg";
import { varFade } from "@/lib/animate";
import { ensureAboutUsChildren } from "@/app/utils/aboutMenu";
import { getCmsMenu } from "@/app/utils/cmsMenu";
import Link from "next/link";
import { Dot } from "lucide-react";
import { defaultInvestorMenus } from "@/app/utils/constant";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";
import Image from "next/image";
import { unstable_cache } from "next/cache";

export const revalidate = 600;
export const metadata = getStaticPageMetadata("/Sitemap");

const REQUIRED_SOLUTION_LINKS = [
  { label: "Asset Tracking", url: "/asset-tracking" },
  { label: "Fleet Management", url: "/fleet-management" },
  { label: "Productivity Improvement", url: "/productivity-improvement" },
];

const normalizeLabel = (label = "") => {
  const safeLabel = String(label || "").trim();
  if (!safeLabel) return "";
  const normalizedKey = safeLabel.toLowerCase();
  if (safeLabel.toLowerCase() === "service") return "Services";
  if (safeLabel.toLowerCase() === "solution") return "Solutions";
  if (
    normalizedKey === "software product testing - iv & v" ||
    normalizedKey === "software product testing- iv & v" ||
    normalizedKey === "iv and v" ||
    normalizedKey === "iv&v"
  ) {
    return "IV & V";
  }
  if (
    normalizedKey === "iot service" ||
    normalizedKey === "iot services" ||
    normalizedKey === "iot"
  ) {
    return "Internet of Things";
  }
  if (safeLabel.toLowerCase() === "medical device and healthcare") {
    return "Medical Devices and Healthcare";
  }
  return safeLabel;
};

const normalizePath = (path = "") => {
  const safePath = String(path || "").trim();
  if (!safePath || safePath === "#") return "";
  if (safePath.startsWith("/") || /^https?:\/\//i.test(safePath)) {
    return safePath;
  }
  return `/${safePath}`;
};

const isExternalPath = (path = "") => /^https?:\/\//i.test(String(path || ""));

const resolveInvestorPath = (item = {}) => {
  const normalized = normalizePath(item?.path || item?.url || "");
  if (!normalized) return "";
  if (item?.target || isExternalPath(normalized)) {
    return normalized;
  }
  if (normalized.startsWith("/investors/")) {
    return normalized;
  }
  return normalizePath(`/investors/${normalized.replace(/^\/+/, "")}`);
};

const dedupeLinks = (links = []) => {
  const seen = new Set();
  const list = [];

  links.forEach((item) => {
    const label = normalizeLabel(item?.label || "");
    const url = normalizePath(item?.url || "");
    if (!label) return;
    const key = `${label.toLowerCase()}::${url.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    list.push({ label, url });
  });

  return list;
};

const flattenMenuLinks = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    const current = {
      label: normalizeLabel(item?.label || ""),
      url: normalizePath(item?.url || ""),
    };
    const childLinks = flattenMenuLinks(item?.children || []);
    return current.label ? [current, ...childLinks] : childLinks;
  });
};

const flattenSubmenuOfSubmenus = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    const nestedChildren = Array.isArray(item?.children) ? item.children.filter(Boolean) : [];
    return nestedChildren.map((nestedItem) => ({
      label: normalizeLabel(nestedItem?.label || ""),
      url: normalizePath(nestedItem?.url || ""),
    }));
  });
};

const flattenSolutionLinks = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    const directLink =
      item?.label && normalizePath(item?.url || "")
        ? [
            {
              label: normalizeLabel(item?.label || ""),
              url: normalizePath(item?.url || ""),
            },
          ]
        : [];

    const nestedLinks = Array.isArray(item?.children)
      ? item.children.map((nestedItem) => ({
          label: normalizeLabel(nestedItem?.label || ""),
          url: normalizePath(nestedItem?.url || ""),
        }))
      : [];

    return [...directLink, ...nestedLinks];
  });
};

const getSitemapMenus = unstable_cache(
  async () => {
    const [topNav, mainNav] = await Promise.all([
      getCmsMenu("header", { revalidate: 600 }),
      getCmsMenu("main", { revalidate: 600 }),
    ]);

    return {
      headerMenus: Array.isArray(topNav) ? topNav : [],
      mainMenus: Array.isArray(mainNav) ? mainNav : [],
    };
  },
  ["public-sitemap-menus"],
  { revalidate: 600 },
);

const SectionLinks = ({ title, links = [] }) => {
  if (!Array.isArray(links) || links.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1 font-inter border-b border-gray-300 pb-3 mb-4">
      <h4 className="text-xl font-semibold text-secondary mb-2">{title}</h4>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start gap-3">
        {links.map((item, index) => {
          const href = normalizePath(item?.url || item?.path || "");
          const label = normalizeLabel(item?.label || "");
          const externalTarget = item?.target || undefined;
          const isExternalHref = isExternalPath(href);
          const key = `${title}-${label}-${href || index}`;

          if (!label) {
            return null;
          }

          return href ? isExternalHref ? (
            <a
              href={href}
              target={externalTarget || "_blank"}
              rel="noreferrer"
              className="text-sm hover:text-primary hover:underline flex items-center"
              key={key}
            >
              <Dot size="14px" /> {label}
            </a>
          ) : (
            <Link
              href={href}
              className="text-sm hover:text-primary hover:underline flex items-center"
              key={key}
            >
              <Dot size="14px" /> {label}
            </Link>
          ) : (
            <span className="text-sm flex items-center" key={key}>
              <Dot size="14px" /> {label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const getMenuKey = (label = "") => {
  const normalized = String(label || "").trim().toLowerCase();
  if (normalized === "service") return "services";
  if (normalized === "solution") return "solutions";
  return normalized;
};

export default async function page() {
  const { headerMenus, mainMenus } = await getSitemapMenus();

  const requiredSections = [
    { key: "about us", label: "About Us", fallback: "/about-us" },
    { key: "industries", label: "Industries", fallback: "/data-storage" },
    { key: "services", label: "Services", fallback: "/ai-ml-services" },
    { key: "solutions", label: "Solutions", fallback: "/ai-ml-solutions" },
  ];

  const primarySections = requiredSections.map((section) => {
    const matched = mainMenus.find((item) => getMenuKey(item?.label) === section.key);
    const matchedChildren =
      section.key === "about us"
        ? ensureAboutUsChildren(matched?.children || [], {
            resolveUrl: (value) => normalizePath(value || "").toLowerCase(),
          })
        : matched?.children || [];

    let links = flattenMenuLinks(matchedChildren);

    if (section.key === "solutions") {
      links = dedupeLinks(flattenSolutionLinks(matchedChildren));
    }

    return {
      key: section.key,
      label: section.label,
      links,
      fallbackLink: normalizePath(matched?.url || section.fallback),
    };
  });

  const servicesSection = primarySections.find((section) => section.key === "services");
  if (servicesSection) {
    const hasInternetOfThings = servicesSection.links.some((link) => {
      const normalizedLabel = normalizeLabel(link?.label || "").toLowerCase();
      const normalizedUrl = normalizePath(link?.url || "").toLowerCase();
      return (
        normalizedLabel === "internet of things" ||
        normalizedLabel === "iot" ||
        normalizedUrl === "/internet-of-things"
      );
    });

    if (!hasInternetOfThings) {
      servicesSection.links = dedupeLinks([
        ...servicesSection.links,
        { label: "Internet of Things", url: "/internet-of-things" },
      ]);
    }
  }

  const solutionsSection = primarySections.find((section) => section.key === "solutions");
  if (solutionsSection) {
    solutionsSection.links = dedupeLinks([
      ...solutionsSection.links,
      ...REQUIRED_SOLUTION_LINKS,
    ]);
  }

  const investorTopMenu = headerMenus.find(
    (item) => String(item?.label || "").trim().toLowerCase() === "investors",
  );

  const investorLinks = [
    ...(investorTopMenu?.url
      ? [
          {
            label: "Investors",
            url: normalizePath(investorTopMenu.url),
          },
        ]
      : []),
    ...defaultInvestorMenus
      .filter((item) => item?.type !== "dropdown")
      .map((item) => ({
        label: normalizeLabel(item?.label || ""),
        url: resolveInvestorPath(item),
        target: item?.target,
      })),
  ];

  const legalLinks = [
    { label: "Privacy Policy", url: "/privacypolicy" },
    { label: "Terms of Use", url: "/terms-of-use" },
  ];

  return (
    <div>
      <div className="bg-bannerBgColor font-inter pt-2">
        <div className="container relative">
          <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <div>
              <Image
                src={BannerImage}
                alt="Sitemap"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="h-full w-full object-cover max-h-[360px]"
              />
            </div>

            <Breadcrumbs paths={["Sitemap"]} />
            <motion.h1
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade().inLeft}
              className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3"
            >
              Sitemap
            </motion.h1>
          </div>
        </section>
      </div>
      <section className="pt-10 pb-20">
        <div className="container">
          {primarySections.map((section) => {
            const links = section.links.length
              ? section.links
              : section.key === "solutions"
                ? []
              : section.fallbackLink
                ? [{ label: section.label, url: section.fallbackLink }]
                : [];

            return <SectionLinks title={section.label} links={links} key={section.label} />;
          })}

          <SectionLinks title="Investors" links={investorLinks} />

          {defaultInvestorMenus.map((item) => {
            if (!Array.isArray(item?.children) || item.children.length === 0) {
              return null;
            }

            const links = item.children.map((child) => ({
              label: normalizeLabel(child?.label || ""),
              url: resolveInvestorPath(child),
              target: child?.target,
            }));

            return (
              <SectionLinks
                title={`Investors - ${normalizeLabel(item.label || "")}`}
                links={links}
                key={item.label}
              />
            );
          })}

          <SectionLinks title="Legal" links={legalLinks} />
        </div>
      </section>
    </div>
  );
}
