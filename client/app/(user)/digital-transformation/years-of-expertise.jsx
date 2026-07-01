import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";

const newDigitalTransformationFramework = [
  {
    title: "Vision & Strategy Consultation",
    description:
      "Define business goals, experience vision, innovation needs, customer journeys, and product objectives.",
  },
  {
    title: "Opportunity Assessment & Digital Blueprinting",
    description:
      "Identify digital opportunities, required capabilities, architecture needs, and transformation enablers.",
  },
  {
    title: "Experience & Architecture Design",
    description:
      "Design target experience, UI/UX, digital workflows, cloud-native architecture, data models, and security baseline.",
  },
  {
    title: "Product Roadmap & Release Planning",
    description:
      "Create a feature roadmap, sprint plan, MVP scope, CI/CD pipeline structure, and resource model.",
  },
  {
    title: "Engineering & Development",
    description:
      "Build new digital applications, platforms, APIs, and automation workflows using modern engineering practices.",
  },
  {
    title: "Quality, Performance & Validation",
    description:
      "End-to-end testing: functional, integration, security, performance, and user validation.",
  },
  {
    title: "Launch & Go-To-Market Enablement",
    description:
      "Seamless deployment, operational readiness, training, adoption, and support planning.",
  },
  {
    title: "Scaling, Enhancements & Continuous Innovation",
    description:
      "Iterative improvements, feature expansions, AI/ML adoption, and platform scaling.",
  },
];

const digitalModernisationFramework = [
  {
    title: "Legacy Landscape Discovery",
    description:
      "Understand existing architecture, system gaps, risks, dependencies, and business impacts.",
  },
  {
    title: "Assessment & Technical Audit",
    description:
      "Deep analysis of performance, scalability, security, database structures, technical debt, and integration complexities.",
  },
  {
    title: "Modernisation Strategy & Recommendations",
    description:
      "Choose the right path: re-host, re-platform, re-architect, re-engineer, or replace. Define ROI, risk mitigation, and prioritised backlog.",
  },
  {
    title: "Modernisation Roadmap & Migration Planning",
    description:
      "Phased migration approach, coexistence strategy, cutover plan, and resource governance.",
  },
  {
    title: "Target Architecture Design",
    description:
      "Design cloud-native, modular, API-first architecture with security, compliance, and DevOps automation.",
  },
  {
    title: "Modernisation Engineering & Migration Delivery",
    description:
      "Refactoring code, re-engineering components, cloud migration, database migration, rewriting modules, integrating APIs.",
  },
  {
    title: "Validation, Performance Engineering & Hardening",
    description:
      "Testing for system stability, security remediation, optimisation, and performance tuning.",
  },
  {
    title: "Deployment, Cutover & Hypercare Support",
    description:
      "Minimised downtime migration, structured go-live, fallback planning, and user stabilisation support.",
  },
  {
    title: "Continuous Optimisation & Managed Services",
    description:
      "Monitoring, patching, scaling, performance optimisation, and continuous improvements.",
  },
];

export default function YearsOfExpertise() {
  return (
    <section className="py-11 mb-4 font-inter">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
          className="text-3xl font-normal mb-6 text-gray-900"
        >
          Business Outcomes Powered by 30 Years of Expertise and AI-Ready
          Innovation
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
          className="text-md"
        >
          Backed by 30 years of real-world customer use cases, we have
          consistently delivered the following outcomes across both new digital
          transformation and modernisation programs.
        </motion.p>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
          className="text-md pl-4 list-disc space-y-1"
        >
          <li>
            Increase operational efficiency by eliminating redundancies and
            streamlining processes
          </li>
          <li>
            Improve accuracy and reliability across mission-critical
            applications and digital workflows
          </li>
          <li>
            Accelerate development, testing, and release cycles, reducing
            time-to-market
          </li>
          <li>
            Lower infrastructure and maintenance costs through optimised
            architectures and cloud adoption
          </li>
          <li>
            Achieve scalable, high-performance systems that grow seamlessly with
            the business
          </li>
          <li>
            Respond faster to evolving business demands with flexible, adaptable
            digital foundations
          </li>
          <li>
            Replace outdated legacy constraints with modern, secure,
            enterprise-grade, AI-ready architectures
          </li>
          <li>
            Enable deeper insights and analytics through structured data
            pipelines optimised for Machine Learning and GenAI
          </li>
          <li>
            Unlock predictive and generative capabilities that enhance
            forecasting, personalisation, and operational intelligence
          </li>
        </motion.ul>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
          className="my-6 text-3xl"
        >
          Our Transformation & Modernisation Framework
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
          >
            <Card className="rounded-xl border-none shadow-sm h-full flex flex-col bg-white">
              <CardHeader className="py-3">
                <CardTitle>
                  <h4 className="text-xl font-bold mb-0 text-secondary">
                    New Digital Transformation Framework
                  </h4>
                  <p className="text-md italic font-normal">
 - (For organisations building NEW digital platforms or
                    capabilities)
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {newDigitalTransformationFramework.map((el, index) => (
                  <div key={index}>
                    <h5 className="text-md font-semibold">{el.title}</h5>
                    <p className="text-md">{el.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.2 }).inUp}
          >
            <Card className="rounded-xl border-none shadow-sm h-full flex flex-col bg-white">
              <CardHeader className="py-3">
                <CardTitle>
                  <h4 className="text-xl font-bold mb-0 text-secondary">
                    Digital Modernisation Framework
                  </h4>
                  <p className="text-md italic font-normal">
 - (For organisations transforming their EXISTING systems)
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {digitalModernisationFramework.map((el, index) => (
                  <div key={index}>
                    <h5 className="text-md font-semibold">{el.title}</h5>
                    <p className="text-md">{el.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
