"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { formatString } from "@/app/utils/constant";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
export default function InvestorBreadcrumbs() {
  const pathname = usePathname();
  const menus = pathname.split("/").filter(Boolean);
  const filterMenusWithoutObjectId = menus.filter(
    (str) => !objectIdPattern.test(str)
  );
  const isPressRoomPage = pathname.startsWith("/investors/press-room");
  const breadcrumbPaths = isPressRoomPage
    ? filterMenusWithoutObjectId.slice(0, 2)
    : filterMenusWithoutObjectId;
  const currentPage = isPressRoomPage
    ? "Press Room"
    : formatString(pathname.split("/").pop());
  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
        {currentPage}
      </h1>
    </>
  );
}
