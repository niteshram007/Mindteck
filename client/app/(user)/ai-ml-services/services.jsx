import AgenticAI from "@/app/assets/images/ai-ml/Agentic-AI.png";
import DataAnalytics from "@/app/assets/images/ai-ml/Data-Analytics.png";
import ComputerVisionNLP from "@/app/assets/images/ai-ml/Computer-Vision-NLP.png";
import GenerativeAI from "@/app/assets/images/ai-ml/Generative-AI.png";
import LLMAgnostic from "@/app/assets/images/ai-ml/LLM-Agnostic.png";
import MLOpsTrustworthyAI from "@/app/assets/images/ai-ml/MLOps-Trustworthy-AI.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Image from "next/image";
const services = [
  {
    title: "Data Analytics",
    content:
      "Make smarter, data-driven decisions with intelligent analytics and advanced modeling.",
    image: DataAnalytics,
  },
  {
    title: "Computer Vision & NLP",
    content:
      "Enhance operations with cutting-edge computer vision and Natural Language Processing (NLP), including behavior analysis, object tracking, and voice-enabled technologies.",
    image: ComputerVisionNLP,
  },
  {
    title: "LLM-Agnostic",
    content:
      "Seamlessly integrate with all major LLMs and SLMs - both proprietary and open-source - including Azure OpenAI, Google Gemini, Phi, Llama, and more.",
    image: LLMAgnostic,
  },
  {
    title: "Generative AI",
    content:
      "Unlock creative possibilities with multimedia, text, and speech-based solutions powered by generative models.",
    image: GenerativeAI,
  },

  {
    title: "Agentic AI",
    content:
      "Enable autonomous, task-driven AI agents for greater operational efficiency.",
    image: AgenticAI,
  },
  {
    title: "MLOps & Trustworthy AI",
    content:
      "Streamline AI/ML lifecycles with robust MLOps, ensuring trustworthiness, explainability, and ethical compliance.",
    image: MLOpsTrustworthyAI,
  },
];

export default function Services() {
  return (
    <section className="pt-4 pb-11 mb-4 bg-white font-inter">
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
          With optimized data strategies, empowered decision-making, and
          AI-driven
          <br /> innovation, we'll help your business achieve unparalleled
          success.
        </p>
      </div>
    </section>
  );
}
