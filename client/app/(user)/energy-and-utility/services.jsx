import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmbeddedSystemsDesign from "@/app/assets/images/energy-and-utility/Embedded-Systems-Design.png";
import HVACLightingControl from "@/app/assets/images/energy-and-utility/HVAC-Lighting-Control.png";
import PredictiveMaintenance from "@/app/assets/images/energy-and-utility/Predictive-Maintenance.png";
import IntegratedSecurity from "@/app/assets/images/energy-and-utility/Integrated-Security.png";
import EnergyDashboards from "@/app/assets/images/energy-and-utility/Energy-Dashboards.png";

import Image from "next/image";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";
const services = [
  {
    title: "Embedded Systems Design",
    content:
      "The heart of any smart building is its embedded technology. We design and develop the intelligent hardware and firmware for various building automation devices, including smart sensors, controllers, and gateways. Our expertise covers a wide range of wireless communication protocols such as Zigbee, Z-Wave, Thread, and Bluetooth to create robust, low-power, and scalable networks that seamlessly connect all devices.",
    image: EmbeddedSystemsDesign,
  },
  {
    title: "HVAC & Lighting Control",
    content:
      "Our systems use real-time sensor data to intelligently control HVAC and lighting, maximizing comfort and cutting energy waste. Advanced protocols like DALI and DMX enable flexible, individual lighting control and detailed reporting, while wireless technologies such as ZigBee, Thread, WiFi, and Bluetooth allow scalable, wiring-free networks",
    image: HVACLightingControl,
  },
  {
    title: "Predictive Maintenance",
    content:
      "Monitor the health of critical building systems, from elevators to pumps, to predict maintenance needs before a failure occurs. This proactive approach minimizes downtime and extends the life of valuable equipment.",
    image: PredictiveMaintenance,
  },
  {
    title: "Integrated Security",
    content:
      "We can integrate your security systems, including cameras and access control, into a single, centralized platform. This enhances building security and provides a comprehensive overview of all activities",
    image: IntegratedSecurity,
  },

  {
    title: "Energy Dashboards",
    content:
      "Our intuitive dashboards provide building managers with a unified view of energy consumption across their entire property. This allows for easy analysis, benchmarking, and reporting to continuously improve efficiency.",
    image: EnergyDashboards,
  },
];

export default function Services() {
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
          Building Automation
        </motion.h2>
        <motion.p
          className="text-md mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
        >
          We empower building owners and managers to create intelligent,
          energy-efficient, and comfortable spaces. Our solutions automate and
          optimize every aspect of a building's operations
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((el, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 * index }).inUp}
              key={el.title}
            >
              <Card className="shadow-none rounded-none bg-[#ECEEEF] h-full flex flex-col justify-between">
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
