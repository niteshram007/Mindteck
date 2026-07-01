import Banner from "../../assets/images/ias/banner.png";
import IAS from "../../assets/images/ias/ias.png";
import WhyChooseUs from "../../assets/images/ias/why-choose-us.png";
import IndustriesWeServe from "../../assets/images/ias/Industries-We-Serve.png";

import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/industrial-automation-solutions");

export default function IndustrialAutomationSolutions() {
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
                    Empower Your Manufacturing
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    Automate, Optimize, and Innovate with Mindteck
                  </motion.p>
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
          <Breadcrumbs paths={["Manufacturing and Industrial Automation"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Manufacturing and Industrial Automation
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
                Empowering Smart Manufacturing with Precision and Innovation
              </h3>

              <p className="text-md text-black my-4 text-justify">
                At Mindteck, we bring over a decade of deep domain expertise
                in Industrial Automation, Control Systems, and Instrumentation.
                Our solutions are designed to help manufacturers and industrial
                enterprises optimize operations, enhance productivity, and
                accelerate digital transformation.
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
                src={IAS.src}
                width={"587"}
                height={"500"}
                alt="success-story"
                className="mt-2 m-auto w-full max-h-[377px] h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <h3 className="text-3xl mb-1 text-black">Our Capabilities</h3>
          <p className="text-md mb-5">
            We offer end-to-end engineering services across the entire
            automation lifecycle - from concept to commissioning and beyond:
          </p>
          <div className="grid grid-cols-12 gap-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-6 col-span-12"
            >
              <h4 className="text-secondary font-bold text-xl mb-1">
                Product Design & Engineering
              </h4>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Complete product design for industrial systems</li>
                <li>Analog and digital I/O electronics design</li>
                <li>Sensor-based design and integration</li>
                <li>Main CPU/Processor-based architecture</li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-6 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                System Integration & Validation
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Factory and site acceptance testing</li>
                <li>Control system configuration and commissioning</li>
                <li>Migration and integration across platforms</li>
                <li>Verification and validation services</li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-6 col-span-12"
            >
              <h4 className="text-secondary font-bold text-xl mb-1">
                Industrial Communication & Protocols
              </h4>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  {" "}
                  Support for Modbus, CAN, Fieldbus, Profibus, EtherCAT, HART
                </li>
                <li>PLC programming and control logic development</li>
                <li>SCADA system integration and deployment</li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-6 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                Instrumentation & Compliance
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Instrumentation engineering and test environments (LabVIEW)
                </li>
                <li>CE, FCC, SIL, ATEX certification support</li>
                <li>Reliability analysis (FMEA, MTBF)</li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-6 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                Software & Firmware Development
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Application software for control systems</li>
                <li>Firmware development for embedded systems</li>
                <li>Data acquisition and analysis platforms</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 col-span-12 text-center "
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={WhyChooseUs.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className=" text-3xl mb-4">Why Mindteck?</h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <b>Proven Track Record:</b> Trusted by global industry leaders
                  for over 10 years.
                </li>
                <li>
                  <b>Domain Expertise:</b> Our automation experts bring valuable
                  insights and end-user perspectives.
                </li>
                <li>
                  <b>Quality & Compliance:</b> Strong focus on documentation,
                  certification, and software quality assurance.
                </li>
                <li>
                  <b>Flexible Delivery Models:</b> Offshore, Onsite, Near-shore,
                  and Build-Operate-Transfer (BOT) options.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <p className="text-black text-3xl font-normal mb-3">
                Industries We Serve
              </p>

              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li> Manufacturing</li>
                <li>Life Sciences</li>
                <li>Analytical Instruments</li>
                <li>Energy & Utilities</li>
                <li>Smart Infrastructure</li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={IndustriesWeServe.src}
                  alt="iot-platforms"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <SuccessStory />
      </section>
      <ContactForm />
    </div>
  );
}
