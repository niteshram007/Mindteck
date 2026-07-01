import RMSBanner from "../../assets/images/semiconductor/rms.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/recipe-management-system");

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
                    A Complete Solution for Semiconductor Recipe Management
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={RMSBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Recipe Management System (RMS)"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Recipe Management System (RMS)
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
              Mindteck introduces its Recipe Management System (RMS) as a
              comprehensive solution for end-to-end recipe handling within the
              semiconductor (SEMI) domain.<br/><br/>RMS is designed to simplify,
              accelerate, and optimize recipe creation, modification, and
              management while meeting industry standards and adapting to
              client-specific requirements. With its user-friendly interface,
              configurable design, distributed accessibility, and advanced
              validation features, RMS ensures efficiency and reliability across
              semiconductor operations.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inUp}
              className="text-black text-2xl font-semibold mb-2"
            >
              Core Architecture and Design
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 }).inUp}
              className="mb-7"
            >
              <p className="text-md mb-1">
                The RMS is a robust, stand-alone accelerator application built
                on the .Net framework. Its architecture ensures flexibility and
                modern performance.
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Technology Stack:</b>The application features a rich
                  graphical user interface (GUI) designed with WPF, C#, and the
                  MVVM (Model-View-ViewModel) architecture.
                </li>
                <li>
                  <b>Database Integration:</b>It uses the Entity Framework to
                  connect seamlessly with SQL Server, storing all data in a
                  single, secure relational database.
                </li>
                <li>
                  <b>System Connectivity:</b>RMS is designed for a distributed
                  environment where it can run on a central control system or an
                  external system, retrieving recipe data from a central RDBMS
                  that also communicates with the equipment.
                </li>
              </ul>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={varFade().inUp}
                className="text-black text-2xl font-semibold mb-4"
              >
                Key Features & Benefits
              </motion.p>

              <h3 className="text-xl font-semibold mb-1">
                Enhanced Efficiency and Usability
              </h3>
              <p className="text-md mb-1">
                The RMS solution is engineered to be powerful yet simple to
                handle, directly boosting operational efficiency.
              </p>

              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Cost-Effective:</b>The RMS is a cost-effective solution
                  with no additional licensing fees apart from base framework
                  cost and customization cost.
                </li>
                <li>
                  <b>Accessibility:</b>As a distributed system, it provides
                  flexible recipe management from both on-site clean-rooms and
                  external office desks.
                </li>
                <li>
                  <b>Fast and Simple:</b>The system simplifies and accelerates
                  the creation and modification of even complex recipes.
                </li>
                <li>
                  <b>Configurable:</b>Users can easily import master data from
                  an Excel file with a single click, with the flexibility to
                  extend this capability to other file formats.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Powerful and Flexible Recipe Authoring
              </h3>
              <p className="text-md mb-1">
                RMS is loaded with numerous functionalities to meet modern
                equipment requirements.{" "}
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Recipe Creation & Modification:</b>Create an unlimited
                  number of recipes and open existing ones in either read-only
                  or read-write mode for easy modification. You can also
                  designate recipes as "Golden," which protects them from
                  deletion without proper permission, safeguarding intellectual
                  property.
                </li>

                <li>
                  <b>Advanced Step Management:</b>The system supports adding,
                  inserting, or deleting steps. You can replicate previous steps
                  to save time, and a multi-step copy, paste, and insert feature
                  further streamlines the creation process.
                </li>

                <li>
                  <b>Dynamic Recipes:</b>
                  <ul className="list-disc pl-6">
                    <li>
                      <b>Loops:</b>Use loops and nested loops to repeat recipe
                      instructions without duplicating steps.
                    </li>
                    <li>
                      <b>Variables:</b>Implement recipe variables with defined
                      min/max/default values.
                    </li>
                    <li>
                      <b>Formulas:</b>Hide sensitive data from operators by
                      using formulas within a recipe.
                    </li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Robust Data Integrity and Security
              </h3>
              <p className="text-md mb-1">
                The system includes built-in checks and flexible saving options
                to ensure recipe data is secure and valid.
              </p>
              <ul className="text-md text-black space-y-2 list-disc pl-4 mb-5">
                <li>
                  <b>Recipe Validation:</b>RMS can validate recipes against
                  pre-compiled, customer-provided rules. It supports both
                  intra-step and inter-step validation norms to ensure a recipe
                  is valid for execution on the equipment.
                </li>

                <li>
                  <b>Flexible Saving:</b>A unique intermediate saving option
                  allows users to save incomplete recipes and finish them later
                  without losing information. You can also save an invalid
                  recipe with a special flag, preventing it from being used on
                  equipment until it's corrected and validated.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-1">
                Future-Ready Platform
              </h3>

              <p className="text-md mb-5">
                RMS is built with scalability in mind. The solution can be
                continuously enhanced with new features and customized
                implementations based on evolving end-user requirements. Its
                modular architecture ensures easy integration with future
                semiconductor systems and standards
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
