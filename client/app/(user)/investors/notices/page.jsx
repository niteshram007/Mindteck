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
import { Square } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const getFinancialYearStart = (year = "") => {
  const startYear = Number(String(year || "").split("-")[0]);
  return Number.isFinite(startYear) ? startYear : -1;
};

const getYearsWithContent = (rows = []) => {
  const yearList = (Array.isArray(rows) ? rows : [])
    .filter((item) => Array.isArray(item?.notices) && item.notices.length > 0)
    .map((item) => item?.financialYear)
    .filter(Boolean);

  return [...new Set(yearList)].sort(
    (left, right) => getFinancialYearStart(right) - getFinancialYearStart(left),
  );
};

export default function Notices() {
  const [selectedYear, setSelectedYear] = useState("");
  const [notices, setNotices] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const getNoticesBySession = useCallback(async () => {
    try {
      const session = selectedYear || "";
      const { data } = await axiosInstance("public/notice/getBySession", {
        params: {
          session,
        },
      });

      const rows = Array.isArray(data) ? data : [];

      if (!selectedYear) {
        const yearsWithContent = getYearsWithContent(rows);
        setAvailableYears(yearsWithContent);

        const latestYear = yearsWithContent[0] || "";
        if (!latestYear) {
          setNotices([]);
          return;
        }

        setSelectedYear(latestYear);
        setNotices(rows.filter((item) => item?.financialYear === latestYear));
        return;
      }

      if (!availableYears.length) {
        setAvailableYears(getYearsWithContent(rows));
      }

      setNotices(rows);
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear, availableYears.length]);

  useEffect(() => {
    getNoticesBySession();
  }, [getNoticesBySession]);

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

      {notices.length > 0 ? (
        <div className="mt-7">
          <p className="text-2xl font-bold mb-3">FY {selectedYear}</p>
          {[...(notices || [])].sort((a, b) => {
            const hasAgm = (item) => {
              const h = String(item.heading || "").toLowerCase();
              if (h.includes("annual general meeting") || h.includes("agm")) return true;
              if (item.notices?.some(n => {
                const t = String(n.title || "").toLowerCase();
                return t.includes("annual general meeting") || t.includes("agm") || n.title?.includes("Notice of 33rd Annual General Meeting");
              })) return true;
              return false;
            };
            const aAgm = hasAgm(a);
            const bAgm = hasAgm(b);
            if (aAgm && !bAgm) return -1;
            if (!aAgm && bAgm) return 1;
            return 0;
          }).map((item) => (
            <div key={item._id} className="mb-10">
              <h4 className="text-xl font-semibold border-b border-gray-500 pb-1.5">
                {(() => {
                  const h = String(item.heading || "").trim();
                  if (h.toLowerCase().includes("33rd annual general meeting")) {
                    return "Annual General Meeting";
                  }
                  return h;
                })()}
              </h4>

              {
                (() => {
                  const getNoticeOrder = (title) => {
                    const t = String(title || "").toLowerCase();
                    if (t.includes("annual general meeting") || t.includes("agm")) return 1;
                    return 2;
                  };
                
                  const sorted = [...(item.notices || [])]
                    .sort((a, b) => getNoticeOrder(a.title) - getNoticeOrder(b.title));
                
                  return sorted.map((el) => (
                    <p
                      className="text-xl border-b border-gray-500  flex items-center gap-4 py-1.5"
                      key={el.title}
                    >
                      <Square className="fill-[black] rounded-none" size={10} />
                      <Link
                        href={buildUploadedAssetUrl(el?.file?.filePath)}
                        target="_blank"
                        prefetch={false}
                      >
                        {el.title}
                      </Link>
                    </p>
                  ));
                })()
              }
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3">No Records to Display</p>
      )}
    </div>
  );
}
