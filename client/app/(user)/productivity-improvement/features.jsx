import RealTimeTaskManagement from "@/app/assets/images/productivity-improvement/Real-Time-Task-Management.png";
import InstantAlertsNotifications from "@/app/assets/images/productivity-improvement/Instant-Alerts-Notifications.png";
import WorkflowOptimization from "@/app/assets/images/productivity-improvement/Workflow-Optimization.png";
import EnhancedWorkerSafety from "@/app/assets/images/productivity-improvement/Enhanced-Worker-Safety.png";
import HandsFreeCommunication from "@/app/assets/images/productivity-improvement/Hands-Free-Communication.png";
import DataDrivenInsights from "@/app/assets/images/productivity-improvement/Data-Driven-Insights.png";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
const services = [
  {
    title: "Real-Time Task Management",
    content:
      "Supervisors can assign and update tasks directly to workers' smartwatches. This eliminates the need for paper-based work orders and ensures that employees always have the latest instructions, reducing idle time and minimizing errors.",
    image: RealTimeTaskManagement,
  },
  {
    title: "Instant Alerts & Notifications",
    content:
      "Equip workers with instant alerts for machine status, maintenance needs, or safety issues. A smartwatch can vibrate and display a message, ensuring critical information is received immediately, leading to faster response times and reduced downtime.",
    image: InstantAlertsNotifications,
  },
  {
    title: "Workflow Optimization",
    content:
      "Monitor task completion times and workflow patterns to identify inefficiencies. The data collected from the smartwatches can be analyzed to optimize production lines, reallocate resources, and streamline operations for maximum output.",
    image: WorkflowOptimization,
  },
  {
    title: "Enhanced Worker Safety",
    content:
      "The solution can be integrated with environmental sensors to alert workers to potential hazards like high temperatures or gas leaks. In an emergency, a worker can use the smartwatch to send a distress signal, providing their location for a rapid response.",
    image: EnhancedWorkerSafety,
  },

  {
    title: "Hands-Free Communication",
    content:
      "Workers can use the smartwatch for quick, hands-free communication with supervisors or other team members without having to stop what they're doing. This promotes a more connected and collaborative work environment.",
    image: HandsFreeCommunication,
  },
  {
    title: "Data-Driven Insights",
    content:
      "Our solution provides a comprehensive dashboard that aggregates data from all connected smartwatches. This allows managers to visualize productivity trends, identify training needs, and make informed decisions to continuously improve factory operations.",
    image: DataDrivenInsights,
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
