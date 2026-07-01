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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const getFinancialYearStart = (year = "") => {
  const startYear = Number(String(year || "").split("-")[0]);
  return Number.isFinite(startYear) ? startYear : -1;
};

const getYearsWithContent = (rows = []) => {
  const yearList = (Array.isArray(rows) ? rows : [])
    .filter((item) => Array.isArray(item?.subsidiaries) && item.subsidiaries.length > 0)
    .map((item) => item?.financialYear)
    .filter(Boolean);

  return [...new Set(yearList)].sort(
    (left, right) => getFinancialYearStart(right) - getFinancialYearStart(left),
  );
};

export default function SubsidiariesFinancial() {
  const [selectedYear, setSelectedYear] = useState("");
  const [allSubsidiariesFinancialData, setAllSubsidiariesFinancialData] = useState([]);

  const availableYears = useMemo(
    () => getYearsWithContent(allSubsidiariesFinancialData),
    [allSubsidiariesFinancialData],
  );

  const subsidiariesFinancialData = useMemo(() => {
    const resolvedYear = selectedYear || availableYears[0] || "";
    if (!resolvedYear) {
      return [];
    }

    return allSubsidiariesFinancialData.filter(
      (item) => item?.financialYear === resolvedYear,
    );
  }, [allSubsidiariesFinancialData, availableYears, selectedYear]);

  const getSubsidiariesFinancialDataDataBySession = useCallback(async () => {
    try {
      const { data } = await axiosInstance(
        "public/subsidiaries-financial/getallBySession",
        {
          params: {
            session: "",
          },
        }
      );

      const rows = Array.isArray(data) ? data : [];
      setAllSubsidiariesFinancialData(rows);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSubsidiariesFinancialDataDataBySession();
  }, [getSubsidiariesFinancialDataDataBySession]);

  useEffect(() => {
    if (!selectedYear && availableYears.length > 0) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

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
      {subsidiariesFinancialData.map((item) => (
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
                <p className="text-2xl font-semibold  text-center mt-2">
                  FY {selectedYear}
                </p>
              </div>
              <div className="md:col-span-8 col-span-12">
                <div>
                  {item?.subsidiaries.map((el, subIndex) => (
                    <Link
                      href={buildUploadedAssetUrl(el?.file?.filePath)}
                      target="_blank"
                      className={`hover:text-primary hover:bg-gray-100 flex items-center text-xl ${
                        item?.subsidiaries?.length - 1 === subIndex
                          ? "border-none"
                          : "border-b border-[#858484] "
                      } py-1.5`}
                      key={el.file.filePath}
                      prefetch={false}
                    >
                      {el.subsidiary}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
