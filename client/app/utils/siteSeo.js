import {
  defaultInvestorMenus,
  investorStaticPdfPages,
  investorTitleWithPdfMenu,
} from "./constant";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_DOMAIN?.startsWith("http")
    ? process.env.NEXT_PUBLIC_DOMAIN
    : `https://${process.env.NEXT_PUBLIC_DOMAIN || "www.mindteck.com"}`
).replace(/\/+$/, "");

export const normalizeSitePath = (value = "/") => {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return "/";
  }

  if (/^https?:\/\//i.test(rawValue)) {
    try {
      return normalizeSitePath(new URL(rawValue).pathname || "/");
    } catch (_error) {
      return "/";
    }
  }

  const withLeadingSlash = rawValue.startsWith("/") ? rawValue : `/${rawValue}`;
  const collapsedPath = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsedPath === "/") {
    return "/";
  }

  return collapsedPath.endsWith("/")
    ? collapsedPath.slice(0, -1)
    : collapsedPath;
};

export const buildSiteUrl = (path = "/") =>
  `${SITE_URL}${normalizeSitePath(path) === "/" ? "" : normalizeSitePath(path)}`;

export const dedupeSitePaths = (paths = []) => {
  const seen = new Set();

  return (Array.isArray(paths) ? paths : [])
    .map((path) => normalizeSitePath(path))
    .filter((path) => {
      if (!path || seen.has(path)) {
        return false;
      }

      seen.add(path);
      return true;
    });
};

export const INVESTOR_CONTEXT_ROUTES = dedupeSitePaths([
  ...Object.keys(investorTitleWithPdfMenu).map((slug) => `/investors/${slug}`),
  ...Object.keys(investorStaticPdfPages).map((slug) => `/investors/${slug}`),
]);

export const PUBLIC_SITE_ROUTES = dedupeSitePaths([
  "/",
  "/who-we-are",
  "/board-of-directors",
  "/management-team",
  "/practice-team",
  "/sales-team",
  "/partners-and-alliances",
  "/research-collaboration",
  "/quality",
  "/csr",
  "/contact",
  "/resources",
  "/book-a-call",
  "/medical-device-and-healthcare",
  "/electronics-semiconductor-and-storage",
  "/data-storage",
  "/energy-and-utility",
  "/industrial-automation-solutions",
  "/life-science-it-solutions-and-analytical-instruments",
  "/ai-ml-services",
  "/bpm-services",
  "/cloud-service",
  "/data-engineering",
  "/digital-transformation",
  "/electronic-design-services-embedded-systems-and-applications",
  "/internet-of-things",
  "/it-infrastructure-and-data-centre-transformation",
  "/iv-and-v",
  "/talent",
  "/ai-ml-solutions",
  "/smartcity-solutions",
  "/asset-tracking",
  "/fleet-management",
  "/productivity-improvement",
  "/ctc-framework",
  "/equipment-data-acquisition",
  "/factory-host",
  "/recipe-management-system",
  "/investors",
  "/investors/press-room",
  "/investors/annual-report",
  "/investors/buy-back",
  "/investors/committees",
  "/investors/financial-information",
  "/investors/notices",
  "/investors/policies",
  "/investors/postal-ballot",
  "/investors/redressal-through-common-odr-portal",
  "/investors/shareholding-pattern",
  "/investors/stock-exchange-filings",
  "/investors/subsidiaries-financials",
  ...defaultInvestorMenus
    .filter((item) => item?.type === "link" && item?.path)
    .map((item) => `/investors/${item.path}`),
  ...INVESTOR_CONTEXT_ROUTES,
  "/white-paper/AI-driven-Fault-Inspection",
  "/privacypolicy",
  "/terms-of-use",
  "/unsubscribe",
  "/Sitemap",
]);

export const LLMS_ROUTE_GROUPS = [
  {
    title: "Company",
    routes: ["/", "/who-we-are", "/board-of-directors", "/management-team", "/contact"],
  },
  {
    title: "Services",
    routes: [
      "/ai-ml-services",
      "/bpm-services",
      "/cloud-service",
      "/data-engineering",
      "/digital-transformation",
      "/electronic-design-services-embedded-systems-and-applications",
      "/internet-of-things",
      "/it-infrastructure-and-data-centre-transformation",
      "/iv-and-v",
      "/talent",
    ],
  },
  {
    title: "Solutions",
    routes: [
      "/ai-ml-solutions",
      "/smartcity-solutions",
      "/asset-tracking",
      "/fleet-management",
      "/productivity-improvement",
      "/ctc-framework",
      "/equipment-data-acquisition",
      "/factory-host",
      "/recipe-management-system",
    ],
  },
  {
    title: "Industries",
    routes: [
      "/medical-device-and-healthcare",
      "/electronics-semiconductor-and-storage",
      "/data-storage",
      "/energy-and-utility",
      "/industrial-automation-solutions",
      "/life-science-it-solutions-and-analytical-instruments",
    ],
  },
  {
    title: "Investors",
    routes: [
      "/investors",
      "/investors/press-room",
      "/investors/annual-report",
      "/investors/financial-information",
      "/investors/policies",
      "/investors/stock-exchange-filings",
      "/investors/redressal-through-common-odr-portal",
    ],
  },
  {
    title: "Resources",
    routes: ["/resources", "/white-paper/AI-driven-Fault-Inspection"],
  },
];
