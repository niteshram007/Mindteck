"use client";

import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

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

const getQuarterPriority = (quarter = "") => {
  const normalizedQuarter = String(quarter || "").trim().toLowerCase();

  if (!normalizedQuarter) {
    return 99;
  }

  if (
    normalizedQuarter.includes("q4") ||
    normalizedQuarter.includes("fourth")
  ) {
    return 0;
  }

  if (
    normalizedQuarter.includes("q3") ||
    normalizedQuarter.includes("third")
  ) {
    return 1;
  }

  if (
    normalizedQuarter.includes("q2") ||
    normalizedQuarter.includes("second")
  ) {
    return 2;
  }

  if (normalizedQuarter.includes("q1") || normalizedQuarter.includes("first")) {
    return 3;
  }

  return 99;
};

const getSectionPriority = (title = "") => {
  const normalizedTitle = String(title || "").trim().toLowerCase();

  if (!normalizedTitle) {
    return 2;
  }

  if (normalizedTitle.includes("presentation")) {
    return 0;
  }

  if (normalizedTitle.includes("financial results")) {
    return 1;
  }

  return 2;
};

const sortFinancialInfoRows = (rows = []) =>
  [...rows].sort((left, right) => {
    const yearDiff =
      getFinancialYearStart(right?.financialYear) -
      getFinancialYearStart(left?.financialYear);

    if (yearDiff !== 0) {
      return yearDiff;
    }

    return getQuarterPriority(left?.quarter) - getQuarterPriority(right?.quarter);
  });

const sortFinancialSections = (sections = []) =>
  [...(Array.isArray(sections) ? sections : [])]
    .filter(Boolean)
    .sort((left, right) => {
      const priorityDiff = getSectionPriority(left?.title) - getSectionPriority(right?.title);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return 0; // Preserve backend top-down insertion order
    });

export default function FinancialInformation() {
  const [selectedYear, setSelectedYear] = useState("");
  const [allFinancialInfo, setAllFinancialInfo] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFinancialInfo = async () => {
      setIsLoading(true);

      try {
        const { data } = await axiosInstance("/public/financial-info/getBySession", {
          params: {
            session: "",
          },
        });

        const rows = Array.isArray(data) ? data : [];

        if (!isMounted) {
          return;
        }

        const yearsWithContent = getYearsWithContent(rows);

        setAllFinancialInfo(rows);
        setAvailableYears(yearsWithContent);
        setSelectedYear(yearsWithContent[0] || "");
      } catch (error) {
        console.log(error);

        if (!isMounted) {
          return;
        }

        setAllFinancialInfo([]);
        setAvailableYears([]);
        setSelectedYear("");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFinancialInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const financialInfoList = useMemo(() => {
    const activeRows = selectedYear
      ? allFinancialInfo.filter((item) => item?.financialYear === selectedYear)
      : allFinancialInfo;

    return sortFinancialInfoRows(activeRows);
  }, [allFinancialInfo, selectedYear]);

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

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-4">
        {isLoading ? (
          <p className="md:col-span-2">Loading financial information...</p>
        ) : financialInfoList?.length > 0 ? (
          financialInfoList.map((el) => {
            const sortedSections = sortFinancialSections(el?.sections);

            return (
              <div
                className="border border-[#D7D7D7] rounded-xl px-4 py-6 mb-4"
                key={el._id}
              >
                <div className="flex sm:flex-nowrap flex-wrap gap-6">
                  <p className="text-gray-300 text-4xl sm:text-5xl md:text-6xl font-bold">
                    {el.quarter}
                  </p>
                  <div className="w-full">
                    <p className="text-3xl font-semibold mb-4">FY {el.financialYear}</p>
                    <div className="space-y-1.5">
                      {sortedSections.map((item, index) => (
                        <React.Fragment
                          key={`${item?.title}-${item?.file?.filePath}-${index}`}
                        >
                          <p className="text-xl">
                            <Link
                              href={buildUploadedAssetUrl(item?.file?.filePath)}
                              target="_blank"
                              prefetch={false}
                            >
                              {item.title}
                            </Link>
                          </p>
                          {sortedSections.length - 1 !== index && (
                            <hr className="border border-[#858484] m-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="md:col-span-2">No Records to Display</p>
        )}
      </div>
    </div>
  );
}
