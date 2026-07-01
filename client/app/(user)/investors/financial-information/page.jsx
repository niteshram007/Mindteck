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
import React, { useCallback, useEffect, useState } from "react";

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
  const [financialInfoList, setFinancialInfoList] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const getFinancialInfoByYear = useCallback(async () => {
    try {
      const session = selectedYear || "";
      const { data } = await axiosInstance(
        "/public/financial-info/getBySession",
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
          setFinancialInfoList([]);
          return;
        }

        setSelectedYear(latestYear);
        setFinancialInfoList(rows.filter((item) => item?.financialYear === latestYear));
        return;
      }

      if (!availableYears.length) {
        setAvailableYears(getYearsWithContent(rows));
      }

      setFinancialInfoList(rows);
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, availableYears.length]);

  useEffect(() => {
    getFinancialInfoByYear();
  }, [getFinancialInfoByYear]);

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
        {financialInfoList?.length > 0 ? (
          financialInfoList.map((el) => (
            <div
              className="border border-[#D7D7D7] rounded-xl px-4 py-6 mb-4"
              key={el._id}
            >
              <div className="flex sm:flex-nowrap flex-wrap gap-6">
                <p className="text-gray-300 text-4xl sm:text-5xl md:text-6xl font-bold">{el.quarter}</p>
                <div className="w-full">
                  <p className="text-3xl font-semibold mb-4">
                    FY {el.financialYear}
                  </p>
                  <div className="space-y-1.5">
                    {el.sections.map((item, index) => (
                      <React.Fragment key={`${item?.title}-${item?.file?.filePath}-${index}`}>
                        <p className="text-xl">
                          <Link
                            href={buildUploadedAssetUrl(item?.file?.filePath)}
                            target="_blank"
                            prefetch={false}
                          >
                            {item.title}
                          </Link>
                        </p>
                        {el.sections.length - 1 !== index && (
                          <hr className="border border-[#858484] m-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Records to Display</p>
        )}
      </div>
    </div>
  );
}
