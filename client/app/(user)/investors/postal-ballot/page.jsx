"use client";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import Reportimage from "../../../assets/images/report.jpg";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

export default function PostalBallot() {
  const [postalBallotData, setPostalBallotData] = useState([]);

  const getPostalBallotDataBySession = async () => {
    try {
      const { data } = await axiosInstance("public/postal-ballot/getall");
      setPostalBallotData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostalBallotDataBySession();
  }, []);

  const sortedPostalBallotData = useMemo(
    () =>
      [...postalBallotData].sort(
        (left, right) =>
          new Date(right?.financialYear || 0).getTime() -
          new Date(left?.financialYear || 0).getTime(),
      ),
    [postalBallotData],
  );

  const formatFinancialYearDate = (dateVal) => {
    if (!dateVal) return "";
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return format(d, "dd MMMM yyyy");
      }
    } catch (_) {}
    return String(dateVal);
  };

  return (
    <div className="font-inter">
      {sortedPostalBallotData.map((el) => (
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
                <p className="text-2xl font-semibold text-center mt-3">
                  {formatFinancialYearDate(el.financialYear)}
                </p>
              </div>
              <div className="md:col-span-8 col-span-12">
                <div className="space-y-1.5">
                  {Array.isArray(el?.postals) && el.postals.map((item, subIndex) => (
                    <a
                      href={buildUploadedAssetUrl(item?.file?.filePath)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:text-primary hover:bg-gray-100 flex items-center text-xl ${
                        el?.postals?.length - 1 === subIndex
                          ? "border-none"
                          : "border-b border-[#858484] "
                      } py-1.5`}
                      key={item?.postalName || item?.id || subIndex}
                    >
                      {item.postalName}
                    </a>
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
