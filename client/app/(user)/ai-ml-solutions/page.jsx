import MDHBanner from "../../assets/images/ai-ml/banner.png";
import FreeAssessment from "../../assets/images/ai-ml/get-free-assessment.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import CaseStudySliderVariant from "@/components/common-client-component/case-study-slider";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/ai-ml-solutions");

export default async function AIMLSolutions() {
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
                    AI/ML
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="ai-ml-solutions"
                  src={MDHBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["AI/ML"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl font-normal text-secondary mb-2 font-athelas"
          >
            AI/ML
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="max-w-[1100px]"
          >
            <h3 className="text-black text-3xl font-athelas font-normal mb-4">
              Driving Efficiency and Quality Through AI/ML
            </h3>
            <p className="text-md text-black mb-4 text-justify">
              At Mindteck, we provide cutting-edge Engineering and Technology
              Solutions that leverage the power of Artificial Intelligence and
              Machine Learning (AI/ML) to solve complex industry challenges.
              Our solutions are engineered to deliver significant impact,
              including reduced dependency on manual quality control,
              accelerated defect detection and root cause analysis, and
              improved manufacturing yield and efficiency.
            </p>
            <p className="text-md text-black mb-4 text-justify">
              We offer a comprehensive suite of AI/ML services designed to
              optimize your operations and drive intelligent decision-making.
            </p>
            <p className="text-md text-black mb-4 text-justify">
              Our AI capabilities are designed to transform challenges into
              opportunities across industries and business functions.
            </p>
            <ul className="text-md text-black list-disc pl-5 space-y-2 mb-4">
              <li>
                Natural Language Processing (NLP): Speech-to-text, word
                embeddings, speech intent understanding.
              </li>
              <li>
                Large Language Models (LLM): Leverage advanced LLMs for natural
                language understanding and generation.
              </li>
              <li>
                Predictive Maintenance: Predict equipment failures, analyze
                fault patterns, and optimize asset lifecycle with Remaining
                Useful Life (RUL) modeling.
              </li>
              <li>
                Reinforcement Learning: Solve complex problems with precision
                using ML/DL-based optimization techniques.
              </li>
              <li>
                Computer Vision: Image classification, Face recognition, emotion
                and activity detection, video frame segmentation.
              </li>
              <li>
                Generative AI: Harness synthetic data and content generation to
                enable new applications and business models.
              </li>
            </ul>
            <p className="text-md text-black text-justify">
              At Mindteck, we combine deep technical expertise with industry
              experience to deliver AI solutions that drive growth, efficiency,
              and innovation-empowering your business to stay ahead in a rapidly
              evolving digital world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-black pt-10 pb-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
            className="max-w-[1100px]"
          >
            <h3 className="text-black text-3xl font-athelas font-normal mb-4">
              Semiconductor Industry
            </h3>
            <p className="text-lg text-secondary italic mb-4">
              "Smarter Manufacturing. Better Yields. Powered by AI/ML."
            </p>
            <h4 className="text-xl font-semibold text-secondary mb-3">
              AI/ML Capabilities for Semiconductor Engineering
            </h4>
            <p className="text-md text-black mb-4 text-justify">
              At Mindteck, we harness the power of Artificial Intelligence (AI)
              and Machine Learning (ML) to drive efficiency, accuracy, and
              innovation in semiconductor engineering and manufacturing. With
              decades of engineering expertise and deep domain knowledge, we
              deliver advanced solutions that transform processes, enhance
              quality, and accelerate time-to-market for our clients.
            </p>

            <h4 className="text-xl font-semibold text-secondary mb-3">
              Key Competencies
            </h4>
            <ul className="text-md text-black list-disc pl-5 space-y-2 mb-5">
              <li>
                Smarter Fault Detection - Spot issues early with predictive and
                preventive quality management.
              </li>
              <li>
                Automated Optical Inspection - AI-driven optical inspection for
                wafers and components to catch defects with high precision.
              </li>
              <li>
                AI-Powered Quality Analysis - Deep learning solutions that
                streamline inspections and reduce manual checks.
              </li>
              <li>
                Intelligent Process Control - Model-based systems for better
                temperature and process control in fabs.
              </li>
              <li>
                Risk Assessment Made Smarter - Large Language Model
                (LLM)-based systems for automated risk analysis and decision
                support.
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-secondary mb-3">
              Impact Delivered
            </h4>
            <ul className="text-md text-black list-disc pl-5 space-y-2 mb-5">
              <li>
                Faster Time-to-Market - Accelerate defect detection and root
                cause analysis.
              </li>
              <li>Improved Yields - Reduce errors and boost manufacturing efficiency.</li>
              <li>
                Lower Costs - Minimize dependency on manual quality checks.
              </li>
              <li>
                Smarter Decisions - Leverage AI-driven insights for proactive
                operations.
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-secondary mb-3">
              Solution Highlights
            </h4>
            <ul className="text-md text-black list-disc pl-5 space-y-2 mb-4">
              <li>
                Fault Detection & Prediction: Model-based inspection and
                instrument usage forecasting for proactive maintenance.
              </li>
              <li>
                Wafer & Component Defect Classification: Automated deep learning
                inspection for identifying scratches, chips, sealing issues,
                foreign material, and other defects.
              </li>
              <li>
                AI-Powered Quality Inspector: End-to-end visual inspection
                system that minimizes manual QC.
              </li>
              <li>
                AI-Powered Log & Data Analysis: Intelligent processing of
                operational logs to identify anomalies and insights.
              </li>
              <li>
                LLM-Based Risk Assessment: Natural language-enabled systems for
                risk evaluation, compliance, and reporting.
              </li>
            </ul>

            <p className="text-md text-black text-justify">
              At Mindteck, we combine cutting-edge AI/ML research with practical
              semiconductor expertise to enable smarter, more resilient, and
              scalable manufacturing. Our solutions are designed to not only
              meet today's challenges but also prepare businesses for the future
              of semiconductor innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
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
