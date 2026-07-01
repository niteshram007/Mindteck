export const revalidate = 300;
import React from "react";
import InvestorReportsByType from "./investor-reports-by-type";
import {
  defaultInvestorMenus,
  investorStaticPdfPages,
  investorTitleWithPdfMenu,
  investorTitleWithPdfMenuLabels,
} from "@/app/utils/constant";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

const normalizeText = (value = "") =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const staticInvestorRouteLabels = {
  "annual-report": "Annual Report",
  "buy-back": "Buy Back",
  committees: "Committees",
  "financial-information": "Financial Information",
  notices: "Notices",
  policies: "Policies",
  "postal-ballot": "Postal Ballot",
  "redressal-through-common-odr-portal": "Redressal Through Common ODR Portal",
  "shareholding-pattern": "Shareholding Pattern",
  "stock-exchange-filings": "Stock Exchange Filings",
  "subsidiaries-financials": "Subsidiary Financials",
};

const getInvestorPdfReportsByTitle = unstable_cache(
  async (type) => {
    try {
      const response = await axiosInstance("public/pdf-with-title/getall/" + type);
      return response?.data || [];
    } catch (_error) {
      return [];
    }
  },
  ["public-investor-pdf-with-title"],
  { revalidate },
);

const getAllInvestorPdfReports = unstable_cache(
  async () => {
    try {
      const response = await axiosInstance("public/pdf/getall");
      return response?.data || [];
    } catch (_error) {
      return [];
    }
  },
  ["public-investor-pdf-getall"],
  { revalidate },
);

const resolveInvestorLabel = (pathname = "") => {
  if (investorTitleWithPdfMenuLabels[pathname]) {
    return investorTitleWithPdfMenuLabels[pathname];
  }

  if (investorTitleWithPdfMenu[pathname]) {
    return investorTitleWithPdfMenu[pathname];
  }

  if (investorStaticPdfPages[pathname]) {
    return investorStaticPdfPages[pathname].label;
  }

  if (staticInvestorRouteLabels[pathname]) {
    return staticInvestorRouteLabels[pathname];
  }

  const matchedDefaultLink = defaultInvestorMenus.find(
    (item) => item?.type === "link" && item?.path === pathname,
  );
  return matchedDefaultLink?.label || "";
};

export async function generateMetadata({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const pathname = slug[slug.length - 1] || "";
  const label = resolveInvestorLabel(pathname);

  return getStaticPageMetadata(label ? `/investors/${pathname}` : "/investors");
}

export default async function page({ params }) {
  const { slug } = params;
  const pathname = slug.pop();

  const type = investorTitleWithPdfMenu[pathname];
  if (type) {
    const data = await getInvestorPdfReportsByTitle(type);
    const displayType = investorTitleWithPdfMenuLabels[pathname] || type;
    return <InvestorReportsByType data={data} type={displayType} />;
  }

  const staticPdfPageConfig = investorStaticPdfPages[pathname];
  if (staticPdfPageConfig) {
    const data = await getAllInvestorPdfReports();
    const allowedTypes = new Set(
      staticPdfPageConfig.types.map((item) => normalizeText(item)),
    );

    const filteredData = (data || [])
      .filter((item) => allowedTypes.has(normalizeText(item?.type)))
      .map((item) => ({
        title: item?.title || item?.type || staticPdfPageConfig.label,
        file: item?.file,
      }));

    return (
      <InvestorReportsByType
        data={filteredData}
        type={staticPdfPageConfig.label}
      />
    );
  }

  notFound();
}
