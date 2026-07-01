import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";

export const aiAndDataFramework = [
  {
    title: "Data & AI Readiness Assessment",
    description:
      "We evaluate your data landscape across quality, governance, accessibility, and maturity.\n\nThis ensures your systems have the foundational strength needed for AI adoption at scale.\nWe assess how AI can integrate with your current platforms and data sources.",
  },
  {
    title: "Unified Data Engineering & Integration",
    description:
      "We build reliable, scalable data pipelines that unify data from applications, documents, logs, devices, and external systems. These pipelines ensure clean, high-quality data flow for analytics, ML training, and real-time inference. This becomes the foundation for embedding intelligence into both modern and legacy environments.",
  },
  {
    title: "AI Opportunity Mapping",
    description:
      "We identify high-impact AI use cases such as chatbots, document intelligence, forecasting, anomaly detection, and GenAI features. Each opportunity is assessed for feasibility, and alignment with current business workflows. This ensures AI is applied where it enhances real operations - not as isolated experiments.",
  },
  {
    title: "AI Architecture & Modernisation",
    description:
      "We design scalable AI architecture including ML/DL pipelines, LLM strategies, and inference environments.\n\nThis architecture supports modular AI components that can be deployed independently or as part of larger systems.\nIt ensures the organisation has an extensible foundation that evolves with future AI advancements.",
  },
  {
    title: "Model Development & Integration",
    description:
      "We develop and train ML, Deep Learning, GenAI, and LLM-driven models for a variety of structured and unstructured data types.Models are fine-tuned for accuracy, relevance, and performance across real-world scenarios.\n\nWe then integrate these models directly into applications, workflows, and business processes.",
  },
  {
    title: "AI-Enabled Automation & Intelligence",
    description:
      "We embed AI to enhance decision-making, automate repetitive tasks, and improve accuracy across operations.\n\nThis includes predictive models, intelligent routing, semantic understanding, and personalised user experiences.\n\nThe result is a smarter, more efficient digital ecosystem that continuously improves based on data.",
  },
  {
    title: "Integration Into Existing Systems & Workflows",
    description:
      "We integrate AI models directly into your existing systems - legacy or modern - using APIs, microservices, and event-driven triggers.\n\nAI enhancements plug into current workflows without requiring major rewrites or platform replacement.\n\nThe existing applications gain predictive, generative, and automated intelligence with minimal friction.",
  },
  {
    title: "Deployment, Monitoring & Continuous Learning",
    description:
      "We deploy AI using enterprise-grade MLOps pipelines for automated retraining, model updates, and drift detection.\n\nPerformance is monitored across accuracy, reliability, response time, and real-world behaviour.\n\nThis ensures AI systems stay relevant, adaptive, and high-performing over time.",
  },
];

export default function DigitalIntelligence() {
  return (
    <section className="py-11 mb-4 bg-[#F7F8F8] font-inter">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inLeft}
          className="text-3xl font-normal mb-4 text-gray-900"
        >
          DIGITAL INTELLIGENCE (AI) FRAMEWORK
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={varFade().inLeft}
          className="text-md mb-10"
        >
          Our Digital Intelligence Framework enables organisations to augment
          their transformation or modernisation journey with AI-powered
          accuracy, automation, prediction, and deep insights turning digital
          systems into intelligent, data-driven platforms.
          <br />
          <br />
          This framework integrates seamlessly with both our Digital
          Transformation and Digital Modernisation frameworks, enabling
          organisations to scale their digital journey with advanced AI-powered
          intelligence.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-8">
          {aiAndDataFramework.map((el, index) => (
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
                <CardContent>
                  <p className="text-gray-700 text-md whitespace-pre-line">
                    {el.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
