import Banner from "../../assets/images/energy-and-utility/banner.png";
import WhyChoose from "../../assets/images/energy-and-utility/automation-solution.png";
import FreeAssessment from "../../assets/images/energy-and-utility/connect-with-us.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import WhatWeOffer from "./what-we-offer";
import Services from "./services";
import CaseStudySliderVariant from "@/components/common-client-component/case-study-slider";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/energy-and-utility");
export default async function EnergyUtilities() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />
      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div className="header-banner">
            <div className="grid grid-cols-12 items-stretch align-middle">
              <div
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 py-4 px-6 md:px-8"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex-col flex h-full justify-center gap-3">
                  <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    Intelligent Solutions for a Sustainable Future
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={Banner.src}
                  className="h-full w-full object-cover max-h-[320px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Energy Utilities & Building Automation"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Energy Utilities & Building Automation
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-8 pb-16">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-6 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-8 col-span-12"
            >
              <h3 className="text-black text-3xl  font-athelas font-normal">
                Empowering Smarter Energy: Utilities & Building Automation
                Solutions
              </h3>

              <p className="text-md text-black my-4 text-justify">
                Powering smarter, sustainable spaces with advanced IoT and
                data-driven solutions for greater efficiency, lower costs, and a
                greener tomorrow.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="relative sm:col-span-4 col-span-12"
            >
              <Image
                src={WhyChoose.src}
                width={"587"}
                height={"500"}
                alt="success-story"
                className="mt-1 m-auto w-full h-auto max-h-[320px] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <WhatWeOffer />

      <Services />

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="container text-left mb-10"
        >
          <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-stretch overflow-hidden border border-gray-200">
            <div className="w-full md:w-3/5 pt-10 pb-10 pl-5 pr-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Unlock a new era of efficiency and sustainability
              </h2>
              <p className="text-gray-600 mb-6">
                With Mindteck's Energy Utilities & Building Automation
                Solutions, Modernize your grid, enhance building intelligence,
                and deliver measurable results - reduce costs, improve resilience,
                and future-proof your operations with advanced IoT, analytics,
                and smart automation.
              </p>
              <p className="text-secondary font-bold mb-3">
                Transform energy management and building
                <br /> performance today.
              </p>
              <ContactFormVariantTwo btnText="Connect with us" />
            </div>
            <div className="w-full md:w-2/5">
              <img
                src={FreeAssessment.src}
                alt="Smart Connections"
                className="w-full h-[200px] md:h-full object-cover"
              />


              
            </div>
          </div>
        </motion.div>
        <CaseStudySliderVariant />
      </section>
      <ContactForm />
    </div>
  );
}
