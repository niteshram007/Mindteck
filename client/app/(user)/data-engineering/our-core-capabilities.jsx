import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as motion from "motion/react-client";
import DataEngineering from "../../assets/images/data-engineering/Data-Engineering.png";
import BusinessIntelligenceAnalytics from "../../assets/images/data-engineering/Business-Intelligence-Analytics.png";
import DigitalEnablement from "../../assets/images/data-engineering/Digital-Enablement.png";
import { varFade } from "@/lib/animate";

export default function OurCoreCapabilities() {
  return (
    <section className="pt-11 mb-4 ">
      <div className="container">
        <h2 className="text-3xl font-medium mb-4 text-gray-900">
          Our Core Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 mb-8">
          {/* Digital Health */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
          >
            <Card className="shadow-none rounded-none border-none h-full flex flex-col justify-between">
              <div>
                <CardHeader className="py-3">
                  <CardTitle className="text-xl font-semibold mb-0">
                    Data Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-black text-md">
                    We build scalable, future-ready data ecosystems that
                    seamlessly handle the complexity of modern enterprises.
                  </p>
                  <ul className="text-md list-disc pl-4">
                    <li>Data Lake & Data Warehouse Implementation</li>
                    <li>Data Pipelines Development & Integration</li>
                    <li>Cloud Strategy, Migration, and DevOps Enablement</li>
                    <li>DataOps & MLOps for agile data and model operations</li>
                    <li>
                      Data Governance, Quality, and Master Data Management
                    </li>
                  </ul>
                </CardContent>
              </div>
              <Image
                src={DataEngineering.src}
                alt="Digital Health"
                width={400}
                height={250}
                className="w-full object-cover mb-3"
              />
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.2 }).inUp}
          >
            <Card className="shadow-none rounded-none border-none h-full flex flex-col justify-between">
              <div>
                <CardHeader className="py-3">
                  <CardTitle className="text-xl font-bold mb-0">
                    Business Intelligence & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-black text-md">
                    We empower organizations to uncover hidden patterns, predict
                    outcomes, and visualize opportunities.
                  </p>
                  <ul className="text-md list-disc pl-4">
                    <li>Advanced Data Analytics & Insights Discovery</li>
                    <li>Predictive Modeling & Forecasting</li>
                    <li>Machine Learning & Deep Learning Integration</li>
                    <li>KPI Dashboards & Custom BI Reporting</li>
                    <li>
                      Data Visualization for clear, decision-ready insights
                    </li>
                  </ul>
                </CardContent>
                </div>
                <Image
                  src={BusinessIntelligenceAnalytics.src}
                  alt="Medical Devices"
                  width={400}
                  height={250}
                  className="w-full object-cover mb-3"
                />
              
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.4 }).inRight}
          >
            <Card className="shadow-none rounded-none border-none h-full flex flex-col justify-between">
              <div>
                <CardHeader className="py-3">
                  <CardTitle className="text-xl font-bold mb-0">
                    Digital Enablement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-black text-md">
                    Beyond data, we align people, processes, and technology for
                    holistic digital transformation.
                  </p>
                  <ul className="text-md list-disc pl-4">
                    <li>Innovation Strategy & Product Engineering</li>
                    <li>UI/UX Design for intuitive user experiences</li>
                    <li>Quality Engineering & Managed Services</li>
                  </ul>
                </CardContent>
                </div>
                <Image
                  src={DigitalEnablement.src}
                  alt="Life Sciences"
                  width={400}
                  height={250}
                  className="w-full object-cover mb-3"
                />
              
            </Card>
          </motion.div>
        </div>

        <h2 className="text-3xl font-medium mb-3 text-gray-900">
          The Impact We Deliver
        </h2>
        <div className="container bg-white py-4 mb-10">
          <ul className="text-md space-y-3">
            <li>
              <b>Smarter Decisions</b> - Actionable insights delivered through
              intuitive dashboards and advanced analytics.
            </li>
            <li>
              <b>Operational Agility</b> - Automated pipelines and cloud-native
              platforms that scale effortlessly.
            </li>
            <li>
              <b>Improved Efficiency</b> - Optimized data architectures that
              reduce complexity and boost performance.
            </li>
            <li>
              <b>Business Value</b> - Turning data into measurable outcomes that
              align with enterprise goals.
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-medium mb-3 text-gray-900">
          Proven Experience
        </h2>
        <div className="container bg-white mb-10 py-4">
          <p className="text-md">
            Our data engineering and BI expertise is trusted by global Fortune
            1000 clients, leading universities, government agencies, and
            innovative startups. From building enterprise data management
            platforms to enabling advanced analytics for semiconductor, telecom,
            and healthcare leaders, we deliver solutions that consistently drive
            value.
          </p>
        </div>
        <h2 className="text-3xl font-medium mb-3 text-gray-900">
          Case Studies & Solution Highlights:
        </h2>
      </div>
    </section>
  );
}
