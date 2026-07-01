"use client";

import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";

const getFinancialYearStart = (year = "") => {
  const start = Number((year || "").split("-")[0]);
  return Number.isFinite(start) ? start : -1;
};

const normalizeIEPFText = (value = "") =>
  String(value || "").replace(/iepf/gi, "IEPF");

const normalizeFinancialYearLabel = (year = "", type = "") => {
  const normalizedType = String(type || "").toLowerCase();
  if (
    normalizedType.includes("transfer of equity shares to iepf") &&
    String(year || "").trim() === "2000-2001"
  ) {
    return "2000-2008";
  }
  return year;
};

const renderReportRow = (item) => {
  const key = item?._id || `${item?.title || "untitled"}-${item?.file?.filePath || ""}`;
  const title = normalizeIEPFText(item?.title || "-");

  return (
    <p key={key}>
      <a
        href={buildUploadedAssetUrl(item?.file?.filePath)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl border-b border-gray-300 flex items-center gap-4 py-1.5 text-[#323030] font-[300] hover:text-primary hover:bg-gray-100"
      >
        {title}
      </a>
    </p>
  );
};

export default function InvestorReportsByType({ data = [], type = "" }) {
  if (!data.length) {
    return <p>No Records to Display</p>;
  }

  const hasFinancialYear = data.some((item) => item?.financialYear);
  if (!hasFinancialYear) {
    return <div className="font-inter">{data.map((item) => renderReportRow(item))}</div>;
  }

  const groupedByYear = data.reduce((acc, item) => {
    const year = item?.financialYear || "Other";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => {
    if (a === "Other") {
      return 1;
    }
    if (b === "Other") {
      return -1;
    }
    return getFinancialYearStart(b) - getFinancialYearStart(a);
  });

  return (
    <div className="font-inter">
      {sortedYears.map((year) => (
        <div key={year} className="mb-7">
          <h3 className="text-2xl font-bold mb-3">
            {year === "Other" ? "Other" : `FY ${normalizeFinancialYearLabel(year, type)}`}
          </h3>
          {groupedByYear[year].map((item) => renderReportRow(item))}
        </div>
      ))}
    </div>
  );
}

