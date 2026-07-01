import SemiConductor from "../../assets/images/semiconductor/semiconductor-banner.jpg";
import CoreCompetencies from "@/app/assets/images/semiconductor/core-competencies.png";
import EmergingFocus from "@/app/assets/images/semiconductor/emerging-focus.png";
import EngineeringSustenance from "@/app/assets/images/semiconductor/engineering-sustenance.png";
import GlobalDelivery from "@/app/assets/images/semiconductor/global-delivery.png";
import IndustryExpertise from "@/app/assets/images/semiconductor/industry-expertise.png";
import SolutionAccelerators from "@/app/assets/images/semiconductor/solution-accelerators.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/electronics-semiconductor-and-storage");

export default function MedicalDevicesAndHealthcare() {
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
                    Semiconductor Manufacturing Product Lifecycle Services
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    Supercharge your time-to-market by harnessing our front- and back-end services and subsystems expertise to enhance equipment performance and meet productivity objectives.
                  </motion.p>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={SemiConductor.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Semiconductor"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Semiconductor
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-7 col-span-12"
            >
              <h3 className="text-black text-3xl font-athelas font-normal leading-tight mb-4">
                Mindteck Semiconductor Engineering Services
              </h3>

              <p className="text-md text-black">
                Mindteck offers comprehensive semiconductor engineering and
                equipment product lifecycle services that cover the entire value
                chain - from new product development and sustenance to testing,
                support, and performance improvement. With over 20 years of
                experience serving semiconductor capital equipment
                manufacturers, subsystem vendors, and fabs, Mindteck helps
                clients enhance equipment software features, boost performance,
                and increase productivity.
              </p>
            </motion.div>
            <div className="sm:col-span-5 col-span-12 md:mt-0 mt-5">
              <MotionContainer
                containerProps={{ delay: 0.4, staggerIn: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="rounded-3xl  shadow-none border-none pt-5 bg-primary text-white">
                  <CardContent>
                    <motion.h2
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className=" text-3xl font-athelas mb-2 text-center"
                    >
                      Why Mindteck for Semiconductor Technology?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 text-justify "
                    >
                      Mindteck's commitment to excellence and a team of highly
                      skilled engineers and subject matter experts position us
                      as a leader in semiconductor engineering. We empower our
                      clients to achieve their innovation goals, enhance product
                      performance, and accelerate time-to-market.
                    </motion.p>
                    <motion.ul
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs pl-4 list-disc mb-3 space-y-3 text-left mt-2"
                    >
                      <li>
                        Team of highly skilled engineers and subject matter
                        experts in semiconductor engineering
                      </li>
                      <li>
                        Agile and scalable engagement models suited for both
                        Equipment Manufacturers and FABs
                      </li>
                      <li>
                        Global delivery centers for cost effectiveness and easy
                        reach
                      </li>
                      <li>
                        Commitment to quality, compliance, and continuous
                        innovation
                      </li>
                    </motion.ul>
                  </CardContent>
                </Card>
              </MotionContainer>
            </div>
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
              <h3 className="text-secondary font-bold text-xl mb-1">
                Industry Expertise and Technology Coverage
              </h3>
              <p className="text-md">
                Mindteck's teams possess deep knowledge of semiconductor
                manufacturing processes and equipment, including Metal Organic
                Chemical Vapor Deposition (MOCVD), Plasma-enhanced CVD,
                Molecular Beam Epitaxy (MBE), Lithography, Wet and Dry Etch,
                Wafer Sorters and Probers, Turbo Vacuum Pump, Abatement System,
                Automated Wafer Inspection System (AOI), Automated Test
                Equipment (ATE) and Metrology. This broad exposure enables
                Mindteck to deliver tailored solutions aligned with industry
                (SEMI) standards and client needs.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 col-span-12 text-center md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={IndustryExpertise.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={CoreCompetencies.src}
                  alt="iot-platforms"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary text-xl font-bold mb-3">
                Core Competencies in Semiconductor
              </h3>
              <p className="text-md">
                Mindteck offers a wide spectrum of integrated engineering
                services, designed to support clients from concept to market.
                Our offerings are built upon deep industry knowledge and a
                commitment to delivering innovative solutions:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Software Engineering Services:
                  </span>{" "}
                  <ul className="text-md pl-4 list-disc">
                    <li>
                      Design & develop Cluster Tool Controller (CTC) Framework
                      software for the existing and new products
                    </li>
                    <li>
                      Support for SEMI Standards both 200mm & 300mm (Factory
                      Automation){" "}
                    </li>
                    <li>
                      Support for Equipment Data Acquisition (EDA) Freeze II{" "}
                    </li>
                    <li>
                      Host communications and SECS/GEM protocol implementation
                    </li>
                    <li>Equipment Front-End Module (EFEM) software</li>
                    <li>
                      SEMI compliant Graphical User Interfaces (GUI) and
                      configuration management
                    </li>
                    <li>Scheduler and communication managers</li>
                    <li>Recipe management and process/chamber control</li>
                    <li>Vacuum wafer handling and transport systems</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Electrical Engineering Services:
                  </span>{" "}
                  <ul className="text-md pl-4 list-disc">
                    <li>
                      Design and development of complex electrical systems.
                    </li>
                    <li>Power management and distribution solutions.</li>
                    <li>Analog, digital, and mixed-signal circuit design.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Product Testing & Characterization:
                  </span>{" "}
                  <ul className="text-md pl-4 list-disc">
                    <li>Development of precision test programs.</li>
                    <li>
                      Design and innovation of DIB (Device Interface Board) and
                      probe cards.
                    </li>
                    <li>
                      Test optimization and characterization services to ensure
                      product quality and performance.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    ASIC Design & Development:
                  </span>
                  Expertise across the full ASIC lifecycle, including:
                  <ul className="text-md pl-4 list-disc">
                    <li>
                      Front-end Design: RTL design, logic synthesis, static
                      timing analysis (STA).
                    </li>
                    <li>
                      Back-end Design: Physical design, floor planning,
                      placement, routing, clock tree synthesis (CTS), power
                      analysis.
                    </li>
                    <li>
                      Verification & Validation: Advanced verification
                      methodologies (UVM, SystemVerilog), functional
                      verification, formal verification, emulation.
                    </li>
                  </ul>
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
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12 sm:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Solution Accelerators and Tools
              </h3>
              <p className="text-md">
                To reduce project risk, cost, and timelines, Mindteck provides
                ready-to-deploy semiconductor solution accelerators such as:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Equipment Simulator Framework</li>
                <li>Factory Automation (SECS/GEM Driver, SEMI Host)</li>
                <li>Automated equipment software testing frameworks</li>
                <li>
                  SECS/GEM-based Fault Analysis (FA) test harnesses and
                  communication stacks
                </li>
                <li>EDA Freeze II software stacks</li>
                <li>
                  Scriptable diagnostic tools for stress testing and factory
                  host message sequence simulation
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 text-center col-span-12 sm:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={SolutionAccelerators.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={EmergingFocus.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Emerging Focus Areas
              </h3>
              <p className="text-md">
                Transform healthcare data into actionable insights:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    AI-Driven Fab Optimization
                  </span>{" "}
                  <ul className="text-md pl-4 list-disc space-y-1">
                    <li>ML Based Predictive Analytics</li>
                    <li>CNN Classifier for Wafer Fault Inspection</li>
                    <li>AI Based Content Search</li>
                    <li>AI/ML models for equipment failure forecasting</li>
                  </ul>
                </li>
                <li>
                  <span className="text-sm font-semibold">Data Governance</span>{" "}
                  <ul className="text-md pl-4 list-disc space-y-1">
                    <li>Data Management</li>
                    <li>Data Modelling</li>
                    <li>Data Engineering</li>
                    <li>Data Integration & Interoperability</li>
                    <li>Data Warehousing & BI</li>
                  </ul>
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
              <h3 className="text-secondary font-bold text-xl mb-3">
                End-to-End Product Engineering and Sustenance
              </h3>
              <p className="text-md">
                Beyond new development, Mindteck offers end-to-end product
                engineering services including product conceptualization,
                feasibility studies, prototyping, hardware and firmware design,
                system software and application development, system integration,
                quality assurance, packaging, environmental testing, and
                certifications. They also provide re-engineering and sustenance
                services to address component obsolescence, extend product
                lifecycles, and enhance scalability and flexibility of
                semiconductor products
              </p>
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
                  src={EngineeringSustenance.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={GlobalDelivery.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Global Delivery and Engagement Models
              </h3>
              <p className="text-md">
                Mindteck supports clients through various engagement models
                including offshore, offsite, onsite, near-shore, and
                Build-Operate-Transfer (BOT) arrangements, ensuring flexibility
                and optimized delivery tailored to customer requirements.
              </p>
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
