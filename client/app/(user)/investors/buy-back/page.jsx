export const revalidate = 300;
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";

export default async function page() {
  let data = [];
  try {
    const res = await axiosInstance("public/buyback/getall");
    data = Array.isArray(res?.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching buyback data:", err?.message || err);
  }

  return (
    <div>
      {data.length > 0 ? (
        [...data].reverse().map((el, elIdx) => (
          <Collapsible key={el?._id || el?.year || elIdx}>
            <CollapsibleTrigger className="bg-primary text-md font-semibold text-white flex justify-between w-full px-3 py-2 mb-2 group">
              {el?.year || "Reports"}
              <ChevronDown
                className={`ml-auto transition-transform group-data-[state=open]:rotate-180`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="my-3">
              <p className="text-md font-semibold">General Reports</p>
              {Array.isArray(el?.generalUpdated) && el.generalUpdated.length > 0 ? (
                [...el.generalUpdated].reverse().map((generalItems, gIdx) => (
                  <a
                    key={generalItems?.title || gIdx}
                    href={buildUploadedAssetUrl(generalItems?.file?.filePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] border-b border-gray-300 flex py-1.5 text-[#323030] font-[300] hover:text-primary hover:bg-gray-100"
                  >
                    {generalItems?.title || "Report"}
                  </a>
                ))
              ) : (
                <p className="text-md text-gray-500 py-1">No Record to display</p>
              )}

              <p className="text-md font-semibold mt-4 mb-2">Daily Reports</p>
              {el?.dailyReports && Object.keys(el.dailyReports).length > 0 ? (
                Object.entries(el.dailyReports)
                  .sort((a, b) => {
                    const tA = new Date(a[0]).getTime() || 0;
                    const tB = new Date(b[0]).getTime() || 0;
                    return tB - tA;
                  })
                  .map(([key, value], dIdx) => (
                    <Collapsible key={key || dIdx}>
                      <CollapsibleTrigger className="bg-gray-200 text-md font-semibold text-primary flex justify-between w-full px-3 py-2 border-b-2 border-b-white group">
                        {key}
                        <ChevronDown
                          className={`ml-auto transition-transform group-data-[state=open]:rotate-180`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="my-3">
                        {Array.isArray(value) && value.length > 0 ? (
                          value.map((dailyReportItem, itemIdx) => {
                            let formattedDate = dailyReportItem?.date || "Report";
                            if (dailyReportItem?.date) {
                              try {
                                const parsedDate = new Date(dailyReportItem.date);
                                if (!isNaN(parsedDate.getTime())) {
                                  formattedDate = format(
                                    parsedDate,
                                    "MMMM dd yyyy"
                                  );
                                }
                              } catch (_) {}
                            }
                            return (
                              <a
                                key={dailyReportItem?.date || itemIdx}
                                href={buildUploadedAssetUrl(
                                  dailyReportItem?.file?.filePath
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[16px] border-b border-gray-300 flex py-1.5 text-[#323030] font-[300] hover:text-primary hover:bg-gray-100"
                              >
                                {formattedDate}
                              </a>
                            );
                          })
                        ) : (
                          <p className="text-md text-gray-500 py-1">No Daily Reports</p>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ))
              ) : (
                <p className="text-md text-gray-500 py-1">No Daily Reports to display</p>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-md text-gray-500 py-3">No Records to display</p>
      )}
    </div>
  );
}
