export const revalidate = 300;
import parse from "html-react-parser";
import { axiosInstance } from "../../utils/axiosInstance";
import { MainNavBar } from "../../navbar";
import "../../style.css";
import Breadcrumbs from "../Breadcrumbs";
import {
  Calendar,
  GraduationCap,
  LucideBriefcaseBusiness,
  MapIcon,
  TimerIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ApplyJob from "./apply-job";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";

export default async function page({ searchParams }) {
  const { data } = await axiosInstance.get("public/job/" + searchParams?.jobid);

  return (
    <>
      <div className="page-container bg-gray-100 font-inter pt-2">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />

        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <div className="header-banner">
              <div
                className=" py-5 px-10"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex-col flex h-full justify-center gap-5 text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight">
                    Join Minds That Drive Tomorrow <br /> Build, Innovate,
                    Succeed
                  </h1>
                </div>
              </div>
            </div>
            <Breadcrumbs paths={["Careers", "Apply Jobs"]} />

            <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-normal font-athelas ">
              Careers
            </h1>
          </div>
        </section>
      </div>
      <section className="py-11 font-inter">
        <div className="container">
          <div className="grid grid-cols-12 gap-2">
            <div className="md:col-span-8 col-span-12 md:order-1 order-2 md:mt-0 mt-4">
              <h1 className="text-2xl font-[500] mb-0">
                {searchParams?.title}
              </h1>
              <p className="text-sm text-gray-500">Job Code: {data.jobCode}</p>
              <p className="p-2  bg-[#0BA02C] rounded-sm w-fit  text-white font-[500] text-sm font-inter mt-1">
                {data.jobType}
              </p>
              <h4 className="text-md mb-0 font-[500] font-inter mt-6">
                Job Description
              </h4>
              <p className="font-inter mb-5 text-[16px] leading-[24px] text-[#5E6670] ">
                {data.jobDescription}
              </p>

              <h3 className="text-md mb-0 font-[500] font-inter">
                Responsibilities
              </h3>
              <div className="font-inter text-[16px] text-[#5E6670] ProseMirror">
                {parse(data.responsibilities)}
              </div>
              {(data.skills || "")?.trim().length > 0 && (
                <>
                  <h3 className="text-md mb-0 font-[500] font-inter mt-3">
                    Skill
                  </h3>
                  <p className="font-inter mb-5 text-[16px] leading-[24px] text-[#5E6670]">
                    {data.skills}
                  </p>
                </>
              )}
            </div>
            <div className="md:col-span-4 col-span-12 font-inter md:order-2 order-1">
              <ApplyJob
                jobId={searchParams?.jobid}
                jobTitle={searchParams?.title}
              />
              <div className="border-2 border-[#E7F0FA] rounded-md p-4">
                <p className="text-md font-[500] mb-3">Job Overview</p>
                <div className="grid flex-wrap grid-cols-3 gap-1">
                  <div className="flex flex-col gap-1">
                    <Calendar className="text-secondary" />
                    <p className="text-xs mb-0 text-[#767F8C] mt-3">
                      Job Posted
                    </p>
                    <p className="text-sm font-[500] ">
                      {formatDate(data.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <TimerIcon className="text-secondary" />
                    <p className="text-xs mb-0 text-[#767F8C] mt-3">
                      Experience
                    </p>
                    <p className="text-sm font-[500] ">{data.experience}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <LucideBriefcaseBusiness className="text-secondary" />
                    <p className="text-xs mb-0 text-[#767F8C] mt-3">Job type</p>
                    <p className="text-sm font-[500] ">{data.jobType}</p>
                  </div>
                </div>
                <div className="grid flex-wrap grid-cols-2 mt-5 gap-1">
                  <div className="flex flex-col gap-1">
                    <GraduationCap className="text-secondary" />
                    <p className="text-xs mb-0 text-[#767F8C] mt-3">
                      Education
                    </p>
                    <p className="text-sm font-[500] ">{data.qualifications}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <MapIcon className="text-secondary" />
                    <p className="text-xs mb-0 text-[#767F8C] mt-3 ">
                      Job Location
                    </p>
                    <p className="text-sm font-[500]">{data.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
