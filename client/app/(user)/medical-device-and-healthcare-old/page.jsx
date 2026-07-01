import MDHBanner from "../../assets/images/medical-device-healthcare/medical-device-healthcare-banner.png";
import WhyChoose from "../../assets/images/medical-device-healthcare/why-choose-us.png";
import DigitalHealthTransformation from "../../assets/images/medical-device-healthcare/Digital-Health-Transformation.png";
import HealthcareInformatics from "../../assets/images/medical-device-healthcare/Healthcare-Informatics.png";
import HealthcareITSolutions from "../../assets/images/medical-device-healthcare/healthcare-it-solutions.png";
import MedicalDeviceEngineering from "../../assets/images/medical-device-healthcare/Medical-Device-Engineering.png";
import MedicalDeviceIntegration from "../../assets/images/medical-device-healthcare/Medical-Device-Integration.png";
import RegulatoryCompliance from "../../assets/images/medical-device-healthcare/Regulatory-Compliance.png";
import FreeAssessment from "../../assets/images/medical-device-healthcare/get-free-assessment.png";
import RVV from "../../assets/images/eds/rigorous-verification-validation.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
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
                    Delivering innovation in <br />
                    healthcare technology.
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    We deliver trusted medical solutions for better patient
                    outcomes.
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
          <Breadcrumbs paths={["Medical Devices and Healthcare"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Medical Devices and Healthcare
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
              <h3 className="text-black text-3xl  font-athelas">
                Partner with Mindteck to accelerate your Digital Healthcare
                transformation journey
              </h3>

              <p className="text-md text-black my-4">
                With rich healthcare domain experience and an optimum mix of
                traditional and digital technological capabilities, Mindteck is
                a leader in Medical Systems Engineering R&D and Healthcare IT
                Services.
              </p>
              <p className="text-md text-black">
                We help create insight-driven, patient-centric and connected
                care solutions.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="relative sm:col-span-4 col-span-12 md:mt-0 mt-5"
            >
              <Image
                src={WhyChoose.src}
                width={"587"}
                height={"500"}
                alt="success-story"
                className="mt-2 m-auto w-full h-full"
              />
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
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                Connected Care Platforms & Healthcare IT Solutions (Primary
                Focus)
              </h3>
              <p className="text-md">
                Lead the digital transformation of healthcare with our
                comprehensive software and platform development capabilities:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Enterprise EMR/EHR Systems:
                  </span>{" "}
                  Developing sophisticated electronic medical record platforms
                  with clinical decision support, workflow optimization, and
                  seamless integration capabilities for improved patient care
                  coordination.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Advanced Medical Imaging Solutions:
                  </span>{" "}
                  Creating comprehensive RIS/OIS/PACS platforms with
                  cloud-enabled radiology capabilities, DICOM-compliant viewing
                  tools, and AI-powered image analysis for enhanced diagnostic
                  accuracy.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Interoperability & Healthcare Information Exchange:
                  </span>{" "}
                  Implementing FHIR-based solutions for modern healthcare data
                  exchange, enabling seamless EHR connectivity and supporting
                  health information exchanges (HIE) across care continuum.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Software as a Medical Device (SaMD):
                  </span>{" "}
                  Developing FDA-compliant web and mobile medical applications
                  including diagnostic tools, treatment planning software,
                  remote monitoring apps, and clinical decision support systems.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Healthcare Analytics & AI/ML Integration:
                  </span>{" "}
                  Building intelligent analytics platforms leveraging machine
                  learning for predictive diagnostics, treatment optimization,
                  and clinical outcome improvement.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Telehealth & Virtual Care Platforms:
                  </span>{" "}
                  Creating comprehensive telemedicine solutions with video
                  consultation capabilities, remote examination tools,
                  integrated scheduling, and patient engagement features.
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

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={DigitalHealthTransformation.src}
                  alt="iot-platforms"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary text-xl font-bold mb-3">
                Digital Health Transformation Services
              </h3>
              <p className="text-md">
                Accelerate your healthcare organization's digital journey with
                our transformation expertise:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Legacy Application Modernization:
                  </span>{" "}
                  Transforming outdated healthcare IT systems into modern,
                  cloud-native architectures while ensuring data integrity,
                  regulatory compliance, and zero downtime migration.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Cloud-Enabled Healthcare Solutions:
                  </span>{" "}
                  Developing secure, HIPAA-compliant cloud infrastructures for
                  healthcare data storage, processing, and real-time analytics
                  with multi-tenant capabilities.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Cybersecurity for Healthcare:
                  </span>{" "}
                  Comprehensive security implementations including vulnerability
                  assessments per FDA guidelines, penetration testing, secure
                  architecture design, and continuous security monitoring.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Blockchain in Healthcare:
                  </span>{" "}
                  Implementing distributed ledger solutions for secure health
                  information exchange, consent management, and maintaining
                  immutable audit trails for regulatory compliance.
                </li>
              </ul>
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
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12 sm:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Medical Device Integration & IoT Connectivity
              </h3>
              <p className="text-md">
                Enable seamless connectivity across the healthcare ecosystem:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    IoT-Based Device Connectivity:
                  </span>{" "}
                  Developing comprehensive device integration platforms
                  supporting multiple medical devices simultaneously with
                  real-time data capture and transmission capabilities.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Medical Device Data Integration:
                  </span>{" "}
                  Creating middleware solutions for aggregating data from
                  diverse medical devices including patient monitors, infusion
                  pumps, ventilators, and diagnostic equipment.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Remote Patient Monitoring Systems:
                  </span>{" "}
                  Building cloud-based platforms for continuous patient
                  monitoring, enabling near real-time data transfer and two-way
                  communication between patients and healthcare providers.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Asset Tracking & Management:
                  </span>{" "}
                  Implementing IoT-enabled solutions for hospital asset
                  tracking, equipment utilization monitoring, predictive
                  maintenance, and inventory management.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 text-center col-span-12 sm:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={MedicalDeviceIntegration.src}
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={HealthcareInformatics.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Healthcare Informatics & Data Solutions
              </h3>
              <p className="text-md">
                Transform healthcare data into actionable insights:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Clinical Data Warehousing:
                  </span>{" "}
                  Building comprehensive data repositories integrating clinical,
                  operational, and financial data for enterprise-wide analytics
                  and reporting.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Healthcare Business Intelligence:
                  </span>{" "}
                  Developing interactive dashboards and reporting solutions for
                  clinical quality metrics, operational KPIs, and financial
                  performance tracking.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Oncology Informatics Workflows:
                  </span>{" "}
                  Creating specialized solutions for cancer care including
                  treatment planning, clinical trial matching, tumor registry
                  reporting, and outcomes tracking.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Laboratory Information Management:
                  </span>{" "}
                  Developing LIMS and laboratory automation solutions for sample
                  tracking, result management, and quality control.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Clinical Research Platforms:{" "}
                  </span>
                  Building systems for patient recruitment, clinical trial
                  management, electronic data capture (EDC), and regulatory
                  compliance.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Real-World Evidence Platforms:{" "}
                  </span>
                  Creating solutions for capturing and analyzing real-world data
                  to support value-based care initiatives and clinical research.
                </li>
              </ul>
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
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Medical Device Engineering Services
              </h3>
              <p className="text-md">
                Complement your digital initiatives with our medical device
                development expertise:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Medical Device Software Development:
                  </span>{" "}
                  Creating embedded software, firmware, and application software
                  for diagnostic equipment, patient monitors, and therapeutic
                  devices following IEC 62304 standards.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Hardware Design & Development:{" "}
                  </span>
                  Engineering medical-grade hardware including patient
                  monitoring systems, diagnostic instruments, and wearable
                  health devices with focus on safety and reliability.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Regulatory Compliance Support:
                  </span>{" "}
                  Providing comprehensive FDA 510(k)/PMA support, EU MDR
                  compliance, and global regulatory strategy for both software
                  and hardware medical devices.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Verification & Validation Services:{" "}
                  </span>
                  Conducting thorough V&V activities including automated
                  testing, performance validation, and compliance testing for
                  medical devices.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Prototype Development:
                  </span>{" "}
                  Rapid prototyping and proof-of-concept development for
                  innovative medical device concepts.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={MedicalDeviceEngineering.src}
                  alt="iot-for-mindteck-cliet"
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={RegulatoryCompliance.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Regulatory Compliance & Quality Excellence
              </h3>
              <p className="text-md">
                Navigate complex healthcare regulations with confidence:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Healthcare IT Compliance:
                  </span>{" "}
                  Ensuring HIPAA compliance, HITECH Act adherence, and meeting
                  Meaningful Use requirements for all digital health solutions.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Medical Device Regulations:
                  </span>{" "}
                  Supporting FDA 21 CFR Part 11 for electronic records, Part 820
                  for quality systems, EU MDR/IVDR compliance, and ISO 13485
                  implementation.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Software Lifecycle Management:
                  </span>{" "}
                  Following IEC 62304 for medical device software development
                  with comprehensive documentation and traceability.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Cybersecurity Compliance:
                  </span>{" "}
                  Implementing FDA cybersecurity guidance, conducting risk
                  assessments per NIST framework, and ensuring ongoing security
                  monitoring.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Data Privacy & Protection:
                  </span>{" "}
                  Ensuring GDPR compliance, implementing privacy by design
                  principles, and managing consent across healthcare systems.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Clinical Validation Support:
                  </span>{" "}
                  Designing and executing clinical validation studies for SaMD
                  and digital therapeutics.
                </li>
              </ul>
              <h3 className="text-secondary font-bold text-xl mb-3">
                Industries & Healthcare Segments We Serve
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Healthcare Providers:
                  </span>{" "}
                  Hospitals, health systems, ambulatory care centers, specialty
                  clinics
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Healthcare IT Companies:
                  </span>{" "}
                  EHR/EMR vendors, health information exchanges, digital health
                  startups
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Medical Device Companies:
                  </span>{" "}
                  Diagnostic equipment manufacturers, patient monitoring
                  companies
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Payers & Insurance:
                  </span>{" "}
                  Health plans implementing value-based care initiatives
                </li>
                <li>
                  <span className="text-sm font-semibold">Life Sciences: </span>
                  Pharmaceutical companies, clinical research organizations
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Government Healthcare:
                  </span>{" "}
                  Public health agencies, military health systems
                </li>
              </ul>
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
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                The Mindteck Edge
              </h3>

              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    30+ Years of Healthcare Experience:
                  </span>{" "}
                  helping clients improve quality of care and operational
                  efficiency
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Serving Healthcare Clients Worldwide:
                  </span>{" "}
                  across US, Canada, Europe, and Asia Pacific regions
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Deep Domain Knowledge:
                  </span>{" "}
                  backed by strong delivery capabilities in Agile and
                  traditional models
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Digital Health Engineering Leadership:
                  </span>{" "}
                  building connected care ecosystems for value-based delivery
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Regulatory Compliance Excellence:
                  </span>{" "}
                  with ISO 13485:2016, ISO 9001:2015, ISO 27001:2013
                  certifications
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Technology Innovation:
                  </span>{" "}
                  helping clients adopt emerging technologies and modernize
                  legacy systems
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Flexible Engagement Models:
                  </span>{" "}
                  including Time & Material, Fixed Price, and Outcome-based
                  approaches
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={RVV.src}
                  alt="iot-for-mindteck-cliet"
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
          <div className="bg-white rounded-[28px] shadow-[0_22px_45px_rgba(15,23,42,0.12)] flex flex-col md:flex-row overflow-hidden border border-[#E7E1D3] relative">
            <div className="w-full md:w-4/5 pt-10 pb-10 pl-5 pr-5 z-10">
              <h2 className="text-[30px] leading-[1.35] font-athelas font-normal text-[#111111] mb-5">
                Empower Healthcare Through Innovation
              </h2>
              <p className="text-gray-600 mb-6 md:w-3/5">
                Our expertise in medical standards compliance, robust embedded
                systems, and agile approaches accelerates your path from concept
                to certified product. Together, we'll navigate critical
                challenges in patient safety and performance.
              </p>
              <p className="text-secondary font-bold ">
                Ready to Transform Patient Care?
              </p>
              <p className="text-base md:text-[19px] leading-8 text-[#303030] mb-8">
                Choose Mindteck for your next-generation medical device
                development.
                <br /> Let's collaborate to improve lives and redefine
                healthcare - starting now.
              </p>
              <Button variant="secondary">Get Free Assessment</Button>
            </div>
            <div className="hidden md:block h-full absolute right-0 md:w-[40%]">
              <img
                src={FreeAssessment.src}
                alt="Smart Connections"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-l from-transparent to-white"></div>
            </div>
          </div>
        </motion.div>
        <SuccessStory />
      </section>
      <ContactForm />
    </div>
  );
}
