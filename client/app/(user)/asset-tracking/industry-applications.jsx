import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Manufacturing from "@/app/assets/images/asset-tracking/Manufacturing.png";
import OilGas from "@/app/assets/images/asset-tracking/Oil-Gas.png";
import Healthcare from "@/app/assets/images/asset-tracking/Healthcare.png";
import LogisticsSupplyChain from "@/app/assets/images/asset-tracking/Logistics-Supply-Chain.png";


import Image from "next/image";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";
const services = [
  {
    title: "Manufacturing",
    content:
      "Track tools, machinery, and raw materials to optimize production lines and enhance productivity.",
    image: Manufacturing,
  },
  {
    title: "Oil & Gas",
    content:
      "Monitor and track high-value equipment and field assets in remote and harsh environments for preventive maintenance and operational safety.",
    image: OilGas,
  },
  {
    title: "Healthcare",
    content:
      "Manage hospital assets like medical equipment, wheelchairs, and IV pumps to improve patient care, staff efficiency, and inventory management.",
    image: Healthcare,
  },
  {
    title: "Logistics & Supply Chain",
    content:
      "Ensure the safety and integrity of goods in transit, especially for cold storage and high-value shipments, with real-time location and condition monitoring.",
    image: LogisticsSupplyChain,
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
          Industry Applications
        </motion.h2>
        <motion.p
          className="text-md mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
        >
          Mindteck's Asset Tracking Solutions are versatile and can be applied
          across a wide range of industries, including:
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
