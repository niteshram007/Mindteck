import CTCFrameworkBanner from "../../assets/images/semiconductor/ctc-framework.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/ctc-framework");

export default function page() {
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
                    className="text-3xl font-athelas text-white"
                  >
                   A Solution for Equipment Automation
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={CTCFrameworkBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Cluster Tool Controller Framework"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl font-normal text-secondary mb-2 font-athelas"
          >
            Cluster Tool Controller Framework
          </motion.h2>
        </div>
      </section>

      <section className=" text-black pt-10 pb-20">
        <div className="container">
          <div className="bg-[#F7F8F8] sm:p-5 p-4">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-black text-2xl font-semibold mb-2"
            >
              Introduction
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inUp}
              className="text-md text-black mb-7"
            >
              Mindteck's Cluster Tool Controller Framework (CTCF) is a
              configurable, scalable, and high-performance solution designed for
              semiconductor manufacturing environments. It provides a stable,
              standards-compliant foundation for managing complex cluster tools,
              while ensuring interoperability, diagnostics, and cost efficiency.
              <br />
              <br />
              The framework is built to simplify integration, accelerate
              deployment, and ensure compliance with SEMI standards, making it
              an ideal choice for OEMs and Fabs seeking a reliable and
              customizable cluster tool control solution.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-black text-2xl font-semibold mb-2"
            >
              Core Architecture
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inUp}
              className="mb-7"
            >
              <p className="text-md mb-4">
                The CTC Framework features a modular architecture that separates
                the main control logic from the user interface, data
                acquisition, and equipment hardware layers. This design ensures
                stability and simplifies development and maintenance. The system
                is composed of several key computers and networks:
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Cluster Tool Controller:</b> The core of the solution, hosting the
                  Cluster Tool Controller and key operational modules like the
                  logger and health monitor.
                </li>
                <li>
                  <b>Visualization Interface:</b> Runs the user-facing applications,
                  including the CTCF User Interface, Recipe Editor, and Data
                  Analyzer.
                </li>
                <li>
                  <b>EDA Server:</b> Manages the Equipment Data Acquisition (EDA)
                  interface for communication with the factory host.
                </li>
                <li>
                  <b>Internal & External Networks:</b> The architecture uses separate
                  networks to manage communication between internal tool
                  components (like PLCs and process modules) and external
                  systems (like the SEMI SECS/GEM Host).
                </li>
              </ul>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={varFade().inUp}
                className="text-black text-2xl font-semibold mb-2"
              >
                Key Features & Solution Benefits
              </motion.p>

              <h3 className="text-xl font-semibold mb-1">
                Comprehensive Equipment Control
              </h3>
              <p className="text-md mb-1">
                The framework provides end-to-end management of all tool
                operations, from wafer transport to process execution.
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Job & Schedule Management:</b> The Scheduler uses a dynamic route
                  discovery algorithm to coordinate wafer jobs, while the Job
                  Manager oversees the creation and execution of Control Jobs
                  and Process Jobs.
                </li>
                <li>
                  <b>Material Tracking:</b> The Material Tracking Manager is
                  responsible for tracking wafer movement and status (e.g.,
                  processed, unprocessed) throughout the tool.
                </li>
                <li>
                  <b>Hardware Control:</b> The Transfer Module Controller directly
                  manages the equipment's handler module, EFEM, load locks, and
                  other transport components.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Seamless Factory Integration
              </h3>
              <p className="text-md mb-1">
                The CTC Framework is built for seamless integration into modern semiconductor fabs.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>SEMI Standards Compliance:</b> The solution has built-in support
                  for SECS/GEM, GEM300, and EDA Freeze II standards. It adheres
                  to a wide range of SEMI standards, including E94 (Control Job
                  Management), E90 (Substrate Tracking), E87 (Carrier
                  Management), and E40 (Processing Management).
                </li>
                <li>
                  <b>EDA Server:</b> A dedicated EDA server provides the SEMI "EDA
                  Freeze II" communication interface, which can be deployed on
                  the same computer as the CTCF or on a separate machine for
                  flexibility.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Advanced Diagnostics and Monitoring
              </h3>
              <p className="text-md mb-1">
                The solution includes a powerful suite of tools for monitoring, logging, and analysis.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>System Health Monitoring:</b> The Health Monitor constantly tracks
                  computer resource utilization like CPU load, memory usage, and
                  disk space, raising alarms if predefined thresholds are
                  exceeded.
                </li>
                <li>
                  <b>Comprehensive Logging:</b> The Activity Logger records all module
                  activities with timestamps for future diagnosis and
                  traceability, while the Data Logger stores process and
                  equipment data in a central database.
                </li>
                <li>
                 <b> Data Analysis:</b> A Data Analyzer application provides graphical
                  representations of logged data, enabling detailed analysis of
                  the tool's performance.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                User-Centric Operations
              </h3>
              <p className="text-md mb-1">
                The framework is designed with the operator and engineer in mind, providing intuitive and powerful interfaces.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Intuitive GUI:</b> The CTCF User Interface provides all the
                  screens and views for equipment operation, designed in
                  compliance with the SEMI E95 standard.
                </li>
                <li>
                  <b>Recipe Management:</b> A spreadsheet-like Recipe Editor allows for
                  easy creation and modification of recipes in both online and
                  offline modes.
                </li>
                <li>
                  <b>Configuration Control:</b> The Configuration Manager is a
                  stand-alone tool that allows authorized users to add, edit, or
                  compare equipment configurations based on their assigned roles
                  and privileges.
                </li>
                <li>
                  <b>User Security:</b> A User Manager module defines user roles,
                  security settings, and access rights for all system functions.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Hardware & Protocol Flexibility
              </h3>
              <p className="text-md mb-1">
                The framework is designed to integrate with a wide variety of
                common hardware and communication protocols.
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-3">
                <li>
                  <b>I/O Providers:</b> It supports communication with DeviceNet
                  devices, PLCs using modbus, and EtherCat (Beckhoff ADS).
                </li>
                <li>
                  <b>Supported Subsystems:</b> The solution has proven support for a
                  range of devices, including:
                </li>
              </ul>

              <ul className="text-md text-black space-y-2 list-disc pl-8 mb-5">
                <li>Loadports from Sinfonia, Brooks, and TDK.</li>
                <li>EFEM from Brooks.</li>
                <li>Vacuum Robots from Brooks and Persimmon.</li>
                <li>
                  Mass Flow Controllers and Pressure Controllers from various
                  vendors.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Deployment & Technology Stack
              </h3>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li><b>Operating System:</b> Windows 10 or higher</li>
                <li><b>.NET Framework:</b> Version 4.7+</li>
                <li><b>Database:</b> PostgreSQL 12+</li>
                <li>
                  <b>Development Environment:</b> Visual Studio 2019/2022 Professional
                </li>
                <li>
                  <b>Hardware Requirements:</b> Intel i5 (2GHz), 8GB RAM, 250GB HDD
                </li>
              </ul>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-black text-2xl font-semibold mb-2"
            >
              Conclusion
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inUp}
              className="mb-7"
            >
              <p className="text-md mb-1">
                Mindteck's Cluster Tool Controller Framework (CTCF) is a
                comprehensive, configurable, and SEMI-compliant solution for
                semiconductor equipment. It empowers OEMs & Fabs to:
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-4">
                <li>Reduce development/integration costs</li>
                <li>Ensure compliance and interoperability</li>
                <li>Simplify troubleshooting and maintenance</li>
                <li>Enhance operational efficiency</li>
              </ul>

              <p className="text-md mb-1">
                This framework serves as a future-ready solution to support
                evolving fab automation needs, ensuring long-term reliability,
                flexibility, and cost savings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
