import RealTimeMonitoring from "@/app/assets/images/asset-tracking/Real-Time-Monitoring.png";
import PredictiveMaintenance from "@/app/assets/images/asset-tracking/Predictive-Maintenance.png";
import OperationalEfficiency from "@/app/assets/images/asset-tracking/Operational-Efficiency.png";
import CustomizableScalable from "@/app/assets/images/asset-tracking/Customizable-Scalable.png";
import RobustAnalyticsReporting from "@/app/assets/images/asset-tracking/Robust-Analytics-Reporting.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
const services = [
  {
    title: "Real-Time Monitoring & Location Tracking",
    content:
      "Know the exact location and status of your assets at all times. Our solutions leverage a range of technologies including RFID, GPS, and Bluetooth Low Energy (BLE) to provide accurate, real-time data, whether your assets are in a warehouse, on the move, or spread across a large campus.",
    image: RealTimeMonitoring,
  },
  {
    title: "Predictive Maintenance",
    content:
      "Move beyond reactive repairs. By continuously monitoring asset performance and health, our solution uses AI/ML-based predictive models to forecast potential failures, allowing you to schedule maintenance proactively and minimize costly downtime.",
    image: PredictiveMaintenance,
  },
  {
    title: "Operational Efficiency",
    content:
      "Optimize workflows and resource allocation. Real-time insights help streamline processes, reduce manual tracking efforts, and improve productivity. For example, in a manufacturing setting, our solution can help you locate tools and equipment instantly, while in a hospital, it can help manage critical medical devices.",
    image: OperationalEfficiency,
  },
  {
    title: "Enhanced Security & Compliance",
    content:
      "Protect your valuable assets from loss or theft. Our solutions include features like geo-fencing and real-time alerts for unauthorized movement, ensuring your assets remain secure. This also helps in meeting compliance requirements by providing a clear audit trail of asset usage and location.",
    image: OperationalEfficiency,
  },

  {
    title: "Customizable & Scalable",
    content:
      "We understand that every business is unique. Our IoT framework and flexible architecture allow us to create a solution tailored to your specific needs, seamlessly integrating with your existing business systems and infrastructure.",
    image: CustomizableScalable,
  },
  {
    title: "Robust Analytics & Reporting",
    content:
      "Gain critical business insights with our intuitive dashboards and reporting tools. Visualize key metrics such as asset utilization, location history, and maintenance schedules to make smarter, more informed business decisions.",
    image: RobustAnalyticsReporting,
  },
];

export default function Services() {
  return (
    <section className="py-11 mb-4">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="text-3xl font-medium text-gray-900 mb-8"
        >
          Key Features & Benefits
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((el, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 * index }).inUp}
              key={el.title}
            >
              <Card className="shadow-none rounded-none h-full flex flex-col justify-between">
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
