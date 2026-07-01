import MDHBanner from "../../assets/images/ai-ml/banner.png";
import FreeAssessment from "../../assets/images/ai-ml/get-free-assessment.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import Services from "./services";
import CaseStudySliderVariant from "@/components/common-client-component/case-study-slider";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/ai-ml-services");
export default async function AIMLServices() {
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
                    className="text-2xl font-athelas text-white"
                  >
                    Empowering Business Transformation through AI Innovation
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={MDHBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Artificial Intelligence/ Machine Learning"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-secondary mb-3 font-athelas"
          >
            Artificial Intelligence/ Machine Learning
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-8">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="col-span-12"
            >
              <h3 className="text-black text-3xl  font-athelas font-normal">
                Harness the Potential of End-to-End AI/ML Solutions
              </h3>

              <p className="text-md text-black my-4 text-justify">
                Leverage the transformative power of Artificial Intelligence to
                revolutionize your business with limitless possibilities. Our
                solutions span the entire AI/ML spectrum-from data analytics to
                generative AI - helping you unlock new opportunities, drive
                innovation, and accelerate growth.
              </p>
              {false && (
                <>
              <ul className="text-md text-black list-disc pl-4 space-y-2 mb-3">
                <li>
                  <span className="font-semibold">Data Analytics:</span> Make
                  smarter, data-driven decisions with intelligent analytics and
                  advanced modeling.
                </li>
                <li>
                  <span className="font-semibold">
                    Computer Vision & NLP:
                  </span>{" "}
                  Enhance operations with cutting-edge computer vision and
                  Natural Language Processing (NLP), including behavior
                  analysis, object tracking, and voice-enabled technologies.
                </li>
                <li>
                  <span className="font-semibold">LLM-Agnostic:</span>{" "}
                  Seamlessly integrate with all major LLMs and SLMs-both
                  proprietary and open-source - including Azure OpenAI, Google
                  Gemini, Phi, Llama, and more.
                </li>
                <li>
                  <span className="font-semibold">Generative AI:</span> Unlock
                  creative possibilities with multimedia, text, and
                  speech-based solutions powered by generative models.
                </li>
                <li>
                  <span className="font-semibold">Agentic AI:</span> Enable
                  autonomous, task-driven AI agents for greater operational
                  efficiency.
                </li>
                <li>
                  <span className="font-semibold">
                    MLOps & Trustworthy AI:
                  </span>{" "}
                  Streamline AI/ML lifecycles with robust MLOps, ensuring
                  trustworthiness, explainability, and ethical compliance.
                </li>
              </ul>
              <p className="text-md text-black mt-4 text-justify">
                With optimized data strategies, empowered decision-making, and
                AI-driven innovation, we'll help your business achieve
                unparalleled success.
              </p>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </section>
      

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
                Start your AI transformation journey with us today.
              </h2>
              <p className="text-gray-600 mb-6">
                From data analytics to generative AI, we help you unlock growth
                and transform possibilities into performance.
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
