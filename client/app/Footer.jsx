// "use client";

import { staggerItem, varContainer, varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
import LogoWhite from "../app/assets/images/logo-white.png";
import Link from "next/link";
import { ensureAboutUsChildren } from "./utils/aboutMenu";
import { getCmsMenu } from "./utils/cmsMenu";

export default async function Footer() {
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

  const [mainMenuItems, topNavItems] = await Promise.all([
    getCmsMenu("main", { revalidate: 900 }),
    getCmsMenu("header", { revalidate: 900 }),
  ]);

  const nonClickableSectionHeadings = new Set([
    "about us",
    "industries",
    "service",
    "services",
    "solution",
    "solutions",
    "iot",
    "semiconductor",
    "semiconductors",
    "smart city solutions",
  ]);

  const nonClickableSolutionSubHeadings = new Set([
    "iot",
    "iot solutions",
    "semiconductor",
    "semiconductors",
    "electronics semiconductor and storage",
    "electronics-semiconductor-and-storage",
    "smart city solutions",
  ]);

  const footerRouteMap = {
    "about us": "/who-we-are",
    industries: "/medical-device-and-healthcare",
    service: "/digital-transformation",
    services: "/digital-transformation",
    solution: "/smartcity-solutions",
    solutions: "/smartcity-solutions",
    "press room": "/investors/press-room",
    investors: "/investors",
    career: "http://careers.mindteck.com/",
    careers: "http://careers.mindteck.com/",
    "white paper": "/white-paper/AI-driven-Fault-Inspection",
    whitepaper: "/white-paper/AI-driven-Fault-Inspection",
    "ai/ml": AI_ML_SOLUTION_PATH,
    "ai ml": AI_ML_SOLUTION_PATH,
    "artificial intelligence/ machine learning": AI_ML_SOLUTION_PATH,
    "artificial intelligence / machine learning": AI_ML_SOLUTION_PATH,
    iot: IOT_SERVICE_PATH,
    "internet of things": IOT_SERVICE_PATH,
    "it talent": TALENT_SERVICE_PATH,
    talent: TALENT_SERVICE_PATH,
    resources: "/resources",
    contact: "/contact",
    "contact us": "/contact",
  };

  const normalizeFooterHref = (url = "#") => {
    const trimmedUrl = String(url || "").trim();

    if (!trimmedUrl || trimmedUrl === "#") {
      return "#";
    }

    if (/^https?:\/\//i.test(trimmedUrl) || trimmedUrl.startsWith("mailto:")) {
      return trimmedUrl;
    }

    if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#")) {
      return trimmedUrl;
    }

    return `/${trimmedUrl}`;
  };

  const resolveFooterLink = (label, fallbackUrl = "#") => {
    const key = String(label || "").trim().toLowerCase();
    if (!key) {
      return normalizeFooterHref(fallbackUrl);
    }
    const isAiMlLabel =
      key === "ai/ml" ||
      key === "ai ml" ||
      key === "artificial intelligence/ machine learning" ||
      key === "artificial intelligence / machine learning";

    if (isAiMlLabel) {
      return normalizeFooterHref(fallbackUrl || AI_ML_SOLUTION_PATH);
    }

    if (footerRouteMap[key]) {
      return normalizeFooterHref(footerRouteMap[key]);
    }

    if (key === "solution" || key === "solutions") {
      return "/smartcity-solutions";
    }

    return normalizeFooterHref(fallbackUrl);
  };

  const normalizeMenuLabel = (label = "") => {
    const safeLabel = String(label || "");
    const normalizedLabel = safeLabel.replace(/\bHealth Care\b/g, "Healthcare");
    const normalizedKey = normalizedLabel.trim().toLowerCase();

    if (normalizedLabel === "Service") {
      return "Services";
    }

    if (normalizedLabel === "Solution") {
      return "Solutions";
    }

    if (normalizedLabel === "Data Storage") {
      return "Storage";
    }

    if (
      normalizedKey === "software product testing - iv & v" ||
      normalizedKey === "software product testing- iv & v" ||
      normalizedKey === "iv and v" ||
      normalizedKey === "iv&v"
    ) {
      return "IV & V";
    }

    if (
      normalizedLabel === "Internet of Things" ||
      normalizedLabel === "IoT" ||
      normalizedLabel === "IOT Service"
    ) {
      return "Internet of Things";
    }

    if (normalizedLabel === "IT Talent") {
      return "Talent";
    }

    if (normalizedLabel === "Medical Device and Healthcare") {
      return "Medical Devices and Healthcare";
    }

    return normalizedLabel;
  };

  const isIoTSolutionChildNode = (node) => {
    const nodeLabel = String(node?.label || "").trim().toLowerCase();
    const nodeUrl = String(node?.url || "").trim().toLowerCase();

    return IOT_SOLUTION_CHILDREN.some(
      (entry) =>
        entry.label.toLowerCase() === nodeLabel || entry.url.toLowerCase() === nodeUrl,
    );
  };

  const getIoTSolutionChildSortIndex = (node) => {
    const nodeLabel = String(node?.label || "").trim().toLowerCase();
    const nodeUrl = String(node?.url || "").trim().toLowerCase();
    const matchedIndex = IOT_SOLUTION_CHILDREN.findIndex(
      (entry) =>
        entry.url.toLowerCase() === nodeUrl || entry.label.toLowerCase() === nodeLabel,
    );

    return matchedIndex === -1 ? 999 : matchedIndex;
  };

  const ensureFooterIoTSolutionChildren = (children = [], promotedChildren = []) => {
    const combinedChildren = [
      ...(Array.isArray(children) ? children.filter(Boolean) : []),
      ...(Array.isArray(promotedChildren) ? promotedChildren.filter(Boolean) : []),
    ];
    const dedupedChildren = [];
    const seen = new Set();

    combinedChildren.forEach((child) => {
      if (!child) return;

      const label = normalizeMenuLabel(child?.label || "");
      const href = resolveFooterLink(child?.label || "", child?.url || "#");
      const key = `${String(href || "").toLowerCase()}::${String(label || "")
        .trim()
        .toLowerCase()}`;

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

  const shouldExpandFooterSection = (label = "") => {
    const key = String(label || "").trim().toLowerCase();
    return key === "solutions" || key === "solution";
  };

  const isNonClickableSolutionSubHeading = (label = "") => {
    const key = String(label || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    return nonClickableSolutionSubHeadings.has(key);
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

  const buildFooterLinks = (section) => {
    const isSolutionsSection = shouldExpandFooterSection(section?.label);
    const sectionLabelKey = String(section?.label || "").trim().toLowerCase();
    const isServicesSection = sectionLabelKey === "services" || sectionLabelKey === "service";
    const links = [];
    const sectionChildren =
      sectionLabelKey === "about us"
        ? ensureAboutUsChildren(section?._children || [], {
            resolveUrl: (value) => resolveFooterLink("", value).toLowerCase(),
          })
        : Array.isArray(section?._children)
          ? section._children.filter(Boolean)
          : [];
    const promotedIoTSolutionChildren = mainMenuItems.filter((item) =>
      isIoTSolutionChildNode(item),
    );

    const isAIMLNode = (node) => {
      if (!node) return false;
      const nodeLabel = String(node?.label || "").trim().toLowerCase();
      const nodeUrl = String(node?.url || "").trim().toLowerCase();
      return (
        nodeLabel === "ai/ml" ||
        nodeLabel === "ai ml" ||
        nodeLabel.includes("artificial intelligence") ||
        nodeUrl === "/ai-ml-services" ||
        nodeUrl === AI_ML_SOLUTION_PATH
      );
    };

    const isIOTNode = (node) => {
      if (!node) return false;
      const nodeLabel = String(node?.label || "").trim().toLowerCase();
      const nodeUrl = String(node?.url || "").trim().toLowerCase();
      return (
        nodeLabel === "iot" ||
        nodeLabel === "iot service" ||
        nodeLabel === "internet of things" ||
        nodeUrl === IOT_SERVICE_PATH
      );
    };

    const isITTalentNode = (node) => {
      if (!node) return false;
      const nodeLabel = String(node?.label || "").trim().toLowerCase();
      const nodeUrl = String(node?.url || "").trim().toLowerCase();
      return (
        nodeLabel === "it talent" ||
        nodeLabel === "it-talent" ||
        nodeLabel === "talent" ||
        nodeLabel.includes("it talent") ||
        nodeUrl === TALENT_SERVICE_PATH ||
        nodeUrl === LEGACY_IT_TALENT_SERVICE_PATH
      );
    };

    const getServiceSortIndex = (node) => {
      const nodeLabel = String(node?.label || "").trim().toLowerCase();
      const nodeUrl = String(node?.url || "").trim().toLowerCase();

      if (isAIMLNode(node)) return 0;
      if (nodeLabel.includes("business process") || nodeUrl === "/bpm-services") return 1;
      if (
        nodeLabel === "eds" ||
        nodeLabel.includes("embedded design") ||
        nodeLabel.includes("electronic design") ||
        nodeUrl === "/electronic-design-services-embedded-systems-and-applications"
      ) {
        return 2;
      }
      if (nodeLabel === "cloud" || nodeUrl === "/cloud-service") return 3;
      if (nodeLabel.includes("data engineering") || nodeUrl === "/data-engineering") return 4;
      if (
        nodeLabel.includes("digital transformation") ||
        nodeUrl === "/digital-transformation"
      ) {
        return 5;
      }
      if (isIOTNode(node)) return 6;
      if (
        nodeLabel.includes("it infrastructure") ||
        nodeUrl === "/it-infrastructure-and-data-centre-transformation"
      ) {
        return 7;
      }
      if (
        nodeLabel === "iv & v" ||
        nodeLabel.includes("software product testing") ||
        nodeUrl === "/iv-and-v"
      ) {
        return 8;
      }
      if (isITTalentNode(node)) return 9;

      return 999;
    };

    const existingAIMLNode = sectionChildren.find((child) => isAIMLNode(child));
    const existingIOTNode = sectionChildren.find((child) => isIOTNode(child));
    const existingITTalentNode = sectionChildren.find((child) => isITTalentNode(child));
    const remainingChildren = sectionChildren.filter(
      (child) => !isAIMLNode(child) && !isIOTNode(child) && !isITTalentNode(child),
    );
    let preparedChildren = sectionChildren;

    if (isServicesSection) {
      preparedChildren = [
        {
          ...(existingAIMLNode || {}),
          label: "AI/ML",
          url: AI_ML_SERVICE_PATH,
          children: [],
        },
        {
          ...(existingIOTNode || {}),
          label: "Internet of Things",
          url: IOT_SERVICE_PATH,
          children: [],
        },
        ...remainingChildren,
        {
          ...(existingITTalentNode || {}),
          label: "Talent",
          url: TALENT_SERVICE_PATH,
          children: [],
        },
      ].sort((left, right) => getServiceSortIndex(left) - getServiceSortIndex(right));
    } else if (isSolutionsSection) {
      preparedChildren = [
        {
          ...(existingAIMLNode || {}),
          label: "AI/ML",
          url: AI_ML_SOLUTION_PATH,
          children: [],
        },
        {
          ...(existingIOTNode || {}),
          label: "Internet of Things",
          url: IOT_SERVICE_PATH,
          children: ensureFooterIoTSolutionChildren(
            existingIOTNode?.children || [],
            promotedIoTSolutionChildren,
          ),
        },
        ...remainingChildren,
      ];
    }

    const pushLink = (node, depth) => {
      if (!node) return;
      const label = normalizeMenuLabel(node.label);
      if (!label) return;
      const isSolutionHeading =
        isSolutionsSection && depth === 0 && isNonClickableSolutionSubHeading(node.label || label);
      links.push({
        key: node?.url || node?._id || `${label}-${links.length}`,
        label,
        href: isSolutionHeading ? "#" : resolveFooterLink(node.label, node.url),
        depth,
        isNonClickable: isSolutionHeading,
      });
    };

    preparedChildren.forEach((child) => {
      pushLink(child, 0);
      if (isSolutionsSection && Array.isArray(child?.children)) {
        child.children.filter(Boolean).forEach((sub) => pushLink(sub, 1));
      }
    });

    return links;
  };

  const isSectionHeadingNonClickable = (label = "") =>
    nonClickableSectionHeadings.has(String(label || "").trim().toLowerCase());

  const isExternalFooterLink = (href = "") => /^https?:\/\//i.test(href);

  const renderFooterLink = (href = "#", label = "", className = "") => {
    const resolvedHref = withSmartCityAnchor(href, label);

    if (!resolvedHref || resolvedHref === "#") {
      return <span className={className}>{label}</span>;
    }

    if (isExternalFooterLink(resolvedHref)) {
      return (
        <a href={resolvedHref} className={className} target="_blank" rel="noreferrer">
          {label}
        </a>
      );
    }

    return (
      <Link href={resolvedHref} className={className}>
        {label}
      </Link>
    );
  };

  const priorityOrder = ["about us", "industries", "services", "solutions", "service", "solution"];

  const getPriority = (label = "") => {
    const key = String(label || "").trim().toLowerCase();
    const idx = priorityOrder.indexOf(key);
    return idx === -1 ? 999 : idx;
  };

  const menuSections = mainMenuItems
    .filter(Boolean)
    .map((el, index) => ({
      ...el,
      _index: index,
      _children: Array.isArray(el?.children) ? el.children.filter(Boolean) : [],
    }))
    .filter((el) => {
      if (!el?.label) return false;
      if (el.label === "Technology") return false;
      if (isIoTSolutionChildNode(el)) return false;
      return el._children.length > 0;
    })
    .sort((a, b) => {
      const pa = getPriority(a.label);
      const pb = getPriority(b.label);
      if (pa !== pb) return pa - pb;
      return a._index - b._index;
    });

  return (
    <footer data-site-footer="true" className="bg-footerBg pt-10 font-inter relative overflow-hidden before:bg-[url('./assets/images/banners-and-bg/bg-pattern-3.png')] before:opacity-[0.03] before:h-full before:absolute before:w-full before:left-0 before:right-0 before:top-0 before:z-0">
      <div className="container z-10 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pb-10">
          {/* Logo + Social */}
          <motion.div
            className="order-last"
            initial={false}
            whileInView="visible"
            viewport={{ once: true }}
            // variants={varFade({ delay: 0.2 }).in}
          >
            <div className="text-teal-600">
              <Image width={236} height={50} src={LogoWhite.src} alt="logo" />
            </div>
            <p className="mt-4 text-[#fbfbfba1] text-sm leading-relaxed">
              We are the global engineering and technology solutions company
              devoted to delivering knowledge that matters to help clients
              compete, innovate and propel forward along the digital continuum.
            </p>
            <ul className="mt-3 flex gap-6">
              {/* LinkedIn */}
              <li>
                <Link
                  href="https://www.linkedin.com/company/mindteck"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Menu Widgets */}
          {menuSections.map((el) => {
            const sectionHeading = normalizeMenuLabel(el.label);
            const sectionHeadingLink = resolveFooterLink(el.label, "");
            const shouldDisableSectionHeadingLink = isSectionHeadingNonClickable(el.label);
            const footerLinks = buildFooterLinks(el);

            return (
              <div className="footer-widget text-white order-first" key={el?.label || el?._id}>
                <h4 className="text-lg font-semibold mb-3">
                  {!shouldDisableSectionHeadingLink && sectionHeadingLink ? (
                    renderFooterLink(sectionHeadingLink, sectionHeading, "hover:text-secondary transition-colors")
                  ) : (
                    <span>{sectionHeading}</span>
                  )}
                </h4>

                {/* Parent UL handles animation for all LI */}
                <motion.ul
                  className="text-sm font-normal"
                  variants={varContainer({ delay: 0.1, staggerIn: 0.08 })}
                  initial={false}
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {footerLinks.map((link, index) => (
                    <motion.li
                      key={link.key || `${link.label}-${index}`}
                      variants={staggerItem}
                      className={`mb-2 transition-all group relative ${link.depth ? "pl-4 text-[0.82rem]" : ""}`}
                    >
                      {link.isNonClickable ? (
                        <span className="text-[#fbfbfba1] cursor-default">{link.label}</span>
                      ) : (
                        renderFooterLink(link.href, link.label, "text-[#fbfbfba1]")
                      )}
                      <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                      <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav + Copyright */}
      <div className="bg-[#004730] z-10 relative py-4">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1">
            <div className="md:col-span-12 col-span-12 text-white">
              <motion.ul
                className="text-sm font-normal flex flex-wrap gap-3 md:justify-start justify-center"
                initial="hidden"
                whileInView="visible"
                // variants={varFade({ delay: 0.2 }).inLeft}
                viewport={{ once: true }}
              >
                {topNavItems.filter(Boolean).map((el, index) => (
                  <li
                    key={el?.url || el?._id || `${el?.label}-${index}`}
                    className="text-yellow-100 font-semibold text-sm group relative w-max"
                  >
                    {renderFooterLink(
                      resolveFooterLink(el?.label, el?.url),
                      normalizeMenuLabel(el?.label),
                      ""
                    )}
                    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                  </li>
                ))}

                <li className="text-yellow-100 font-semibold text-sm group relative w-max">
                  <Link href="/Sitemap">Sitemap
                      <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                      <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span></Link>
                </li>
                <li className="text-yellow-100 font-semibold text-sm group relative w-max">
                  <Link href="/privacypolicy">Privacy Policy
                      <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                      <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span></Link>
                </li>
                <li className="text-yellow-100 font-semibold text-sm group relative w-max">
                  <Link href="/terms-of-use">Terms of Use
                      <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span>
                      <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-secondary group-hover:w-3/6"></span></Link>
                </li>
              </motion.ul>
            </div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={varFade().inRight}
              viewport={{ once: true }}
              className="md:text-left text-center text-sm font-inter md:mt-3 mt-3 text-white md:col-span-12 col-span-12"
            >
              © {new Date().getFullYear()} Mindteck. All Rights Reserved
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}


