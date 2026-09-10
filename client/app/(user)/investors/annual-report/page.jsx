"use client";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import Reportimage from "../../../assets/images/report.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const normalizeAnnualReportFilePath = (filePath = "") => {
  const value = String(filePath || "").trim();
  if (!value) return "";
  if (value.includes("/")) return value;
  return `investor_annual_report/${value}`;
};

const hasLegacyUnscopedPath = (filePath = "") =>
  Boolean(filePath) && !String(filePath).includes("/");

const getUniqueSections = (sections = []) => {
  const seen = new Set();
  const unique = (Array.isArray(sections) ? sections : []).filter((item) => {
    const normalizedPath = normalizeAnnualReportFilePath(item?.file?.filePath);
    const key = `${String(item?.title || "").trim()}::${normalizedPath}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  const getOrder = (title) => {
    const t = String(title || "").toLowerCase();
    if (t.includes("annual report")) return 1;
    if (t.includes("balance sheet")) return 2;
    if (t.includes("profit & loss") || t.includes("profit and loss") || t.includes("profit &loss")) return 3;
    if (t.includes("notice of annual general meeting") || t.includes("notice of agm")) return 4;
    return 5;
  };

  return unique.sort((a, b) => getOrder(a.title) - getOrder(b.title));
};

const getFinancialYearStart = (year = "") => {
  const startYear = Number(String(year || "").split("-")[0]);
  return Number.isFinite(startYear) ? startYear : -1;
};

const getYearsWithContent = (rows = []) => {
  const yearList = (Array.isArray(rows) ? rows : [])
    .filter((item) => Array.isArray(item?.sections) && item.sections.length > 0)
    .map((item) => item?.financialYear)
    .filter(Boolean);

  return [...new Set(yearList)].sort(
    (left, right) => getFinancialYearStart(right) - getFinancialYearStart(left),
  );
};

export default function FinancialInformation() {
  const [selectedYear, setSelectedYear] = useState("");
  const [annualReport, setAnnualReport] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const getAnnualReportByYear = useCallback(async () => {
    try {
      const session = selectedYear || "";
      const { data } = await axiosInstance(
        "public/annual-report/getBySession",
        {
          params: {
            session,
          },
        }
      );

      const rows = Array.isArray(data) ? data : [];

      if (!selectedYear) {
        const yearsWithContent = getYearsWithContent(rows);
        setAvailableYears(yearsWithContent);

        const latestYear = yearsWithContent[0] || "";
        if (!latestYear) {
          setAnnualReport([]);
          return;
        }

        setSelectedYear(latestYear);
        setAnnualReport(rows.filter((item) => item?.financialYear === latestYear));
        return;
      }

      if (!availableYears.length) {
        setAvailableYears(getYearsWithContent(rows));
      }

      setAnnualReport(rows);
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, availableYears.length]);

  useEffect(() => {
    getAnnualReportByYear();
  }, [getAnnualReportByYear]);

  return (
    <div className="font-inter">
      <div className="max-w-[200px]">
        <Select
          onValueChange={(value) => {
            setSelectedYear(value);
          }}
          value={selectedYear}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Financial Year" />
          </SelectTrigger>

          <SelectContent className="max-h-[300px]">
            {availableYears.map((el) => (
              <SelectItem value={el} key={el}>
                {el}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {annualReport.length > 0 ? (
        annualReport.map((el) => (
          <div className="grid grid-cols-1 mt-4" key={el._id}>
            <div className="border border-[#D7D7D7] rounded-xl px-4 py-6 mb-4">
              <div className="grid grid-cols-12 md:gap-4 gap-2 items-center">
                <div className="md:col-span-4 col-span-12 text-center">
                  <Image
                    src={Reportimage}
                    width={120}
                    height={120}
                    className="m-auto w-[50px]"
                    alt="report"
                  />
                  <p className="text-md text-[#AFAFAF] uppercase mt-3 font-[500]">
                    Annual Report
                  </p>
                  <p className="text-2xl font-semibold  text-center">
                    FY {el?.financialYear}
                  </p>
                </div>
                <div className="md:col-span-8 col-span-12">
                  <div className="space-y-1.5">
                    {getUniqueSections(el?.sections).map((item, index, uniqueSections) => (
                      <p
                        className={`text-xl ${
                          uniqueSections.length - 1 === index
                            ? "border-b-0"
                            : "border-b border-[#858484] "
                        } pb-1.5`}
                        key={`${item.title}-${normalizeAnnualReportFilePath(item?.file?.filePath)}`}
                      >
                        {hasLegacyUnscopedPath(item?.file?.filePath) ? (
                          <span className="text-gray-500">{item.title}</span>
                        ) : (
                          <a
                            href={buildUploadedAssetUrl(
                              normalizeAnnualReportFilePath(item?.file?.filePath),
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </a>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-3">No Records to Display</p>
      )}
    </div>
  );
}
