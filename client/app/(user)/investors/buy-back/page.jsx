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
  const { data } = await axiosInstance("public/buyback/getall");
  return (
    <div>
      {data?.map((el) => (
        <Collapsible key={el._id}>
          <CollapsibleTrigger className="bg-primary text-md font-semibold text-white flex justify-between w-full px-3 py-2 mb-2 group">
            {el.year}
            <ChevronDown
              className={`ml-auto transition-transform group-data-[state=open]:rotate-180`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="my-3">
            <p className="text-md font-semibold">General Reports</p>
            {el.generalUpdated.length > 0 ? (
              el?.generalUpdated?.map((generalItems) => (
                <a
                  key={generalItems.title}
                  href={buildUploadedAssetUrl(generalItems?.file?.filePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[16px] border-b border-gray-300  flex py-1.5 text-[#323030] font-[300] hover:text-primary hover:bg-gray-100"
                >
                  {generalItems.title}
                </a>
              ))
            ) : (
              <p className="text-md">No Record to display</p>
            )}

            <p className="text-md font-semibold mt-4 mb-2">Daily Reports</p>
            {el?.dailyReports &&
              Object.entries(el?.dailyReports)
                .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                .map(([key, value]) => (
                  <Collapsible key={key}>
                    <CollapsibleTrigger className="bg-gray-200 text-md font-semibold text-primary flex justify-between w-full px-3 py-2 border-b-2 border-b-white group">
                      {key}
                      <ChevronDown
                        className={`ml-auto transition-transform group-data-[state=open]:rotate-180`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="my-3">
                      {value.map((dailyReportItem) => (
                        <a
                          key={dailyReportItem.date}
                          href={buildUploadedAssetUrl(dailyReportItem?.file?.filePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[16px] border-b border-gray-300  flex py-1.5 text-[#323030] font-[300] hover:text-primary hover:bg-gray-100"
                        >
                          {dailyReportItem?.date &&
                            format(
                              new Date(dailyReportItem.date),
                              "MMMM dd yyyy"
                            )}
                        </a>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
