import EDSbanner from "../../assets/images/life-science/banner.png";
import WhyChoose from "../../assets/images/life-science/why-choose-us.png";
import AIEnablement from "../../assets/images/life-science/AI-Enablement.png";
import AnalyticalInstruments from "../../assets/images/life-science/Analytical-Instruments.png";
import DeviceDriverDevelopment from "../../assets/images/life-science/Device-Driver-Development.png";
import InstrumentControlSoftware from "../../assets/images/life-science/Instrument-Control-Software.png";
import DigitalTransformation from "../../assets/images/life-science/Digital-Transformation.png";
import RVV from "../../assets/images/eds/rigorous-verification-validation.png";
import FreeAssessment from "../../assets/images/life-science/get-free-assessment.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/life-science-it-solutions-and-analytical-instruments");

export default function EDSApplication() {
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
                    Innovative Solutions for Life Sciences
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    Enabling precise, scalable research through advanced
                    analytical technologies.
                  </motion.p>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={EDSbanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Life Sciences and Analytical Instruments"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Life Sciences and Analytical Instruments
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
                Accelerating Innovation in Analytical Instrumentation
              </h3>
              <p className="text-md italic mb-5">
                Mindteck's Expertise Across Device Drivers, Control Software,
                Lab Informatics, and AI-Powered Data Solutions
              </p>

              <p className="text-md text-black">
                The analytical instrumentation industry is undergoing a
                transformation - driven by the need for high-precision
                measurements, digital integration, regulatory compliance, and
                AI-powered insights. At the intersection of engineering,
                software, and science, <b>Mindteck</b> provides a full-spectrum
                suite of solutions tailored to the evolving needs of life
                sciences and analytical instrument manufacturers. With over
                three decades of domain expertise, Mindteck delivers{" "}
                <b>
                  Instrument control software, lab informatics, validation
                  services, and data science solutions
                </b>{" "}
                to global clients in chromatography, spectroscopy, diagnostics,
                molecular biology, and environmental monitoring.
              </p>
            </motion.div>
            <div className="sm:col-span-5 col-span-12 md:mt-0 mt-5">
              <MotionContainer
                containerProps={{ delay: 0.4, staggerIn: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="rounded-3xl text-center shadow-none border-none pt-5 bg-primary text-white">
                  <CardContent>
                    <motion.h2
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className=" text-3xl font-athelas mb-2"
                    >
                      Why Mindteck for Your Analytical Instrumentation?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 "
                    >
                      Mindteck is a strategic partner to analytical instrument
                      OEMs and life sciences enterprises seeking innovation
                      without compromising compliance. Whether it's enabling
                      hardware-level precision, developing intuitive control
                      software, digitizing lab workflows, or unlocking insights
                      from scientific data - Mindteck brings the tools, talent,
                      and trust needed to navigate the future of analytical
                      instrumentation.
                    </motion.p>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src={WhyChoose.src}
                        width={"587"}
                        height={"290"}
                        alt="success-story"
                        className="mt-2 m-auto"
                      />
                    </motion.div>
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
                Device Driver Development
              </h3>
              <p className="text-md mb-2">
                Mindteck brings deep expertise in{" "}
                <b>low-level programming and hardware integration</b>, critical
                for driving analytical instruments at the edge
              </p>
              <p className="text-md font-semibold mb-1">Key capabilities:</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Custom <b>device driver development</b> for Windows, Linux,
                  and RTOS platforms
                </li>
                <li>
                  Communication with instruments via USB, RS232/485, GPIB,
                  Ethernet
                </li>
                <li>
                  Support for industry-standard protocols: SCPI, OPC-UA, CAN,
                  I2C, SPI
                </li>
                <li>
                  Integration with scientific sensors, detectors, pumps, and
                  motors
                </li>
                <li>
                  Performance tuning, interrupt handling, and multi-threaded
                  driver logic
                </li>
              </ul>
              <p className="text-md">
                Mindteck's engineering teams ensure{" "}
                <b>
                  seamless communication between hardware components and
                  higher-level control software
                </b>
                , laying the groundwork for precision instrumentation.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 col-span-12 text-center md:order-2 order-1"
            >
              <Image
                width={"400"}
                height={"400"}
                src={DeviceDriverDevelopment.src}
                alt="success-story"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2 ">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 col-span-12 text-center"
            >
              <Image
                width={"400"}
                height={"400"}
                src={InstrumentControlSoftware.src}
                alt="success-story"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary text-xl mb-3 font-bold">
                Instrument Control Software
              </h3>
              <p className="text-md mb-2">
                Mindteck designs and develops{" "}
                <b>robust instrument control software</b>
                that enables scientists and technicians to operate instruments
                safely, efficiently, and compliantly.
              </p>
              <p className="text-sm font-semibold mb-1">
                Core offerings include:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  {" "}
                  UI/UX-rich instrument control applications (desktop, web, and
                  hybrid)
                </li>
                <li>
                  Workflow engines and sequencing logic for multi-step analysis
                </li>
                <li>
                  Instrument state management, error handling, calibration
                  workflows
                </li>
                <li>
                  Integration with instrument firmware and embedded systems
                </li>
              </ul>
              <p className="text-md">
                From single-instrument apps to enterprise-grade lab control
                platforms, Mindteck ensures{" "}
                <b>reliable, regulatory-ready user interfaces</b> for analytical
                environments.
              </p>
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
              className="sm:col-span-9 col-span-12 sm:order-1 order-2"
            >
              <h3 className="text-secondary text-xl font-bold mb-3">
                Lab Informatics and Digital Transformation
              </h3>
              <p className="text-md mb-1">
                Digitalization in laboratories demands interoperability,
                automation, and smart data flow. Mindteck helps clients build
                and integrate <b>Lab Informatics ecosystems including</b>:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  LIMS and ELN development, customization, and integration
                </li>
                <li>
                  Instrument-to-LIMS middleware for data exchange and validation
                </li>
                <li>
                  Sample tracking, audit trails, and barcode/RFID-based
                  workflows
                </li>
                <li>Mobile interfaces for lab personnel and technicians</li>
                <li>
                  Cloud integration (Azure, AWS) for remote data access and
                  monitoring
                </li>
              </ul>
              <p className="text-md">
                Through informatics platforms, Mindteck bridges the gap between
                <b> instrumentation and enterprise-level insights</b>, helping
                labs move toward Industry 4.0 and paperless operations.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 order-1 sm:order-2"
            >
              <Image
                width={"400"}
                height={"400"}
                src={DigitalTransformation.src}
                alt="iot-platforms"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
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
              className="sm:col-span-3 text-center col-span-12 "
            >
              <Image
                width={"400"}
                height={"400"}
                src={AIEnablement.src}
                alt="success-story"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Data Management Solutions and AI Enablement
              </h3>
              <p className="text-md mb-1">
                Mindteck empowers analytical labs and instrument manufacturers
                to unlock the full potential of their data.
              </p>
              <p className="text-sm font-semibold mb-1">Solutions include:</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Scientific data lifecycle management and structured
                  repositories
                </li>
                <li>
                  Integration with cloud platforms for real-time dashboards and
                  alerts
                </li>
                <li>
                  Data lakes and data warehouses for multi-instrument
                  environments
                </li>
                <li>
                  Predictive maintenance using AI models trained on historical
                  data
                </li>
                <li>
                  Advanced analytics: anomaly detection, classification, pattern
                  mining
                </li>
                <li>
                  Natural Language Processing (NLP) to extract insights from lab
                  reports
                </li>
              </ul>
              <p className="text-md">
                By combining <b>data engineering with AI/ML algorithms</b>,
                Mindteck helps clients transition from data-rich to
                insight-driven operations - enhancing productivity, reliability,
                and innovation.
              </p>
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
              className="sm:col-span-9 col-span-12 order-2 sm:order-1"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                AI Enablement in Life Sciences and Analytical Instruments
              </h3>
              <p className="text-md mb-1">
                Mindteck is enabling a new era of intelligent instruments and
                data-driven labs by integrating AI/ML into scientific and
                diagnostic workflows.
              </p>
              <p className="text-sm font-semibold mb-1">Key Capabilities:</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Predictive maintenance
                  </span>{" "}
                  for instruments using anomaly detection and usage analytics
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    AI-driven image/signal processing
                  </span>{" "}
                  in pathology, chromatography, and microscopy
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    NLP-powered data extraction{" "}
                  </span>{" "}
                  from lab reports, trial data, and publications
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Conversational interfaces
                  </span>{" "}
                  and LLM-based tools to enhance lab productivity
                </li>
              </ul>
              <p className="text-md">
                Mindteck's AI solutions empower clients to{" "}
                <b>
                  accelerate decision-making, enhance operational efficiency,
                  and derive deeper insights
                </b>
 - bridging the gap between raw scientific data and actionable
                intelligence
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 order-1 sm:order-2"
            >
              <Image
                width={"400"}
                height={"400"}
                src={AnalyticalInstruments.src}
                alt="iot-for-mindteck-cliet"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
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
              className="sm:col-span-3 text-center col-span-12 "
            >
              <Image
                width={"400"}
                height={"400"}
                src={RVV.src}
                alt="iot-for-mindteck-cliet"
                className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 "
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Why Mindteck?
              </h3>

              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">Domain depth:</span>{" "}
                  Over 30 years of experience in life sciences, diagnostics, and
                  analytical instruments
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Engineering rigor:
                  </span>{" "}
                  CMMI Level 5 processes, global delivery, and in-house labs
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Compliance leadership:
                  </span>{" "}
                  Proven track record in CSV and regulated environments
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Innovation focus:
                  </span>{" "}
                  AI, lab informatics, and data science under one roof
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Scalable delivery:
                  </span>{" "}
                  Onshore, offshore, and hybrid engagement models for R&D and
                  sustenance
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="container text-left mb-10"
        >
          <div className="bg-white rounded-[28px] shadow-[0_22px_45px_rgba(15,23,42,0.12)] flex flex-col md:flex-row items-stretch overflow-hidden border border-[#E7E1D3]">
            <div className="w-full md:w-3/5 px-6 py-8 md:px-10 md:py-12 lg:pr-12">
              <h2 className="text-[30px] leading-[1.35] font-athelas font-normal text-[#111111] mb-5">
                Enable Precision. Empower Discovery. Accelerate Innovation.
              </h2>
              <p className="text-base md:text-[19px] leading-8 text-[#303030] mb-8">
                From instrument control software and lab informatics to
                validation and data science, we help global life sciences and
                analytical manufacturers achieve digital excellence and
                scientific impact.
              </p>
              <p className="text-secondary font-bold mb-3">
                Collaborate with Mindteck to engineer smarter,
                <br /> compliant, and data-driven innovations.
              </p>
              <ContactFormVariantTwo btnText="Talk to Our Experts" />
            </div>
            <div className="w-full md:w-2/5">
              <img
                src={FreeAssessment.src}
                alt="Smart Connections"
                className="w-full h-[220px] md:h-full object-cover"
              />


              
            </div>
          </div>
        </motion.div>
        <SuccessStory />
      </section>
      <ContactForm />
    </div>
  );
}
