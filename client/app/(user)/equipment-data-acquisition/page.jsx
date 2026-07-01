import EDABanner from "../../assets/images/semiconductor/eda.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/equipment-data-acquisition");

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
                    A Cost-Effective, High-Performance Solution for Big
                    Data-Driven Semiconductor Fabs
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={EDABanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Equipment Data Acquisition"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl font-normal text-secondary mb-2 font-athelas"
          >
            Equipment Data Acquisition
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
            The Challenge
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
            className="text-md text-black mb-7"
          >
            Modern Fabs rely on big data applications to analyze high volumes of
            real-time equipment data, improving throughput, yield, and overall
            quality.
            <br /> <br /> While the traditional SEMI GEM interface (SECS-II
            messaging) supports remote equipment operation and limited data
            publication, it is not optimized for high-frequency, high-volume
            data transfer. Fabs require data collection rates ranging from 100
            Hz to 10 Hz, but existing commercial development tools for building
            SEMI EDA interfaces are costly due to high licensing fees. <br />{" "}
            <br /> This creates a gap: Fabs need a scalable, cost-effective EDA
            interface to handle big data requirements without compromising tool
            control or inflating integration costs.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-black text-2xl font-semibold mb-2"
          >
            Our Solution
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
            className="text-md text-black mb-7"
          >
            Mindteck provides a .Net-based framework that functions as a
            solution accelerator to develop and implement a robust EDA
            interface. This framework establishes an alternative channel for
            high-volume data publication from equipment to any EDA client, such
            as the factory host, without disrupting equipment control.
            <br />
            <br />
            The solution also includes an EDA client designed to communicate
            with the EDA interface APIs to consume the high-volume data from the
            equipment.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-black text-2xl font-semibold mb-2"
          >
            Features and Capabilities
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
            className="mb-7"
          >
            <p className="text-md mb-1">
              Our framework provides a comprehensive set of features for a
              complete EDA implementation:
            </p>
            <ul className="text-md text-black space-y-2 list-disc pl-4 ">
              <li>
                <b>Standards Compliance:</b> Implements SEMI EDA Freeze-II,
                covering standards like E120-1104, E125-1105, E132-1105, and
                E134-1105 which define XML/SOAP protocol and CEM modeling. It
                also supports various other standards including E120-0310,
                E125-0710, E128-0310, E132-0310, E134-0710, and E138-0709.
              </li>
              <li>
                <b>Equipment Data Modeling:</b> An interface to define the
                Equipment Data Model.
              </li>
              <li>
                <b>EDA Interface Discovery </b> - Automatic identification and
                registration of EDA interfaces.
              </li>
              <li>
                <b>Session Management:</b> Robust handling of multiple
                concurrent client sessions.
              </li>
              <li>
                <b>Data Handling:</b> Supports mapping of SECS objects, Trace
                Data definition, and Trace Data Reporting.
              </li>
              <li>
                <b>EDA Client Integration </b> - Built-in client for consuming
                and validating EDA data streams.
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
            Outcome & Key Benefits
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
            className="mb-7"
          >
            <p className="text-md mb-1">
              Mindteck's EDA solution provides semiconductor fabs and OEMs with
              a robust, flexible, and economical pathway to unlock the power of
              big data analytics in manufacturing.
            </p>
            <ul className="text-md text-black space-y-2 list-disc pl-4 ">
              <li>
                <b>Cost-Efficient: </b>The solution is more cost-efficient than
                other products currently available in the market.
              </li>
              <li>
                <b>No Licensing Fees & Customizable:</b> This solution
                accelerator has no license cost and is open for customization,
                providing ultimate flexibility and reducing the total cost of
                ownership.
              </li>
              <li>
                <b>Future-Ready:</b> Built on SEMI EDA Freeze-II standards,
                ensuring long-term compliance.
              </li>
            </ul>
          </motion.div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
