import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BigDataDeltaLakeMigration from "@/app/assets/images/data-engineering/Big-Data–Delta-Lake-Migration.png";
import MESDWHNifiSolution from "@/app/assets/images/data-engineering/MES-DWH–Nifi-Solution.png";
import TelecomDataLake from "@/app/assets/images/data-engineering/Telecom-Data-Lake.png";
import FaultCatalogAPISolutions from "@/app/assets/images/data-engineering/Fault-Catalog-API-Solutions.png";
import BIVisualizationAdvisory from "@/app/assets/images/data-engineering/BI-Visualization-Advisory.png";

import Image from "next/image";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";
const services = [
  {
    title: "Big Data - Delta Lake Migration",
    content:
      "Delivered robust, scalable big data solutions improving dashboard usability, system reliability, and data quality for semiconductor equipment manufacturers.",
    image: BigDataDeltaLakeMigration,
  },
  {
    title: "MES DWH - Nifi Solution",
    content:
      "Built centralized pipelines for seamless, compliant data extraction and management across diverse databases and geographies.",
    image: MESDWHNifiSolution,
  },
  {
    title: "Telecom Data Lake",
    content:
      "Created nationwide multi-year data lake with real-time insights, massively enhancing operational efficiency and analytics capability",
    image: TelecomDataLake,
  },
  {
    title: "Fault Catalog & API Solutions",
    content:
      "Designed secure, cloud-hosted catalog/document management with workflow, audit, and multilingual features for global semiconductor clients.",
    image: FaultCatalogAPISolutions,
  },

  {
    title: "BI Visualization & Advisory",
    content:
      "Provided advanced visualization platforms for global clients, enabling interactive exploration of world growth opportunities.",
    image: BIVisualizationAdvisory,
  },
];

export default function Services() {
  return (
    <section className="py-11 mb-4 bg-white font-inter">
      <div className="container">
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
                    <p className="text-gray-700 text-md line-clamp-6">
                      {el.content}
                    </p>
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
        <p className="text-md italic text-center mt-10">
          Mindteck transforms raw data into business intelligence and digital
          innovation,<br/> driving value across domains with trusted, future-ready
          engineering and analytics.
        </p>
      </div>
    </section>
  );
}
