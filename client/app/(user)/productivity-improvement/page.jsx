import Banner from "../../assets/images/productivity-improvement/banner.png";
import WhyChoose from "../../assets/images/productivity-improvement/Smartwatch-Solutions.png";
import FreeAssessment from "../../assets/images/productivity-improvement/connect-with-us.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import KeyFeatures from "./features";
import IndustryApplications from "./industry-applications";
import CaseStudySliderVariant from "@/components/common-client-component/case-study-slider";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/productivity-improvement");

export default async function ProductivityImprovement() {
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
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-10"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex-col flex h-full justify-center  gap-5">
                  <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    Track, Manage, and Optimize Your Assets with Smart IoT
                    Solutions
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
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Productivity Improvement"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Productivity Improvement
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-8 col-span-12"
            >
              <h3 className="text-black text-3xl  font-athelas font-normal">
                Smartwatch Solutions for Real-Time Productivity Boost in Modern
                Factories
              </h3>

              <p className="text-md text-black my-4 text-justify">
                In the modern factory, every second counts. Manual processes,
                inefficient workflows, and a lack of real-time communication can
                lead to significant bottlenecks and a decrease in productivity.
                Mindteck's innovative solution for Productivity Improvement in
                Factories using Smartwatches provides a powerful way to digitize
                your operations and connect your workforce. By leveraging the
                latest in wearable technology, we deliver a solution that
                provides real-time data, enhances communication, and improves
                safety, ultimately driving higher output and a stronger return
                on investment.
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
                className="mt-2 m-auto w-full h-full max-h-[377px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <KeyFeatures />

      <IndustryApplications />

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="container text-left mb-10"
        >
          <div className="bg-white rounded-[28px] shadow-[0_22px_45px_rgba(15,23,42,0.12)] flex flex-col md:flex-row overflow-hidden border border-[#E7E1D3] relative">
            <div className="w-full md:w-4/5 px-6 py-8 md:px-10 md:py-12 lg:pr-12 z-10">
              <h2 className="text-[30px] leading-[1.35] font-athelas font-normal text-[#111111] mb-5">
                Digitize your factory floor
              </h2>
              <p className="text-base md:text-[19px] leading-8 text-[#303030] mb-8 md:w-3/5">
                Boost productivity and communication with Mindteck's smart
                factory smartwatch solutions. Connect with us now to drive
                real-time efficiency and higher ROI.
              </p>
              <ContactFormVariantTwo btnText="Connect with us" />
            </div>
            <div className="hidden md:block h-full absolute right-0 md:w-[40%]">
              <img
                src={FreeAssessment.src}
                alt="Smart Connections"
                className="w-full h-[220px] md:h-full object-cover"
              />

              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-l from-transparent to-white"></div>
            </div>
          </div>
        </motion.div>
        <CaseStudySliderVariant />
      </section>
      <ContactForm />
    </div>
  );
}
