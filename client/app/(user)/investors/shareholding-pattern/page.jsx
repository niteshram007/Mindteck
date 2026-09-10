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
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const getFinancialYearStart = (year = "") => {
  const startYear = Number(String(year || "").split("-")[0]);
  return Number.isFinite(startYear) ? startYear : -1;
};

const getYearsWithContent = (rows = []) => {
  const yearList = (Array.isArray(rows) ? rows : [])
    .filter((item) => Array.isArray(item?.quarters) && item.quarters.length > 0)
    .map((item) => item?.financialYear)
    .filter(Boolean);

  return [...new Set(yearList)].sort(
    (left, right) => getFinancialYearStart(right) - getFinancialYearStart(left),
  );
};

export default function ShareholdingPattern() {
  const [selectedYear, setSelectedYear] = useState("");
  const [shareholdingPatternData, setShareholdingPatternData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const getShareholdingPatternDataBySession = useCallback(async () => {
    try {
      const session = selectedYear || "";
      const { data } = await axiosInstance(
        "public/share-holding-pattern/getallBySession",
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
          setShareholdingPatternData([]);
          return;
        }

        setSelectedYear(latestYear);
        setShareholdingPatternData(rows.filter((item) => item?.financialYear === latestYear));
        return;
      }

      if (!availableYears.length) {
        setAvailableYears(getYearsWithContent(rows));
      }

      setShareholdingPatternData(rows);
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, availableYears.length]);

  useEffect(() => {
    getShareholdingPatternDataBySession();
  }, [getShareholdingPatternDataBySession]);

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
      {shareholdingPatternData.length > 0 ? (
        shareholdingPatternData.map((item) => (
          <div className="grid grid-cols-1 mt-4" key={item._id}>
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
                  <p className="text-2xl font-semibold text-center mt-2">
                    FY {selectedYear}
                  </p>
                </div>
                <div className="md:col-span-8 col-span-12">
                  <div>
                    {Array.isArray(item?.quarters) &&
                      item.quarters.map((el, subIndex) => (
                        <p className={``} key={el?.file?.filePath || el?.quarterName || subIndex}>
                          <Link
                            href={buildUploadedAssetUrl(el?.file?.filePath)}
                            target="_blank"
                            className={`hover:text-primary hover:bg-gray-100 flex items-center text-xl ${
                              item?.quarters?.length - 1 === subIndex
                                ? "border-none"
                                : "border-b border-[#858484] "
                            } py-1.5`}
                            prefetch={false}
                          >
                            {el?.quarterName || "Quarter Report"}
                          </Link>
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
