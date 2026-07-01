import { MainNavBar } from "../../navbar";
import Breadcrumbs from "../Breadcrumbs";
import BannerImage from "../../assets/images/career/banner.png";
import SearchResultList from "./search-result-list";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
export default function JobSearchResult() {
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
              <div className="grid grid-cols-12 items-stretch align-middle">
                <div
                  className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-10"
                  style={{
                    background:
                      "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                  }}
                >
                  <div className="flex-col flex h-full justify-center gap-5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight">
                      Step into a world of opportunities
                    </h1>
                    <hr className="border border-secondary w-full" />
                    <p className="font-inter text-xl text-white">
                      where your skills <br />
                      make a difference.
                    </p>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                  <img
                    src={BannerImage.src}
                    className="max-h-[360px] object-cover w-full"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
            <Breadcrumbs paths={["Career"]} />

            <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-normal font-athelas">
              Career
            </h1>

            <br />
          </div>
        </section>
      </div>

      {/* client component search result list  */}
      <SearchResultList />
    </>
  );
}
