import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeploySmartwatches from "@/app/assets/images/productivity-improvement/Deploy-Smartwatches.png";
import ConnectToIoTPlatform from "@/app/assets/images/productivity-improvement/Connect-to-IoT-Platform.png";
import IntegrateCustomize from "@/app/assets/images/productivity-improvement/Integrate-Customize.png";
import AnalyzeImprove from "@/app/assets/images/productivity-improvement/Analyze-Improve.png";

import Image from "next/image";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";
const services = [
  {
    title: "Deploy Smartwatches",
    content:
      "Workers are equipped with rugged, industrial-grade smartwatches that are chosen for their durability and battery life.",
    image: DeploySmartwatches,
  },
  {
    title: "Connect to IoT Platform",
    content:
      "The smartwatches are connected to Secure IoT platform, which acts as the central hub for data collection and communication.",
    image: ConnectToIoTPlatform,
  },
  {
    title: "Integrate & Customize",
    content:
      "We integrate the platform with your existing enterprise systems (e.g., MES, ERP) and customize the application to match your specific workflows and reporting needs.",
    image: IntegrateCustomize,
  },
  {
    title: "Analyze & Improve",
    content:
      "Data from the watches is analyzed in real time, providing actionable insights through a user-friendly dashboard. This allows you to continuously monitor performance and make data-backed decisions for improvement.",
    image: AnalyzeImprove,
  },
];

export default function IndustryApplications() {
  return (
    <section className="py-11 mb-4 bg-white font-inter">
      <div className="container">
        <motion.h2
          className="text-3xl font-medium text-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-md mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
        >
          Our solution is designed to be simple, scalable, and easy to integrate
          into your existing factory infrastructure.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-10">
          {services.map((el, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 * index }).inUp}
              key={el.title}
            >
              <Card className="shadow-none rounded-none bg-[#ECEEEF] h-full flex flex-col justify-between gap-8">
                <div>
                  <CardHeader className="py-3">
                    <CardTitle className="text-xl font-semibold mb-0">
                      {el.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-md">{el.content}</p>
                  </CardContent>
                </div>
                <Image
                  src={el.image.src} // Replace with your image path
                  alt="Digital Health"
                  width={526}
                  height={299}
                  className="w-full object-cover mb-3"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
