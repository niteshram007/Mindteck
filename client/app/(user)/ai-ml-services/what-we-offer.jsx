import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as motion from "motion/react-client";
import HealthcareITSolutions from "../../assets/images/medical-device-healthcare/healthcare-it-solutions.png";
import DigitalHealthTransformation from "../../assets/images/medical-device-healthcare/Digital-Health-Transformation.png";
import HealthcareInformatics from "../../assets/images/medical-device-healthcare/Healthcare-Informatics.png";
import { varFade } from "@/lib/animate";

export default function WhatWeOffer() {
  return (
    <section className="py-11 mb-4">
      <div className="container">
        <h2 className="text-3xl font-medium mb-4 text-gray-900">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {/* Digital Health */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
          >
            <Card className="shadow-none rounded-none border-none">
              <CardHeader className="py-3">
                <CardTitle className="text-xl font-semibold mb-0">
                  Digital Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  className="w-full object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.2 }).inUp}
          >
            <Card className="shadow-none rounded-none border-none">
              <CardHeader className="py-3">
                <CardTitle className="text-xl font-bold mb-0">
                  Medical Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  className="w-full object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.4 }).inRight}
          >
            <Card className="shadow-none rounded-none border-none">
              <CardHeader className="py-3">
                <CardTitle className="text-xl font-bold mb-0">
                  Life Sciences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">
                  Accelerating innovation in diagnostics, imaging, and
                  laboratory informatics. We combine AI, data analytics, and
                  regulatory expertise to optimize workflows, enhance scientific
                  insights, and support precision medicine initiatives.
                </p>
                <Image
                  src={HealthcareInformatics.src}
                  alt="Life Sciences"
                  width={400}
                  height={250}
                  className="w-full object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
