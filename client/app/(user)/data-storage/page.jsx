import MDHBanner from "../../assets/images/data-storage/banner.png";
import WhyChoose from "../../assets/images/data-storage/data-storage.png";
import HealthcareITSolutions from "../../assets/images/data-storage/Our-Differentiators.png";
import FreeAssessment from "../../assets/images/data-storage/get-free-assessment.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/data-storage");
export default async function MedicalDevicesAndHealthcare() {
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
                    Empowering the Data Storage Ecosystem with Scalable
                    Engineering
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    We provide secure and reliable data storage solutions to
                    empower smarter decisions and drive better outcomes
                  </motion.p>
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
          <Breadcrumbs paths={["Storage"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-secondary mb-3 font-athelas"
          >
            Storage
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-7 col-span-12"
            >
              <h3 className="text-black text-3xl font-athelas font-normal leading-tight mb-4">
                AI-Driven Innovation & Platform Validation Expertise
              </h3>

              <p className="text-md text-black mb-1">
                At Mindteck, we collaborate with a broad spectrum of data
                storage technology companies - from fast-moving start-ups to
                Fortune 500 leaders - in their mission to deliver solutions with
                exceptional scalability, seamless integration, enterprise-grade
                security, and rock-solid reliability. As the storage landscape
                evolves rapidly to meet the demands of cloud, AI, and
                data-centric architectures, we enable our clients to accelerate
                innovation and enhance competitiveness through engineering
                depth, domain expertise, and AI-driven transformation.
              </p>
              <p className="text-md text-black mb-1">
                With 20 years of experience, we bring a unique
                blend of domain knowledge, hands-on engineering, and validation
                capabilities, serving as a trusted partner for:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1 font-semibold">
                <li>Hyperconverged Infrastructure (HCI)</li>
                <li>Enterprise/Datacenter Storage Platforms</li>
                <li>Storage Data Management Software</li>
                <li>Flash Storage Platforms and Testing</li>
                <li>End-to-End Storage Platform Development & Validation</li>
                <li>AI Enabled Infrastructure</li>
              </ul>
            </motion.div>
            <div className="sm:col-span-5 col-span-12 md:mt-0 mt-5">
              <MotionContainer
                containerProps={{ delay: 0.4, staggerIn: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="rounded-3xl text-center shadow-none border-none pt-5 bg-primary text-white">
                  <CardContent>
                    <motion.h2
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className=" text-3xl font-athelas mb-2"
                    >
                      Why Partner with Mindteck for Data Storage?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 "
                    >
                      We help clients scale their engineering capacity with
                      agility, allowing them to concentrate internal resources
                      on next-gen architecture, GenAI integration, and strategic
                      initiatives. Whether it's building new features,
                      optimizing legacy systems, or validating performance at
                      scale, our teams are engineered to deliver.
                    </motion.p>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src={WhyChoose.src}
                        width={"587"}
                        height={"290"}
                        alt="success-story"
                        className="mt-2 m-auto"
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </MotionContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                Our Differentiators
              </h3>

              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    AI-Integrated Engineering:
                  </span>{" "}
                  We leverage AI/ML for intelligent test automation, predictive
                  analytics, smart observability, and self-healing systems
                  within storage platforms.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Flash & Performance Testing Expertise:
                  </span>{" "}
                  Proven capabilities in validating low-latency, high-throughput
                  flash storage systems assuring performance, endurance, and
                  reliability at scale.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Platform Development & Sustenance:
                  </span>{" "}
                  Experience across full lifecycle - architecture, development, QA
                  automation, and long-term sustenance of distributed and
                  cloud-native storage platforms.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Robust Quality Standards:
                  </span>{" "}
                  Aligned with ISO/CMMI best practices and a track record of
                  delivering high-assurance engineering outcomes.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Knowledge Continuity:
                  </span>{" "}
                  Deep-rooted knowledge retention across long-term engagements,
                  even with large teams, through structured documentation and
                  mentoring systems.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Flexible Engagement Models:
                  </span>{" "}
                  Onsite, offshore, and hybrid setups supported across T&M,
                  fixed-price, outcome-based, or dedicated team extensions,
                  managed services including seamless integration with captive
                  centers.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Rapid Ramp-Up & Reliable Delivery:
                  </span>{" "}
                  Agile onboarding, proactive execution, and consistent
                  delivery - on time and with quality.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 col-span-12 text-center md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={HealthcareITSolutions.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                Power Innovation. Ensure Reliability. Scale Seamlessly.
              </h2>
              <p className="text-gray-600 mb-6">
                From start-ups to global enterprises, we enable technology
                leaders to deliver scalable, secure, and AI-driven storage
                solutions built for next-generation data architectures.
              </p>
              <p className="text-secondary font-bold mb-2">
                Collaborate with Mindteck to engineer the future of intelligent
                data storage.
              </p>
              <ContactFormVariantTwo />
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
        <SuccessStory />
      </section>
      <ContactForm />
    </div>
  );
}
