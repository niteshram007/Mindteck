"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DropdownItem from "./dropdown-items";
import { X } from "lucide-react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import {
  defaultInvestorMenus,
  investorStaticPdfPages,
  investorTitleWithPdfMenu,
  investorTitleWithPdfMenuLabels,
} from "@/app/utils/constant";

const INVESTOR_MENU_CACHE_KEY = "mindteck_investor_menus_v1";
const INVESTOR_MENU_CACHE_TTL_MS = 5 * 60 * 1000;

const staticPdfPageLabels = new Set(
  Object.values(investorStaticPdfPages).map((item) => item.label),
);

const titleWithPdfPageLabels = new Set(
  Object.keys(investorTitleWithPdfMenu).map(
    (path) => investorTitleWithPdfMenuLabels[path] || investorTitleWithPdfMenu[path],
  ),
);

const getStaticPdfPath = (label, dataMap) => {
  const filePath = dataMap.get(label);
  if (!filePath) {
    return "";
  }
  return buildUploadedAssetUrl(filePath);
};

const readCachedInvestorMenus = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(INVESTOR_MENU_CACHE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    const cachedAt = Number(parsedValue?.cachedAt || 0);
    if (
      !Array.isArray(parsedValue?.menus) ||
      Date.now() - cachedAt > INVESTOR_MENU_CACHE_TTL_MS
    ) {
      window.sessionStorage.removeItem(INVESTOR_MENU_CACHE_KEY);
      return null;
    }

    return parsedValue.menus;
  } catch (_error) {
    return null;
  }
};

const writeCachedInvestorMenus = (menus) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      INVESTOR_MENU_CACHE_KEY,
      JSON.stringify({
        cachedAt: Date.now(),
        menus,
      }),
    );
  } catch (_error) {}
};

const buildInvestorMenus = (pdfItems = []) => {
  const otherMenusDefault = defaultInvestorMenus[defaultInvestorMenus.length - 1];
  const investorServicesDefault = defaultInvestorMenus[defaultInvestorMenus.length - 2];
  const dataMap = new Map();

  pdfItems.forEach((item) => {
    if (item?.type && item?.file?.filePath) {
      dataMap.set(item.type, item.file.filePath);
    }
  });

  const updatedOtherInfoMenus = otherMenusDefault.children.map((item) => {
    if (item?.target) {
      return item;
    }

    if (
      staticPdfPageLabels.has(item.label) ||
      titleWithPdfPageLabels.has(item.label)
    ) {
      return item;
    }

    const pdfPath = getStaticPdfPath(item.label, dataMap);
    if (!pdfPath) {
      return item;
    }

    return {
      ...item,
      path: pdfPath,
      target: "_blank",
    };
  });

  const updatedInvestorServicesMenus = investorServicesDefault.children.map((item) => {
    if (item?.target) {
      return item;
    }

    if (
      staticPdfPageLabels.has(item.label) ||
      titleWithPdfPageLabels.has(item.label)
    ) {
      return item;
    }

    const pdfPath = getStaticPdfPath(item.label, dataMap);
    if (!pdfPath) {
      return item;
    }

    return {
      ...item,
      path: pdfPath,
      target: "_blank",
    };
  });

  const splitMainMenus = defaultInvestorMenus.slice(0, 7);
  return [
    ...splitMainMenus,
    { ...investorServicesDefault, children: updatedInvestorServicesMenus },
    { ...otherMenusDefault, children: updatedOtherInfoMenus },
  ];
};

const getInitialInvestorMenus = () => readCachedInvestorMenus() || defaultInvestorMenus;

export default function InvestorMenus() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [investorMenus, setInvestorMenus] = useState(getInitialInvestorMenus);
  const pathname = usePathname();

  const getInvestorStaticPdf = async () => {
    const cachedMenus = readCachedInvestorMenus();
    if (cachedMenus) {
      setInvestorMenus(cachedMenus);
      return;
    }

    try {
      const { data } = await axiosInstance("public/pdf/getall");
      const resolvedMenus = buildInvestorMenus(data || []);
      setInvestorMenus(resolvedMenus);
      writeCachedInvestorMenus(resolvedMenus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvestorStaticPdf();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <section className="relative mt-1">
      <div className="container">
        <div className="md:bg-black bg-gray-300 shadow-sm">
          <nav className="relative overflow-visible z-[1]">
            <button
              className="md:hidden rounded-md p-2 hover:bg-accent flex items-center gap-3 focus:bg-transparent active:bg-transparent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-foreground"></span>
                <span className="block h-0.5 w-6 bg-foreground"></span>
                <span className="block h-0.5 w-6 bg-foreground"></span>
              </div>
              Investor menus
            </button>

            <div className="hidden md:block overflow-visible">
              <ul className="flex w-full flex-wrap xl:flex-nowrap justify-center xl:justify-between items-stretch text-white overflow-visible">
                {investorMenus.map((el, index) => (
                  <DropdownItem item={el} key={index} />
                ))}
              </ul>
            </div>

            {isMobileMenuOpen && (
              <div className="absolute left-0 top-full z-50 w-full rounded-md border bg-popover p-2 pt-5 shadow-md md:hidden">
                <X
                  className="h-4 w-4 cursor-pointer absolute right-2 top-1"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                />
                {investorMenus.map((item, index) => (
                  <DropdownItem key={index} item={item} isSubMenu />
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
