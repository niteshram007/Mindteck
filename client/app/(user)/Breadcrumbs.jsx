"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { formatString } from "../utils/constant";
import { buildSiteUrl, normalizeSitePath } from "@/app/utils/siteSeo";

const BREADCRUMB_SECTION_PREFIXES = [
  {
    label: "About Us",
    prefixes: [
      "/who-we-are",
      "/board-of-directors",
      "/management-team",
      "/practice-team",
      "/sales-team",
      "/partners-and-alliances",
      "/research-collaboration",
      "/quality",
      "/csr",
      "/about-us",
    ],
  },
  {
    label: "Industries",
    prefixes: [
      "/medical-device-and-healthcare",
      "/electronics-semiconductor-and-storage",
      "/data-storage",
      "/energy-and-utility",
      "/industrial-automation-solutions",
      "/life-science-it-solutions-and-analytical-instruments",
    ],
  },
  {
    label: "Services",
    prefixes: [
      "/digital-transformation",
      "/bpm-services",
      "/cloud-service",
      "/data-engineering",
      "/ai-ml-services",
    ],
  },
  {
    label: "Solutions",
    prefixes: [
      "/ai-ml-solutions",
      "/smartcity-solutions",
      "/internet-of-things",
      "/ctc-framework",
      "/equipment-data-acquisition",
      "/factory-host",
      "/recipe-management-system",
      "/asset-tracking",
      "/fleet-management",
      "/productivity-improvement",
      "/it-infrastructure-and-data-centre-transformation",
      "/electronic-design-services-embedded-systems-and-applications",
    ],
  },
  {
    label: "Investors",
    prefixes: ["/investors"],
  },
];

export default function Breadcrumbs({ paths }) {
  const pathname = usePathname() || "";
  const safePaths = Array.isArray(paths) ? [...paths] : [];

  const matchedSection = BREADCRUMB_SECTION_PREFIXES.find((section) =>
    section.prefixes.some((prefix) => pathname.startsWith(prefix)),
  );

  const hasSectionInPath = safePaths.some((item) => {
    if (!matchedSection?.label) return false;
    return (
      formatString(item).trim().toLowerCase() ===
      matchedSection.label.toLowerCase()
    );
  });

  if (matchedSection?.label && !hasSectionInPath) {
    safePaths.unshift(matchedSection.label);
  }

  const currentPath = normalizeSitePath(pathname || "/");
  const currentLabel =
    safePaths.length > 0
      ? formatString(safePaths[safePaths.length - 1])
      : "Home";
  const breadcrumbSchema =
    currentPath === "/"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: buildSiteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: currentLabel,
              item: buildSiteUrl(currentPath),
            },
          ],
        };

  return (
    <>
      {breadcrumbSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      ) : null}
      <nav aria-label="Breadcrumb">
        <ul className="flex gap-1 text-gray-500 md:text-sm text-[10px] py-3 items-center">
          <li>
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
          </li>
          {safePaths.map((el, index) => {
            const formattedLabel = formatString(el);
            const isCurrentPage = index === safePaths.length - 1;

            return (
              <React.Fragment key={`${String(el)}-${index}`}>
                <li aria-hidden="true">
                  <Icons.doubleArrow className="md:w-[20px] md:h-[20px] w-[10px] h-[10px] " />
                </li>
                <li aria-current={isCurrentPage ? "page" : undefined}>
                  {formattedLabel}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
