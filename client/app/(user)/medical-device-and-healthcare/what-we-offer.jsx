import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as motion from "motion/react-client";
import HealthcareITSolutions from "../../assets/images/medical-device-healthcare/healthcare-it-solutions.png";
import DigitalHealthTransformation from "../../assets/images/medical-device-healthcare/Digital-Health-Transformation.png";
import { varFade } from "@/lib/animate";

export default function WhatWeOffer() {
  return (
    <section className="py-11 mb-4">
      <div className="container">
        <h2 className="text-3xl font-medium mb-4 text-gray-900">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8">
          {/* Digital Health */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
            className="h-full"
          >
            <Card className="shadow-none rounded-none border-none h-full flex flex-col bg-white">
              <CardHeader className="px-6 pt-4 pb-1 min-h-[64px] space-y-1">
                <CardTitle className="text-xl font-semibold mb-0 leading-tight">
                  Digital Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 flex flex-col">
                <p className="text-gray-700 text-sm">
                  Delivering cloud-enabled platforms for remote patient
                  monitoring, connected care, and interoperability. Our
                  solutions integrate devices, EHRs, and analytics to enable
                  real-time decision-making, improve patient outcomes, and drive
                  operational efficiency.
                </p>
                <Image
                  src={HealthcareITSolutions.src}
                  alt="Digital Health"
                  width={400}
                  height={250}
                  className="w-full object-cover h-[230px]"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.2 }).inUp}
            className="h-full"
          >
            <Card className="shadow-none rounded-none border-none h-full flex flex-col bg-white">
              <CardHeader className="px-6 pt-4 pb-1 min-h-[64px] space-y-1">
                <CardTitle className="text-xl font-semibold mb-0 leading-tight">
                  Medical Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 flex flex-col">
                <p className="text-gray-700 text-sm">
                  Engineering next-generation medical devices with advanced
                  firmware, software, and embedded systems. From design and
                  development to testing and regulatory compliance, we ensure
                  secure, reliable, and patient-centric device solutions.
                </p>
                <Image
                  src={DigitalHealthTransformation.src}
                  alt="Medical Devices"
                  width={400}
                  height={250}
                  className="w-full object-cover h-[230px]"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
