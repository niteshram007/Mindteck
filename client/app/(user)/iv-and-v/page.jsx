import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import IvAndVBanner from "../../assets/images/iv-and-v/ivnv-banner.png";
import Image from "next/image";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/iv-and-v");

const currentState = [
  "Test maturity and modernization readiness",
  "Test environment, tools, and test data availability",
  "Test process optimization and automation potential",
  "Skill and competency assessment",
];

const targetState = [
  "Improved ROI through intelligent test optimization",
  "Shift from capex to predictive opex models",
  "Cycle time reduction through intelligent automation",
  "Assured code quality with predictive confidence",
];

const transformationModel = [
  {
    title: "1. Assessment and Discovery",
    points: [
      "Build a structured testing roadmap using data-driven analysis of process, tools, and skills",
      "Test maturity and readiness index",
      "Intelligent metrics and measurement framework",
      "Test spend and efficiency analysis",
      "Skill and capability mapping",
    ],
  },
  {
    title: "2. Assimilation",
    points: [
      "Create a tailored knowledge base with best practices and automation playbooks",
      "Test automation strategy and toolchain definition",
      "Structured test case design and optimization",
      "Test suite rationalization",
      "Continuous learning models from test outcomes",
    ],
  },
  {
    title: "3. Test Engineering Excellence",
    points: [
      "Scale resilient quality engineering across the enterprise",
      "Testing as a Service (TaaS)",
      "Robust and maintainable automation frameworks",
      "Cloud and DevOps-aligned testing",
      "Risk-based test execution",
    ],
  },
  {
    title: "4. Continuous Improvement",
    points: [
      "Optimize continuously through analytics-driven feedback loops",
      "Process re-engineering based on insights",
      "Enterprise quality intelligence metrics",
      "Predictive defect and failure analysis",
      "Integrated knowledge and decision systems",
    ],
  },
];

const services = [
  {
    title: "Test Strategy, Analytics and Transformation",
    description:
      "Assess and optimize quality engineering across people, process, and technology. Define a prioritized roadmap using maturity analysis, automation feasibility, metrics, spend efficiency, and competency models.",
  },
  {
    title: "System and Integration Testing",
    description:
      "Validate end-to-end workflows across applications, services, APIs, and third-party systems. Ensure interoperability and stable data exchange in complex enterprise ecosystems.",
  },
  {
    title: "Specialized and Compliance Testing",
    description:
      "Deliver compliance, localization, interoperability, and architecture validation with strong traceability and audit readiness aligned to regulatory needs.",
  },
  {
    title: "Software Product Quality Engineering",
    description:
      "Support the complete product lifecycle with methods and frameworks for functional quality, scalability, extensibility, integration readiness, and release stability.",
  },
  {
    title: "Test Automation and Optimization",
    description:
      "Evaluate current automation maturity and improve coverage, maintainability, and execution efficiency through data-assisted prioritization and continuous feedback.",
  },
  {
    title: "Test Infrastructure and Enablement",
    description:
      "Design and manage test environments, test data workflows, and CI/CD integration to improve utilization, consistency, and release speed.",
  },
  {
    title: "Cloud and Performance Testing",
    description:
      "Perform load, performance, and capacity testing across cloud and on-prem systems using analytics-based load modeling and bottleneck detection.",
  },
  {
    title: "AI and ML-Enabled Testing",
    description:
      "Use AI-enabled tool capabilities for prioritization, regression optimization, and quality risk detection while keeping human oversight and control.",
  },
];

const valueEnablers = [
  {
    title: "Test Automation Framework",
    detail:
      "Cycle time optimization with reduced manual effort and improved consistency, delivering around 20-30% efficiency gains.",
  },
  {
    title: "Product Testing Framework",
    detail:
      "End-to-end product lifecycle coverage that improves release confidence through consistent quality insight.",
  },
  {
    title: "MindAssure Framework",
    detail:
      "Aligned to V-model and shift-left quality principles for early defect prevention and reduced cost of quality.",
  },
  {
    title: "Agile and Model-Based Testing",
    detail:
      "Improved design accuracy and coverage with faster feedback loops and 10-15% effort savings.",
  },
];

export default function IvAndVPage() {
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
            <div className="grid grid-cols-12 items-stretch align-middle">
              <div
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 py-5 px-10"
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
                    IV & V
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iv-and-v-banner"
                  src={IvAndVBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>

          <Breadcrumbs paths={["IV & V"]} />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            IV & V
          </motion.h2>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="col-span-12 lg:col-span-7"
            >
              <p className="text-md mb-4 text-justify">
                At Mindteck, testing is embedded into the software development lifecycle as a core quality engineering discipline. We focus on early defect
                prevention, stronger test coverage, and measurable outcomes through structured processes, automation, and data-driven decisions.
              </p>

              <p className="text-md text-justify">
                Our teams work closely with product and engineering groups to deliver scalable, reliable, and release-ready software by combining proven methods
                with insight-assisted execution.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="bg-[#F7F8F8] border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-2xl font-athelas text-secondary mb-4">Where are we today?</h3>
              <ul className="list-disc pl-5 space-y-2 text-md">
                {currentState.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="bg-[#F7F8F8] border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-2xl font-athelas text-secondary mb-4">Where do we want to be?</h3>
              <ul className="list-disc pl-5 space-y-2 text-md">
                {targetState.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-3xl font-athelas text-secondary mb-4"
          >
            Transformation Model
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {transformationModel.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={index % 2 === 0 ? varFade().inLeft : varFade().inRight}
                className="bg-white border border-gray-300 rounded-lg p-6"
              >
                <h4 className="text-xl text-secondary font-semibold mb-3">{phase.title}</h4>
                <ul className="list-disc pl-5 space-y-2 text-md">
                  {phase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-3xl font-athelas text-secondary mb-4"
          >
            Service Portfolio
          </motion.h3>

          <div className="rounded-lg border border-gray-200 overflow-hidden mb-10 bg-white">
            <div className="hidden md:grid md:grid-cols-12 bg-secondary text-white text-sm font-semibold">
              <div className="md:col-span-4 px-5 py-3">Service Area</div>
              <div className="md:col-span-8 px-5 py-3">Scope</div>
            </div>

            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={varFade({ delay: index * 0.04 }).inUp}
                className="grid grid-cols-12 border-t border-gray-200"
              >
                <div className="col-span-12 md:col-span-4 px-5 py-4 bg-[#F7F8F8]">
                  <div className="flex items-start gap-3">
                    <span className="text-secondary font-semibold min-w-[34px]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h4 className="text-lg font-semibold text-secondary leading-snug">
                      {service.title}
                    </h4>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8 px-5 py-4">
                  <p className="text-md text-justify">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-3xl font-athelas text-secondary mb-4"
          >
            Accelerators and Value Enablers
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueEnablers.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={index % 2 === 0 ? varFade().inLeft : varFade().inRight}
                className="bg-white border border-gray-300 rounded-lg p-5"
              >
                <h4 className="text-xl font-semibold text-secondary mb-2">{item.title}</h4>
                <p className="text-md">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}

