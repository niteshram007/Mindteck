import { MainNavBar } from "@/app/navbar";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import dynamic from "next/dynamic";

const CeipalJobsWidget = dynamic(() => import("./ceipal-jobs-widget"), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-[#d9d9d9] bg-white p-4 sm:p-6 shadow-sm">
      <p className="text-sm text-gray-600">Loading US jobs...</p>
    </div>
  ),
});

export default function UsJobOpeningsPage({ searchParams }) {
  const jobId =
    typeof searchParams?.job_id === "string" ? searchParams.job_id : "";

  return (
    <>
      <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
        <div className="container relative">
          <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar spacerClassName="h-[108px] lg:h-[160px]" />
          <div className="container">
            <div className="header-banner">
              <div
                className="py-5 px-6 md:px-10"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex flex-col h-full justify-center gap-5 text-center">
                  <h1 className="font-athelas font-bold text-3xl md:text-4xl text-white leading-relaxed">
                    Explore Open Roles in the United States
                  </h1>
                </div>
              </div>
            </div>
            <Breadcrumbs paths={["Career", "US Jobs"]} />
            <h1 className="text-secondary text-4xl md:text-5xl font-normal font-athelas pb-2">
              US Jobs
            </h1>
            <p className="text-sm md:text-base text-[#5a5a5a] pb-4 max-w-3xl">
              Explore current openings in the United States and apply directly.
            </p>
          </div>
        </section>
      </div>
      <section className="pb-14 bg-gray-100">
        <div className="container">
          <CeipalJobsWidget jobId={jobId} />
        </div>
      </section>
    </>
  );
}