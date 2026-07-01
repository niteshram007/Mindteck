import ArtificialIntelligenceAndBusinessIntelligence from "../app/assets/images/services/our-services/artificial-intelligence-and-business-intelligence.png";
import BusinessProcessManagement from "../app/assets/images/services/our-services/business-process-management.png";
import Cloud from "../app/assets/images/services/our-services/cloud.png";
import DataEngineeringAndBusinessIntelligence from "../app/assets/images/services/our-services/data-engineering-and-business-intelligence.png";
import DigitalTransformation from "../app/assets/images/services/our-services/digital-transformation.png";
import EmbeddedDesign from "../app/assets/images/services/our-services/embedded-design.png";
import IOT from "../app/assets/images/services/our-services/iot.png";
import ITInfrastructureAndDataCenterTransformation from "../app/assets/images/services/our-services/it-infrastructure-and-data-center-transformation.png";
import IVAndV from "../app/assets/images/services/our-services/iv-and-v.png";
import ServiceCard from "@/components/ui/service-card";
import MagicRings from "@/components/MagicRings/MagicRings";
import * as motion from "motion/react-client";
import { varFade } from "../lib/animate";
const servicesBgUrl = process.env.NEXT_PUBLIC_SERVICES_BG_URL || "";

const serviceItems = [
  {
    imageSrc: ArtificialIntelligenceAndBusinessIntelligence.src,
    title: "AI/ML",
    href: "/ai-ml-services",
    content:
      "Leverage the transformative power of Artificial Intelligence to revolutionize your business with limitless possibilities.",
  },
  {
    imageSrc: BusinessProcessManagement.src,
    title: "Business Process Management",
    href: "/bpm-services",
    content:
      "Scalable BPM Solutions for Insurance, Healthcare, Financial Services, and More. Mindteck empowers global businesses with domain-focused, outcome-driven BPM services that streamline operations and enable growth.",
  },
  {
    imageSrc: EmbeddedDesign.src,
    title: "Embedded Design Services",
    href: "/electronic-design-services-embedded-systems-and-applications",
    content:
      "End-to-end product engineering support, from initial ideation and prototyping to full-scale manufacturing readiness, alongside ongoing feature enhancement and technology modernisation.",
  },
  {
    imageSrc: Cloud.src,
    title: "Cloud",
    href: "/cloud-service",
    content:
      "Combining cloud-native engineering, deep storage and data management expertise, and strong operational rigor to deliver secure, scalable, and cost-optimized cloud solutions.",
  },
  {
    imageSrc: DataEngineeringAndBusinessIntelligence.src,
    title: "Data Engineering & Business Intelligence",
    href: "/data-engineering",
    content:
      "Expertise in data engineering, analytics and BI solutions, design and implement strategies that modernize how businesses capture, manage, and leverage data.",
  },
  {
    imageSrc: DigitalTransformation.src,
    title: "Digital Transformation",
    href: "/digital-transformation",
    content:
      "Redefining how businesses operate; improving performance, reducing operational costs, accelerating time-to-market, strengthening accuracy, and providing unprecedented scalability.",
  },
  {
    imageSrc: IOT.src,
    title: "Internet of Things",
    href: "/internet-of-things",
    content:
      "Engineering intelligent ecosystems that drive unprecedented efficiency, insight, and competitive advantage for your business.",
  },
  {
    imageSrc: ITInfrastructureAndDataCenterTransformation.src,
    title: "IT Infrastructure and Data Centre Transformation",
    href: "/it-infrastructure-and-data-centre-transformation",
    content:
      "Helping enterprises enhance existing assets, lower operational costs, improve performance, and meet service level objectives with confidence.",
  },
  {
    imageSrc: IVAndV.src,
    title: "IV & V",
    href: "/iv-and-v",
    content:
      "Delivering scalable, reliable, and release-ready software by combining proven methods with insight-assisted execution.",
  },
];

export default function ServicesV2() {
  return (
    <section className="relative overflow-hidden text-white pt-10 pb-20 bg-[#004743]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="services-static-bg"
          aria-hidden="true"
          style={
            servicesBgUrl
              ? { backgroundImage: `url(${servicesBgUrl})` }
              : undefined
          }
        />
        <div className="services-static-effect" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          <MagicRings
            color="#FFFFF0"
            colorTwo="#F4EAD1"
            opacity={0.65}
            speed={0.75}
            ringCount={7}
            lineThickness={1.8}
            attenuation={8}
            noiseAmount={0.08}
          />
        </div>
      </div>

      <div className="container relative z-10">
        <h2 className="text-5xl font-athelas font-normal text-center">
          Our Services
        </h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.2 }).inUp}
          className="text-lg text-center mb-10 mt-4 font-normal"
        >
          Elevate your business with Mindteck&apos;s expertly crafted IT services,
          <br />
          designed to meet diverse needs and ignite innovation. Explore our key
          offerings:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-[780px] mx-auto">
          {serviceItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.3 + (idx % 4) * 0.1 }).inUp}
              className="service rounded-3xl"
            >
              <ServiceCard
                imageSrc={item.imageSrc}
                title={item.title}
                href={item.href}
                content={item.content}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
