import { NextResponse } from "next/server";
import { buildSiteUrl } from "@/app/utils/siteSeo";

export const revalidate = 3600;

const LLM_COMPANY_DESCRIPTION =
  "Mindteck is a global engineering and technology solutions company with 30+ years of expertise across AI/ML, IoT, embedded systems, product engineering, cloud, data, and enterprise transformation.";

const LLMS_SECTIONS = [
  {
    title: "Company",
    pages: [
      {
        path: "/",
        description:
          "Homepage for Mindteck's engineering, AI, IoT, data, and product engineering capabilities.",
      },
      {
        path: "/who-we-are",
        description:
          "Company overview, global footprint, mission, vision, and engineering expertise.",
      },
      {
        path: "/sales-team",
        description:
          "Regional sales leadership and business development contacts.",
      },
      {
        path: "/contact",
        description:
          "Global office locations and contact options for services, partnerships, and investor inquiries.",
      },
    ],
  },
  {
    title: "Services",
    pages: [
      {
        path: "/ai-ml-services",
        description:
          "AI and ML services for automation, analytics, and enterprise transformation.",
      },
      {
        path: "/cloud-service",
        description:
          "Cloud services for migration, modernization, secure operations, and optimization.",
      },
      {
        path: "/data-engineering",
        description:
          "Data engineering and business intelligence services for pipelines, platforms, and reporting.",
      },
      {
        path: "/internet-of-things",
        description:
          "IoT services for connected devices, smart metering, and scalable platforms.",
      },
      {
        path: "/iv-and-v",
        description:
          "Independent verification and validation services for quality, compliance, and release confidence.",
      },
    ],
  },
  {
    title: "Solutions",
    pages: [
      {
        path: "/ai-ml-solutions",
        description:
          "Applied AI and ML solutions for intelligent automation and business outcomes.",
      },
      {
        path: "/asset-tracking",
        description:
          "Asset tracking solutions for connected visibility, monitoring, and utilization analytics.",
      },
      {
        path: "/fleet-management",
        description:
          "Fleet management solutions for telematics, safety, and connected operations.",
      },
      {
        path: "/productivity-improvement",
        description:
          "Productivity improvement solutions for workflow efficiency and operational performance.",
      },
    ],
  },
  {
    title: "Industries",
    pages: [
      {
        path: "/medical-device-and-healthcare",
        description:
          "Engineering services for medical devices, digital health, interoperability, and compliance.",
      },
      {
        path: "/electronics-semiconductor-and-storage",
        description:
          "Semiconductor engineering services spanning product development, testing, and support.",
      },
      {
        path: "/energy-and-utility",
        description:
          "Energy and utility solutions for smart metering, grid modernization, and asset performance.",
      },
      {
        path: "/industrial-automation-solutions",
        description:
          "Manufacturing and industrial automation solutions for integration, validation, and smarter operations.",
      },
    ],
  },
  {
    title: "Resources",
    pages: [
      {
        path: "/resources",
        description:
          "Case studies, brochures, and downloadable resources across Mindteck capabilities.",
      },
      {
        path: "/white-paper/AI-driven-Fault-Inspection",
        description:
          "White paper on AI-driven fault inspection and automated quality control.",
      },
    ],
  },
  {
    title: "Investor And Legal",
    pages: [
      {
        path: "/investors",
        description:
          "Investor relations hub with reports, filings, notices, and governance information.",
      },
      {
        path: "/privacypolicy",
        description:
          "Privacy Policy covering how Mindteck collects, uses, and protects personal information.",
      },
      {
        path: "/terms-of-use",
        description:
          "Terms of Use for Mindteck websites, content access, and user responsibilities.",
      },
      {
        path: "/Sitemap",
        description:
          "Sitemap for navigating public company, service, solution, industry, and investor pages.",
      },
    ],
  },
];

export async function GET() {
  const lines = [
    "# Mindteck",
    "",
    `> ${LLM_COMPANY_DESCRIPTION}`,
    "",
  ];

  LLMS_SECTIONS.forEach((section) => {
    lines.push(`## ${section.title}`);
    section.pages.forEach((page) => {
      lines.push(`- ${buildSiteUrl(page.path)} - ${page.description}`);
    });
    lines.push("");
  });

  return new NextResponse(lines.join("\n").trim() + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
