import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

export default function BODTabs({ activeTab }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-5 mt-1">
        <Link
          scroll={false}
          className={`px-4 py-3 rounded-tl-[12px] rounded-tr-[12px] font-[500] w-[251px] text-center ${
            activeTab === "bod" ? "bg-primary text-white" : "bg-white text-black"
          } `}
          href={"/board-of-directors"}
        >
          Board of Directors
        </Link>

        <Link
          scroll={false}
          className={`px-4 py-3 rounded-tl-[12px] rounded-tr-[12px] w-[251px] text-center font-[500] ${
            activeTab === "management-team"
              ? "bg-primary text-white"
              : "bg-white text-black"
          } `}
          href={"/management-team"}
        >
          Management Team
        </Link>
        <Link
          scroll={false}
          className={`px-4 py-3 rounded-tl-[12px] rounded-tr-[12px] w-[251px] text-center font-[500] ${
            activeTab === "practice-team"
              ? "bg-primary text-white"
              : "bg-white text-black"
          } `}
          href={"/practice-team"}
        >
          Practice Team
        </Link>
        <Link
          scroll={false}
          className={`px-4 py-3 rounded-tl-[12px] rounded-tr-[12px] w-[251px] text-center font-[500] ${
            activeTab === "sales-team" ? "bg-primary text-white" : "bg-white text-black"
          } `}
          href={"/sales-team"}
        >
          Sales Team
        </Link>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
