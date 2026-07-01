import { MainNavBar } from "@/app/navbar";
import Image from "next/image";
import React from "react";
import InvestorBreadcrumbs from "./investor-breadcrumbs";
import BannerImage from "../../assets/images/banners-and-bg/investor-banner.jpg";
import InvestorMenus from "./investor-menus";
import nextDynamic from "next/dynamic";
import InvestorScrollTopOnRoute from "./scroll-top-on-route";
import TradingWindowCard from "./trading-window-card";

const StockDetail = nextDynamic(() => import("./stock-detail"), { ssr: false });
const FeedbackForm = nextDynamic(() => import("./feedback-form"), { ssr: false });
const VISION_STATEMENT =
  "To be the engineering and technology partner that global innovators trust when the work is complex, the stakes are high, and execution cannot fail.";

const MISSION_STATEMENT =
  "Mindteck brings over 30 years of hands-on expertise in product engineering, embedded systems, AI, and enterprise data storage, including cloud-native storage platforms, distributed systems, and storage testing, to help clients across medical devices, semiconductors, life sciences, analytical instruments, energy utilities, manufacturing, and smart infrastructure build reliable products and systems, with the technical depth, rigorous process, and senior-level attention that complex engineering demands.";

export default async function layout({ children }) {
  return (
    <div className="font-inter">
      <InvestorScrollTopOnRoute />
      <div className="page-container bg-slate-100 font-inter pt-2 overflow-x-hidden">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <section className="mt-2 z-10 relative">
          <MainNavBar hiddenSidebar spacerClassName="h-[108px] lg:h-[160px]" />
          <div className="container">
            <Image
              src={BannerImage}
              alt="Mindteck investors banner"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-full w-full max-h-[360px] object-cover"
            />
            <InvestorBreadcrumbs />
          </div>
        </section>
      </div>
      <InvestorMenus />
      <div className="py-14">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-4 gap-y-4">
            <div className="md:col-span-9 col-span-12">{children}</div>
            <div className="md:col-span-3 col-span-12 flex flex-col md:items-end items-stretch">
              <StockDetail />
              <TradingWindowCard className="w-full md:w-[250px] mt-4 md:ml-auto" />
            </div>
          </div>
        </div>
        <div className="container mt-10">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-gray-200 px-10 py-8 rounded-xl h-full space-y-1">
              <p className="font-bold text-2xl">Mission</p>
              <p className="text-[18px] leading-7 text-justify">
                {MISSION_STATEMENT}
              </p>
            </div>
            <div className="bg-gray-200 px-10 py-8 rounded-xl h-full space-y-1">
              <p className="font-bold text-2xl">Vision</p>
              <p className="text-[18px] leading-7 text-justify">
                {VISION_STATEMENT}
              </p>
            </div>
          </div>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
