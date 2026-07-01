import Banner from "../../assets/images/digital-transformation/banner.png";
import WhyChooseUs from "../../assets/images/digital-transformation/why-choose-us.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import IntegratedDigitalIntelligence from "./integrated-digital-intelligence";
import CaseStudySliderVariant from "@/components/common-client-component/case-study-slider";
import ContactFormVariantTwo from "@/components/common-client-component/form-variant-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import YearsOfExpertise from "./years-of-expertise";
import DigitalIntelligence from "./digital-intelligence";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/digital-transformation");
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
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    Digital Transformation
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    Evolve Beyond Legacy: Transform, Modernise, Scale with
                    Mindteck Expertise.
                  </motion.p>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={Banner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs
            paths={["Digital Transformation & Modernisation"]}
          />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Digital Transformation & Modernisation
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="grid grid-cols-1"
          >
            <h3 className="text-black text-3xl  font-athelas font-normal">
              Evolving Digital Transformation to Digital Intelligence
            </h3>

            <p className="text-md text-black my-4 text-justify">
              For more than three decades, we have been at the forefront of
              helping organisations transform, modernise, and elevate their
              digital capabilities. While many organisations have already
              embarked on their digital journey, the pace of technology
              continues to accelerate; introducing new possibilities to enhance
              performance, reduce operational costs, strengthen accuracy,
              accelerate time-to-market, and scale effortlessly.
            </p>

            <p className="text-md text-black text-justify mb-4">
              New innovations are redefining how businesses operate; improving
              performance, reducing operational costs, accelerating
              time-to-market, strengthening accuracy, and providing
              unprecedented scalability. As these advancements emerge, legacy
              systems, systems that once powered success can gradually become
              costly, slow, inflexible, or out of support. Modern businesses
              cannot afford legacy limitations.
            </p>

            <p className="text-md text-black text-justify ">
              This is where we bring our three decades of experience and
              engineering excellence; supporting organisations at both ends of
              the digital spectrum: building new transformation programs from
              the ground up, and modernising existing digital ecosystems to keep
              pace with today's rapid technological evolution.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-11 mb-4">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-3xl font-normal mb-6 text-gray-900"
          >
            Beyond Transformation - Towards Continuous Digital Evolution
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8">
            {/* Digital Health */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
            >
              <Card className="shadow-none rounded-none border-none p-3 pb-0">
                <CardHeader>
                  <CardTitle>
                    <h4 className="text-xl font-bold mb-0 text-secondary">
                      Digital Transformation{" "}
                    </h4>
                    <p className="italic text-md font-normal">
 - Build What the Business Needs
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                    <li>Building new digital platforms for growth</li>
                    <li>Creating cloud-native applications and services</li>
                    <li>Implementing AI-driven workflows and intelligence</li>
                    <li>Transforming customer experience with modern UX</li>
                    <li>
                      Designing scalable, future-ready system architecture
                    </li>
                    <li>Developing high-performance mobile and web apps</li>
                    <li>Accelerating go-to-market with agile delivery</li>
                    <li>Driving innovation through rapid prototyping labs</li>
                    <li>Automating enterprise processes for efficiency</li>
                    <li>Integrated Digital Intelligence (MindAI)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
            >
              <Card className="shadow-none rounded-none border-none p-3 pb-0">
                <CardHeader>
                  <CardTitle>
                    <h4 className="text-xl font-bold mb-0 text-secondary">
                      Digital Modernisation{" "}
                    </h4>
                    <p className="italic text-md font-normal">
 - Evolve What the Business Has
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                    <li>Upgrading legacy systems for modern needs</li>
                    <li>Re-architecting platforms for higher performance</li>
                    <li>Replatforming applications to cloud environments</li>
                    <li>Migrating workloads efficiently to the cloud</li>
                    <li>Integrating systems with API-first architecture</li>
                    <li>Enhancing security, compliance, and resilience</li>
                    <li>Large-scale migrations of databases</li>
                    <li>Improving performance with engineering excellence</li>
                    <li>Reducing technical debt across applications</li>
                    <li>Integrated Digital Intelligence (MindAI)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.4 }).inUp}
              className="md:col-span-2"
            >
              <Card className="shadow-none rounded-none border-none">
                <CardHeader className="py-3">
                  <CardTitle className="text-xl font-bold mb-0 text-secondary">
                    Integrated Digital Intelligence (AI)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    Enhancing Both Transformation and Modernisation With
                    Mindteck's AI Framework
                    <br />
                    <br />
                    Both our Digital Transformation and Digital Modernisation
                    frameworks can be seamlessly integrated with the Mindteck AI
                    Framework, enabling organisations to elevate their digital
                    systems into intelligent, data-driven ecosystems.
                    <br />
                    <br />
                    By embedding AI into new or modernised applications, we help
                    businesses leverage their data more effectively unlocking
                    advanced insights, improving accuracy, automating complex
                    workflows, and enabling predictive and generative
                    intelligence across the enterprise.
                    <br />
                    <br />
                    With Mindteck's AI Framework, transformation and
                    modernisation evolve beyond technical enhancements into
                    Digital Intelligence - where platforms can learn, adapt, and
                    optimise continuously.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <IntegratedDigitalIntelligence />
      <YearsOfExpertise />
      <DigitalIntelligence />
      <section className="py-11 mb-4 bg-[#F7F8F8]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="container"
        >
          <h2 className="text-xl font-normal">
            Why Enterprises Trust Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
            <div>
              <ul className="text-md pl-4 list-disc space-y-1">
                <li>30+ years of engineering and transformation experience</li>
                <li>
                  Proven expertise in large, complex, multi-system migrations
                </li>
                <li>Customer partnerships lasting decades</li>
              </ul>
            </div>
            <div>
              <ul className="text-md pl-4 list-disc space-y-1">
                <li>Modular engagement or end-to-end transformation</li>
                <li>
                  A practical, business-value-driven approach to modernisation
                </li>
                <li>Ready to adopt proven accelerator and frameworks</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="text-black pt-10 pb-20 success-story text-center ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="container text-left mb-10"
        >
          <div className="bg-white rounded-[28px] shadow-[0_22px_45px_rgba(15,23,42,0.12)] flex flex-col md:flex-row items-stretch overflow-hidden border border-[#E7E1D3]">
            <div className="w-full md:w-3/5 px-6 py-8 md:px-10 md:py-12 lg:pr-12">
              <h2 className="text-[30px] leading-[1.35] font-athelas font-normal text-[#111111] mb-5">
                Ready to Future-Proof Your Business?
              </h2>
              <p className="text-base md:text-[19px] leading-8 text-[#303030] mb-8">
                Unlock the power of Digital Transformation with Mindteck's
                expert Modernization services. Migrate legacy systems to
                cloud-native architectures, harness AI/ML for smarter
                operations, and scale seamlessly in the digital era...
              </p>
              <ContactFormVariantTwo btnText="Connect with us" />
            </div>
            <div className="w-full md:w-2/5">
              <img
                src={WhyChooseUs.src}
                alt="Smart Connections"
                className="w-full h-[220px] md:h-full object-cover"
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
