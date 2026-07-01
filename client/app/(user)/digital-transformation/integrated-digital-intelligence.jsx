import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";

const items = [
  {
    title: "AI-Powered Chatbots & Virtual Assistants",
    content:
      "Conversational AI for customer service, employee support, IT helpdesks, and domain-specific workflows.",
  },
  {
    title: "Document Intelligence & Automated Processing",
    content:
      "AI-driven extraction, classification, validation, and summarisation of documents across use cases like HR, finance, healthcare, legal, insurance, and operations.",
  },
  {
    title: "Machine Learning & Deep Learning Models",
    content:
      "Custom ML/DL algorithms for forecasting, anomaly detection, scoring engines, risk modelling, demand prediction, and optimisation.",
  },
  {
    title: "Data Engineering & AI-Ready Pipelines",
    content:
      "Clean, structured data flows enabling reliable training, inference, analytics, and continuous AI lifecycle management.",
  },

  {
    title: "Predictive & Prescriptive Intelligence",
    content:
      "Systems that anticipate issues, recommend actions, and support intelligent decision-making.",
  },
  {
    title: "Workflow Automation with AI Decision Engines",
    content:
      "Reducing manual effort while increasing accuracy, speed, and operational consistency.",
  },
];

export default function IntegratedDigitalIntelligence() {
  return (
    <section className="py-11 mb-4 bg-[#F7F8F8] font-inter">
      <div className="container">
        <motion.h2  initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft} className="text-3xl font-normal mb-6 text-gray-900">
          Integrated Digital Intelligence Enables
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {items.map((el, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade({ delay: 0.1 * index }).inUp}
              key={el.title}
            >
              <Card className="rounded-xl border-none shadow-sm h-full flex flex-col bg-white">
                <CardHeader className="py-3">
                  <CardTitle className="text-xl font-bold mb-0 text-secondary">
                    {el.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-md">
                    {el.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8 mt-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.1 }).inUp}
          >
            <Card className="rounded-xl border-none shadow-sm h-full flex flex-col bg-white">
              <CardHeader className="py-3">
                <CardTitle className="text-xl font-bold mb-0 text-secondary">
                  GenAI & LLM-Powered Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-md mb-2">
                  Integration of large language models for:
                </p>
                <ul className="text-md pl-4 list-disc space-y-1">
                  <li>Content generation</li>
                  <li>Text understanding</li>
                  <li>Summarisation</li>
                  <li>Semantic search</li>
                  <li>Custom-trained LLMs</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.2}).inUp}
          >
            <Card className="rounded-xl border-none shadow-sm h-full flex flex-col bg-white">
              <CardHeader className="py-3">
                <CardTitle className="text-xl font-bold mb-0 text-secondary">
                  Image, Video & Sensor Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-md mb-2">
                  AI models that analyse images, video feeds, and log/telemetry
                  data for:
                </p>
                <ul className="text-md pl-4 list-disc  space-y-1">
                  <li>Quality inspection</li>
                  <li>Pattern detection</li>
                  <li>Security monitoring</li>
                  <li>Behaviour analysis</li>
                  <li>Predictive maintenanc</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
