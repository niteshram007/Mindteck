import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DigitalHealthImage from "@/app/assets/images/medical-device-healthcare/digital-health.png";
import SoftwareMedicalDevice from "@/app/assets/images/medical-device-healthcare/Software-Medical-Device.png";
import Cybersecurity from "@/app/assets/images/medical-device-healthcare/cybersecurity.png";
import RegulatoryServices from "@/app/assets/images/medical-device-healthcare/Regulatory-Services.png";
import MedicalDevices from "@/app/assets/images/medical-device-healthcare/Medical-Devices.png";
import HealthcareInformatics from "@/app/assets/images/medical-device-healthcare/Healthcare-Informatics-new.png";
import InteroperabilitySolutions from "@/app/assets/images/medical-device-healthcare/Interoperability-Solutions.png";
import Image from "next/image";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";

const services = [
  {
    title: "Digital Health",
    content:
      "Transforming care delivery with cloud platforms, remote monitoring, and connected care ecosystems. We integrate devices, EHRs, and analytics to enable real-time interventions, improve outcomes, and optimize healthcare operations.",
    image: DigitalHealthImage,
  },
  {
    title: "Software as Medical Device",
    content:
      "Creating high-quality, regulatory-compliant SaMD solutions that support diagnostics, monitoring, and treatment workflows. Our SaMD solutions ensure safe, effective, and scalable digital interventions for improved patient outcomes.",
    image: SoftwareMedicalDevice,
  },
  {
    title: "Cybersecurity",
    content:
      "Providing end-to-end protection for healthcare applications, medical devices, and patient data. From risk assessment and threat modeling to penetration testing and mitigation, we secure digital ecosystems while ensuring regulatory compliance and patient safety.",
    image: Cybersecurity,
  },
  {
    title: "Regulatory Services",
    content:
      "Enabling compliance with global healthcare standards, including ISO, FDA, and GxP. From validation, testing, and risk management to documentation, we ensure medical software and devices are safe, effective, and audit-ready.",
    image: RegulatoryServices,
  },
  {
    title: "Medical Devices",
    content:
      "Designing, developing, and sustaining advanced medical devices with robust firmware, software, and hardware integration. Our solutions prioritize reliability, usability, and compliance to deliver secure, innovative patient-centric devices.",
    image: MedicalDevices,
  },
  {
    title: "Healthcare Informatics",
    content:
      "Streamlining data management, analytics, and reporting in healthcare and life sciences. Our solutions integrate laboratory systems, clinical workflows, and digital platforms to deliver actionable insights and improve operational efficiency.",
    image: HealthcareInformatics,
  },
  {
    title: "Interoperability Solutions",
    content:
      "Accelerating seamless data exchange across EHRs, PACS, and medical devices using FHIR, HL7, and DICOM standards. We ensure efficient, secure, and standardized communication to enhance clinical workflows and patient care.",
    image: InteroperabilitySolutions,
  },
];

export default function Services() {
  return (
    <section className="py-11 mb-4 bg-white font-inter">
      <div className="container">
        <h2 className="text-3xl font-medium mb-4 text-gray-900">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((el, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 * index }).inUp}
              key={el.title}
              className="h-full"
            >
              <Card className="shadow-none rounded-none bg-[#ECEEEF] h-full flex flex-col">
                <CardHeader className="px-6 pt-4 pb-1 min-h-[64px] space-y-1">
                  <CardTitle className="text-xl font-semibold mb-0 leading-tight">
                    {el.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                  <p className="text-gray-700 text-md line-clamp-6 min-h-[144px]">
                    {el.content}
                  </p>
                </CardContent>
                <Image
                  src={el.image.src}
                  alt={el.title}
                  width={526}
                  height={299}
                  className="w-full object-cover h-[230px]"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
