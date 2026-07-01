import DataStorage from "@/app/assets/images/industries/data-storage.png";
import EnergyUtilitiesAndBuildingAutomation from "@/app/assets/images/industries/government.png";
import LifeScience from "@/app/assets/images/industries/life-sciences-and-analytical-instruments.png";
import MedicalDevice from "@/app/assets/images/industries/medical-devices-and-healthcare.png";
import Semiconductor from "@/app/assets/images/industries/semiconductor.png";
import ManufacturingAndIndustrialAutomation from "@/app/assets/images/industries/manufacturing-and-industrial-automation.png";
import Shape1 from "@/app/assets/images/shape-1.svg";

import Pattern8 from "@/app/assets/images/shape/patttern-8.png";
import { DeferredContactFormV2, DeferredHomeSuccessStories } from "@/app/HomeLazyComponents";
import { MotionContainer, varFade } from "@/lib/animate";
import * as motion from "motion/react-client";

import Footer from "@/app/Footer";
import { MainNavBar } from "@/app/navbar";
import Image from "next/image";
import Link from "next/link";
import HomeBannerV2 from "@/app/HomeBannerV2";
import ServicesV2 from "@/app/ServicesV2";

export default function Home() {
  return (
    <div className="bg-[#ECEEEF] font-inter text-black relative">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <section className="z-50 relative">
          <MainNavBar spacerClassName="h-[40px] lg:h-[84px]" />
        </section>

        <section className="hero-section relative overflow-hidden">
          <HomeBannerV2 />
        </section>
        <MotionContainer>
          <section
            className={`text-white text-center pt-10 pb-20 relative before:bg-[url('../app/assets/images/shape/shape-1.svg')] before:bg-repeat-x before:opacity-[0.03] before:h-full before:absolute before:w-full before:left-0 before:right-0 before:z-0`}
          >
            <div className="container relative z-[10]">
              <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-athelas font-normal">
                {["We", "Are"].map((el, i) => (
                  <motion.span
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={varFade({ delay: i * 0.5 }).inLeft}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={varFade({ delay: 0.4 }).inUp}
                className="text-black text-lg my-5 font-inter"
              >
                A global engineering and technology solutions provider committed
                to delivering meaningful insights
                <br />
                that empower clients to innovate, compete, and advance along the
                digital continuum.
              </motion.p>

              <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 mt-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.6 }).inLeft}
                  className="countSection text-center md:border-r-secondary md:border-r-2 h-full md:mb-0 mb-[40px]"
                >
                  <p className="text-4xl sm:text-6xl md:text-7xl font-semibold text-secondary">30+</p>
                  <p className="mt-2  text-lg md:px-4 sm:px-0 text-black">
                    Years of delivering expertise and innovative solutions since
                    1991.
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.9 }).inUp}
                  className="countSection text-center md:border-r-secondary md:border-r-2 h-full md:mb-0 mb-[40px]"
                >
                  <p className="text-4xl sm:text-6xl md:text-7xl font-semibold text-secondary">300+</p>
                  <p className="mt-2 text-lg md:px-4 sm:px-0 text-black">
                    Clients served - trusted by businesses of all sizes,
                    including Fortune 1000 companies.
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.7 }).inRight}
                  className="countSection text-center h-full md:mb-0 mb-[40px]"
                >
                  <p className="text-4xl sm:text-6xl md:text-7xl font-semibold text-secondary ">12</p>
                  <p className="mt-2 text-lg md:px-4 sm:px-0 text-black">
                    <span className="block">Presence in geographies -</span>
                    <span className="block sm:hidden">providing global solutions with</span>
                    <span className="block sm:hidden">local expertise.</span>
                    <span className="hidden sm:inline">
                      providing global solutions with local expertise.
                    </span>
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </MotionContainer>
        <ServicesV2 />
        <section className="industries text-center pt-10 pb-20 relative overflow-hidden bg-primary text-white">
          <img
            src={Shape1.src}
            className="absolute top-[-80px] right-[-76px] w-[200px] h-[200px] animate-spin"
            style={{ animationDuration: "5s" }}
            loading="lazy"
            decoding="async"
          />
          <div className="container">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white"
            >
              Industries
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.2 }).inUp}
              className="text-white md:text-lg text-sm mt-5 w-full font-inter md:max-w-[900px] mb-16 m-auto sm:w-full "
            >
              Mindteck delivers innovative solutions across Life Sciences,
              Industrial Automation, Data Storage, Semiconductor Technology, and
              Enterprise Applications. Our expertise spans product development,
              system integration, and performance optimization, driving
              efficiency and quality. We empower diverse industries with
              tailored solutions that meet unique challenges and enhance
              operations.
            </motion.p>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <Link href="/medical-device-and-healthcare" className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.3 }).inLeft}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={MedicalDevice.src}
                    alt="Medical Devices and Healthcare"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Medical Devices and Healthcare
                  </div>
                </motion.div>
              </Link>

              <Link href="/electronics-semiconductor-and-storage" className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.4 }).inUp}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={Semiconductor.src}
                    alt="Semiconductor"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Semiconductor
                  </div>
                </motion.div>
              </Link>

              <Link href="/data-storage" className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.5 }).inRight}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={DataStorage.src}
                    alt="Data Storage"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Data Storage
                  </div>
                </motion.div>
              </Link>

              <Link href="/energy-and-utility" className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.6 }).inLeft}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={EnergyUtilitiesAndBuildingAutomation.src}
                    alt="Energy Utilities and Building Automation"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Energy Utilities and Building Automation
                  </div>
                </motion.div>
              </Link>

              <Link href="/industrial-automation-solutions" className="block">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.7 }).inUp}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={ManufacturingAndIndustrialAutomation.src}
                    alt="Manufacturing and Industrial Automation"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Manufacturing and Industrial Automation
                  </div>
                </motion.div>
              </Link>

              <Link
                href="/life-science-it-solutions-and-analytical-instruments"
                className="block"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade({ delay: 0.8 }).inRight}
                  className="industries-container relative mb-3 cursor-pointer"
                >
                  <img
                    src={LifeScience.src}
                    alt="Life Sciences and Analytical Instruments"
                    className="w-full object-cover max-h-[382px] h-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="industry-info absolute bottom-4 text-center w-4/5 p-4 bg-black/50 left-0 right-0 m-auto font-semibold text-xl">
                    Life Sciences and Analytical Instruments
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>
                <DeferredHomeSuccessStories />


        <section className="text-white  pt-10 pb-20 relative overflow-hidden ">
          <div className="absolute bottom-[-40px] right-[-60px] z-0">
            <Image
              src={Pattern8}
              width={200}
              height={200}
              className="rotate-[81deg]"
              alt="shape"
            />
          </div>

          <div className="container relative z-10 text-black">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-center text-secondary">
              Get the insights you need
            </h2>

            <p className="text-xl text-center mb-12 mt-5 font-normal">
              Access expert knowledge and actionable insights to make
              <br />
              informed decisions and drive your business forward.
            </p>

            <div className="formContainer md:max-w-[600px] w-full max-w-[100%] m-auto">
              <DeferredContactFormV2 />
            </div>
          </div>
        </section>
        <Footer />
      </div>
  );
}
