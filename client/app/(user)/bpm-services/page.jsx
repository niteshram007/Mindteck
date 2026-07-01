import Banner from "../../assets/images/bpm/banner.png";
import WhyChooseUs from "../../assets/images/bpm/why-choose-us.png";
import Industries from "../../assets/images/bpm/industries.png";
import EndToEnd from "../../assets/images/bpm/end-to-end.png";
import FreeAssessment from "../../assets/images/bpm/get-free-assessment.png";
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

export const metadata = getStaticPageMetadata("/bpm-services");

export default function BmpServices() {
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
                    Streamline Operations. Cut Costs. Drive Growth
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
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
          <Breadcrumbs paths={["Business Process Management"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Business Process Management
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
                Transform Operations. Reduce Costs. Accelerate Growth.
              </h3>
              <p className="text-md text-black mb-5">
                Scalable BPM Solutions for Insurance, Healthcare, Financial
                Services, and More. Mindteck empowers global businesses with
                domain-focused, outcome-driven BPM services that streamline
                operations and enable growth.
              </p>

              <p className="text-black text-xl font-medium mb-1">
                How We Deliver Results
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Discover & Design - Understand goals, define SLAs, and plan
                  the transition roadmap.
                </li>
                <li>
                  Build & Execute - Set up processes, train teams, and ensure
                  seamless transition.
                </li>
                <li>
                  Optimize & Scale - Continuously monitor KPIs, introduce
                  automation, and scale operations.
                </li>
              </ul>

              <p className="text-black text-xl font-medium mb-1">
                Why Choose Mindteck
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Proven transition methodology</li>
                <li>Domain-trained workforce</li>
                <li>Scalable and flexible engagement models</li>
                <li>RPA/AI integration readiness</li>
                <li>30% Average Cost Savings Delivered</li>
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
                      Why Mindteck for BPM?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 text-justify"
                    >
                      Mindteck offers comprehensive insurance BPO services to
                      streamline operations, cut costs, and enhance customer
                      experience. With over 15 years of industry experience and
                      delivery centers in India and Malaysia, we provide
                      scalable, cost-effective solutions for Brokers, MGA/MGUs
                      and Insurers.
                      <br />
                      <br />
                      Our services - spanning policy administration, claims
                      processing, compliance, and customer support - help
                      simplify complexity and drive sustainable growth.
                    </motion.p>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src={WhyChooseUs.src}
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

      <section className=" py-11 mb-4">
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
                Industries We Serve
              </h3>
              <p className="text-md mb-2">
                Our domain experts understand the unique needs of each insurance
                segment, ensuring tailored, reliable, and scalable back-office
                support.
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Property & Casualty (P&C) Insurance</li>
                <li>Life & Annuity Insurance</li>
                <li>Health Insurance</li>
                <li>Reinsurance</li>
                <li>Third-Party Administrators (TPAs)</li>
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
                  src={Industries.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
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
              className="sm:col-span-3 col-span-12 text-center"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={EndToEnd.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                End to End BPM Services
              </h3>
              <p className="text-[18px] font-medium">Submission Intake</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li> Data entry for quotes, policy setup, and onboarding.</li>
                <li>
                  Efficient setup of multiple channels while reducing
                  administrative workload from your underwriters.
                </li>
                <li>Risk Modeling</li>
              </ul>

              <p className="text-[18px] font-medium">Policy Issuance</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Manages policy preparation based on submitted data and
                  underwriting rules.
                </li>
                <li>Resolves discrepancies proactively to avoid delays.</li>
                <li>
                  Delivers fully compliant policies with faster turnaround.
                </li>
              </ul>
              <p className="text-[18px] font-medium">Policy Administration</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Manages: New business, Endorsements, COIs, Cancellations,
                  Reinstatements, BORs, Audits.
                </li>
              </ul>
              <p className="text-[18px] font-medium">Loss Run Processing</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Generates accurate historical claims reports.</li>
                <li>
                  Supports underwriting and risk analysis to reduce risk and
                  improve pricing.
                </li>
              </ul>

              <p className="text-[18px] font-medium">Claims Management</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  FNOL to resolution: reporting, documentation, status tracking.
                </li>
              </ul>

              <p className="text-[18px] font-medium">Renewals Processing</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Renewal tracking and follow-ups, ensuring timely updates with
                  carriers and agencies.
                </li>
                <li>Prevents lapses and improves retention.</li>
              </ul>

              <p className="text-[18px] font-medium">
                Premium Billing & Receivables
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>Invoicing, payment tracking, reconciliation.</li>
                <li>
                  Improve financial visibility, reduce overdue balances, and
                  streamline cash flow.
                </li>
              </ul>

              <p className="text-[18px] font-medium">ACORD Forms Processing</p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Accurate, compliant, and automated form handling while
                  reducing manual effort.
                </li>
              </ul>
              <p className="text-[18px] font-medium">
                Compliance & Quality Audits
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  Internal control checks, regulatory support, error reduction.
                </li>
                <li>Transparent governance and reporting</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="text-center"
          >
            <p className="text-black text-2xl font-medium mb-3">
              What Our Clients Say
            </p>
            <p className="text-md mb-3">
              <i>
                "The Mindteck team consistently demonstrates a strong
                customer-focused approach with excellent technical and
                communication skills. They quickly adapt to evolving business
                needs and deliver high-quality outcomes with minimal
                oversight - making them a reliable and collaborative extension of
                our team."{" "}
              </i>{" "}
 - Operations Head, Leading US MGA
            </p>
          </motion.div>
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
          <div className="bg-white rounded-[28px] shadow-[0_22px_45px_rgba(15,23,42,0.12)] flex flex-col md:flex-row items-stretch overflow-hidden border border-[#E7E1D3]">
            <div className="w-full md:w-3/5 px-6 py-8 md:px-10 md:py-12 lg:pr-12">
              <h2 className="text-[30px] leading-[1.35] font-athelas font-normal text-[#111111] mb-5">
                Ready to optimize your operations with
                <br /> scalable BPM support?
              </h2>
              <p className="text-base md:text-[19px] leading-8 text-[#303030] mb-8">
                Unlock the power of scalable BPM solutions across Insurance,
                Healthcare, Financial Services, and more.
              </p>
              <ContactFormVariantTwo />
              
            </div>
            <div className="w-full md:w-2/5">
              <img
                src={FreeAssessment.src}
                alt="Smart Connections"
                className="w-full h-[220px] md:h-full object-cover"
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
