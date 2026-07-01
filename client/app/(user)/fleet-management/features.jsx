import RealTimeVehicleTracking from "@/app/assets/images/fleet-management/Real-Time-Vehicle-Tracking.png";
import OperationalEfficiency from "@/app/assets/images/fleet-management/Operational-Efficiency.png";
import EnhancedSecurityCompliance from "@/app/assets/images/fleet-management/Enhanced-Security-Compliance.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
const services = [
  {
    title: "Real-Time Vehicle Tracking",
    content:
      "Know the exact location of every vehicle in your fleet at all times. Our GPS and geofencing capabilities provide real-time updates, allowing you to optimize routes, improve dispatching, and give accurate ETAs to customers.",
    image: RealTimeVehicleTracking,
  },
  {
    title: "Operational Efficiency",
    content:
      "Optimize your entire fleet operation. The insights from our solution help you streamline workflows, automate reporting, and reduce the administrative burden associated with fleet management.",
    image: OperationalEfficiency,
  },
  {
    title: "Enhanced Security & Compliance",
    content:
      "Protect your valuable assets and ensure regulatory compliance. Our solution provides detailed logs and reports for hours of service (HOS) and other mandates, while also offering features like real-time alerts for unauthorized vehicle use or movement.",
    image: EnhancedSecurityCompliance,
  },
];

export default function Features() {
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
          Key Features Developed
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
