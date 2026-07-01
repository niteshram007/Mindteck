import FABanner from "../../assets/images/semiconductor/fh.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/factory-host");

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
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    A Cost-Effective, Customizable Solution for Factory
                    Automation Testing
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={FABanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Factory Host"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Factory Host
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
              Mindteck's SECS/GEM Host is a simple, customizable application that
              provides a solution for semiconductor OEMs and Fabs to test
              SECS/GEM automation scenarios. This stand-alone utility serves as
              a .Net-based application accelerator, enabling users to verify
              basic GEM capabilities and develop custom tests using C# scripting.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-black text-2xl font-semibold mb-2"
            >
              Key Features & Benefits
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inUp}
              className="mb-7"
            >
              <h3 className="text-xl font-semibold mb-1">
                Accelerated Development and Testing
              </h3>
              <p className="text-md mb-1">
                This tool is designed to speed up the testing process for
                factory automation scenarios.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>C# Scripting Engine:</b>The application includes a C# based
                  script compiling engine, allowing users to write their own
                  scripts and build custom automation scenarios. This provides
                  significant flexibility for end-users
                </li>
                <li>
                  <b>Pre-defined Functions:</b>It comes with a predefined set of
                  Stream-Functions that can be sent easily, with an option for
                  users to define parameter values.
                </li>
                <li>
                  <b>Ease of Use:</b>The SEMI Host is designed as an easy-to-use
                  tester application for verifying GEM compliance scenarios.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Powerful and Flexible Communication
              </h3>
              <p className="text-md mb-1">
                The host application can manage communication with multiple
                pieces of equipment simultaneously and offers clear, reliable
                messaging.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Multi-Equipment Connectivity:</b>It can communicate with
                  multiple GEM-enabled pieces of equipment concurrently.
                </li>
                <li>
                  <b>Reliable Messaging:</b>A "wait for response" mechanism
                  is used for primary SECS-II messages sent from the host. This
                  ensures that no two message communications overlap, allowing
                  users to distinctly observe the message exchange.
                </li>
                <li>
                  <b>Configurable Settings:</b>The application allows users to
                  configure communication settings and other preferences to
                  match their testing environment.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Comprehensive Logging and Analysis
              </h3>
              <p className="text-md mb-1">
                The tool provides robust logging features for clear diagnostics
                and debugging.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Live Message Logs:</b>The user interface includes
                  scrollable run-time logs that capture all SECS communication
                  messages as they happen.
                </li>
                <li>
                  <b>File Logging:</b>An in-built feature automatically logs all
                  incoming and outgoing SECS messages to a file, which includes
                  a roll-over mechanism to manage log file size.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">Economic Advantage</h3>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Cost-Effective:</b>This E30 SEMI Host application is
                  offered with one time cost, no per user license cost.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Supported SEMI Standards
              </h3>
              <p className="text-md mb-1">
                The Host adheres to a wide range of SEMI standards, including:
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-1">
                <li>
                  E5 (SECS-II), E30 (GEM), E37 (HSMS), E39 (Object Services)
                </li>
                <li>
                  E40 (Process Management), E42 (Recipe Management), E53 (Event
                  Reporting)
                </li>
                <li>
                  E87 (Carrier Management), E90 (Substrate Tracking), E94
                  (Control Job Management)
                </li>
              </ul>
              <p className="text-md mb-5">
                This ensures robust compliancewith industry protocols and
                seamless interoperability in automation environments.
              </p>

              <h3 className="text-xl font-semibold mb-1">
                Technology Stack & Requirements
              </h3>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-1">
                <li>
                  <b>Operating Systems:</b> Windows 10 & 11 Professional
                </li>
                <li>
                  <b>Framework:</b> .NET 4.7
                </li>
                <li>
                  <b>Development Environment:</b> Visual Studio 2019
                </li>
              </ul>
              <p className="text-md mb-5">
                The solution is lightweight and easy to deploy in standard Fab
                or OEM testing environments.
              </p>
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
                Mindteck's SEMI E30 SECS/GEM Host is more than just a utility -
                it is a scalable, configurable, and standards-compliant
                solution for semiconductor OEMs and Fabs to test automation
                workflows quickly and effectively.
              </p>
              <p className="text-md mb-1">
                By combining cost-efficiency, scripting flexibility,
                multi-equipment support, and SEMI compliance, this solution
                enables faster deployment, reduced testing overhead, and
                smoother integration into factory automation environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
