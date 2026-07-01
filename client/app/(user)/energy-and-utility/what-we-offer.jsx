import AdvancedMeteringInfrastructure from "@/app/assets/images/energy-and-utility/Advanced-Metering-Infrastructure-(AMI).png";
import GridModernization from "@/app/assets/images/energy-and-utility/Grid-Modernization.png";
import EVChargerSolutions from "@/app/assets/images/energy-and-utility/EV-Charger-Solutions.png";
import AssetManagement from "@/app/assets/images/energy-and-utility/Asset-Management.png";
import EnergyManagementSystems from "@/app/assets/images/energy-and-utility/Energy-Management-Systems.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
const services = [
  {
    title: "Advanced Metering Infrastructure (AMI)",
    content:
      "We design and develop smart metering solutions for all utilities, including electricity, gas, and water. This allows for two-way communication between utilities and consumers, enabling real-time data collection, remote meter reading, and enhanced outage management. For water metering, this means early leak detection, precise billing, and promoting conservation",
    image: AdvancedMeteringInfrastructure,
  },
  {
    title: "Grid Modernization",
    content:
      "We provide solutions that help utilities improve grid reliability and efficiency. Our services include smart grid communication, substation automation, and the seamless integration of distributed energy resources like solar and wind power.",
    image: GridModernization,
  },
  {
    title: "EV Charger Solutions",
    content:
      "As the adoption of electric vehicles accelerates, so does the demand for intelligent charging infrastructure. Our solutions enable utilities to manage EV charging networks efficiently, ensuring a balanced load on the grid and a seamless experience for EV drivers. ",
    image: EVChargerSolutions,
  },
  {
    title: "Asset Management",
    content:
      "Our solutions allow you to track and monitor critical infrastructure assets in real time. We provide insights into the health of transformers, power lines, and other equipment, enabling predictive maintenance to reduce costly downtime.",
    image: AssetManagement,
  },

  {
    title: "Energy Management Systems",
    content:
      "Give your customers the tools to monitor their energy consumption. Our systems offer personalized insights and recommendations that help them reduce their carbon footprint and lower their energy bills.",
    image: EnergyManagementSystems,
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
          className="text-3xl font-medium text-gray-900"
        >
          Energy Utilities
        </motion.h2>
        <motion.p
          className="text-md mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
        >
          Mindteck helps utilities modernize their infrastructure and
          operations, enabling them to build a more resilient and efficient
          grid.
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
