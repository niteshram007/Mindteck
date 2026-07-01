import Banner from "../../assets/images/digital-transformation/banner.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/it-infrastructure-and-data-centre-transformation");

const transformationBenefits = [
  "Transform existing IT infrastructure into shared, virtualized resource pools with centralized control",
  "Reduce maintenance time and operating costs through automated patching and service management",
  "Improve service availability to support higher business productivity",
  "Enable future-ready infrastructure focused on energy efficiency, power savings, and lower carbon footprint",
];

const infrastructureCapabilities = [
  "Local and remote IT support services",
  "Standardized centralized support for call management and issue resolution",
  "ITIL-based incident management and ticket resolution",
  "Proven delivery model based on industry best practices",
  "Integrated customer feedback for continuous service improvement",
  "End-to-end L1, L2, and L3 support",
  "Support for hardware, software, networks, and internal business applications",
];

const outcomes = [
  {
    title: "Optimize Existing Assets",
    detail:
      "Improve utilization of current infrastructure investments while modernizing operations in a phased and controlled way.",
  },
  {
    title: "Lower Operational Cost",
    detail:
      "Standardization, automation, and structured support operations help reduce run costs and improve service consistency.",
  },
  {
    title: "Improve Reliability",
    detail:
      "Strong incident response and proactive management improve service uptime for mission-critical workloads.",
  },
  {
    title: "Scale with Confidence",
    detail:
      "Build a resilient platform ready for growth, cloud integration, and modern digital operations.",
  },
];

export default function ItInfrastructureAndDataCentreTransformationPage() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div className="header-banner">
            <div className="grid grid-cols-12 items-stretch">
              <div
                className="col-span-12 sm:col-span-6 lg:col-span-4 py-5 px-10"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex flex-col h-full justify-center gap-5">
                  <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    IT Infrastructure and Data Centre Transformation
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="IT infrastructure and data centre transformation"
                  src={Banner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>

          <Breadcrumbs paths={["IT Infrastructure and Data Centre Transformation"]} />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            IT Infrastructure and Data Centre Transformation
          </motion.h2>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 mb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="col-span-12"
            >
              <p className="text-md text-justify">
                In today&apos;s knowledge-driven economy, organizations need secure and efficient data operations. Mindteck helps enterprises enhance existing assets,
                lower operational costs, improve performance, and meet service level objectives with confidence.
              </p>
            </motion.div>
          </div>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-3xl font-athelas text-secondary mb-4 mt-8"
          >
            How Data Centre Transformation Helps
          </motion.h3>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="list-disc pl-5 space-y-2 text-md mb-10"
          >
            {transformationBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-3xl font-athelas text-secondary mb-4"
          >
            IT Infrastructure Management
          </motion.h3>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md mb-4 text-justify"
          >
            Mindteck&apos;s infrastructure team combines deep technical expertise with broad cross-platform experience across leading technologies, vendors, and
            products. A structured escalation framework aligned to specialized skill levels helps deliver high service quality and strong availability for
            mission-critical infrastructure.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="list-disc pl-5 space-y-2 text-md mb-10"
          >
            {infrastructureCapabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </motion.ul>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-3xl font-athelas text-secondary mb-4"
          >
            Business Outcomes
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={index % 2 === 0 ? varFade().inLeft : varFade().inRight}
                className="bg-[#F7F8F8] border border-gray-200 rounded-lg p-5"
              >
                <h4 className="text-xl font-semibold text-secondary mb-2">{outcome.title}</h4>
                <p className="text-md">{outcome.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}

