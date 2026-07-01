import Banner from "../../assets/images/white-paper/banner.png";
import * as motion from "motion/react-client";
import ContactForm from "@/components/common-client-component/form";
import WhitePaperFlow from "../../assets/images/white-paper/white-paper-flow.png";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";

export default async function WhitePaper() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />
      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
      </section>

      <section>
        <div
          className="container p-0"
          style={{
            background:
              "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
          }}
        >
          <div className="grid grid-cols-1">
            <div className="">
              <Image
                width={1566}
                height={432}
                alt="iot"
                src={Banner.src}
                className="h-full w-full object-cover max-h-[432px]"
              />
            </div>
            <div className="py-5 px-10">
              <div className="text-white">
                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={varFade().inLeft}
                  className="text-4xl font-athelas mb-4"
                >
                  AI Driven AOI-based Wafer Defect Classification System
                </motion.h1>
                <p className="font-semibold ">Executive Summary</p>
                <p className="text-md text-justify mb-3">
                  Automated Optical Inspection (AOI) systems have become
                  indispensable in semiconductor wafer manufacturing, enabling
                  high-speed, high-resolution detection and classification of
                  wafer defects. The integration of advanced imaging
                  technologies with artificial intelligence (AI) and deep
                  learning (DL) techniques has significantly enhanced AOI
                  capabilities, improving defect detection accuracy,
                  classification precision, and throughput. This whitepaper
                  explores the architecture, methodologies, and benefits of
                  AOI-based wafer defect classification systems, emphasizing
                  AI-driven approaches for optimized semiconductor yield and
                  process control.
                </p>
                <p className="text-md text-justify mb-3">
                  This AI-driven solution supports Mindteck's objective of
                  delivering high-performance inspection systems tailored for
                  the semiconductor manufacturing industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-black pb-20">
        <div className="container bg-white pt-10 pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inLeft}
          >
            <h3 className="text-black text-2xl font-semibold">
              Problem Statement
            </h3>
            <p className="text-xl">Wafer Defects and Their Impact</p>
            <p className="text-md text-black my-4 text-justify">
              In semiconductor manufacturing, each wafer undergoes numerous
              complex processing steps, from deposition and lithography to
              etching and ion implantation. At every stage, there is a potential
              for defects to arise. These defects can manifest in various forms:
            </p>
            <ul className="text-md pl-4 list-disc mb-3 space-y-1">
              <li>
                <b>Pattern defects:</b> Missing, extra, or malformed circuit
                patterns.
              </li>
              <li>
                <b>Particle defects:</b> Contaminants (dust, debris) on the
                wafer surface.
              </li>
              <li>
                <b>Scratch defects:</b> Physical damage to the wafer.
              </li>
              <li>
                <b>Bridge defects:</b> Unintended connections between conductive
                lines.
              </li>
              <li>
                <b>Open defects:</b> Breaks in conductive lines.
              </li>
              <li>
                <b>Residue defects: </b>Unwanted material remaining after
                processing.
              </li>
              <li>
                <b>Structural defects:</b> Crystalline imperfections or
                delaminations.
              </li>
            </ul>
            <p className="text-md my-4 text-justify">
              The consequences of undetected or misclassified wafer defects are
              severe:
            </p>
            <ul className="text-md pl-4 list-disc mb-3 space-y-1">
              <li>
                <b>Significant Yield Loss:</b> Defective dies translate directly
                to reduced functional chips per wafer, drastically increasing
                per-chip cost.
              </li>
              <li>
                <b>Increased Rework and Scrap:</b> Imperfect wafers may require
                costly rework or, more often, are scrapped entirely, wasting
                valuable materials and processing time.
              </li>
              <li>
                <b>Delayed Time-to-Market:</b> Rework and retesting cycles
                extend production timelines, impacting a company's ability to
                capitalize on market opportunities.
              </li>
              <li>
                <b>Reliability Issues:</b> Subtle defects that pass initial
                inspection can lead to premature device failure in the field,
                damaging brand reputation and incurring warranty costs.
              </li>
              <li>
                <b>Inefficient Process Control:</b> Without accurate and timely
                defect classification, identifying the root cause of defects
                (e.g., equipment malfunction, process deviation, material
                impurity) becomes challenging, hindering effective process
                improvement.
              </li>
            </ul>
            <p className="text-md my-4 text-justify">
              Traditional manual visual inspection is slow, subjective, prone to
              human error, and incapable of detecting microscopic defects across
              an entire wafer. Older automated systems often struggle with the
              diversity and complexity of defect types, leading to high
              false-positive rates and limited classification accuracy.
            </p>
            <p className="text-2xl font-semibold my-3">
              Introduction to AOI in Semiconductor Wafer Inspection
            </p>
            <p className="text-md my-4 text-justify mb-3">
              Automated Optical Inspection (AOI) is a non-contact, high-speed
              visual inspection technology used extensively in semiconductor
              manufacturing to identify surface and pattern defects on wafers.
              AOI systems capture high-resolution images under various lighting
              conditions and analyze these images to detect anomalies that could
              impact yield and device performance.
            </p>
            <p className="text-md my-4 text-justify ">
              AOI serves as the first line of defence in quality control,
              inspecting wafers after critical process steps such as patterning,
              etching, and deposition. Unlike manual inspection, AOI operates at
              nanometer-scale precision, essential for modern semiconductor
              nodes with shrinking geometries and complex 3D structures.
            </p>
            <p className="text-2xl font-semibold mt-3 mb-1">
              AOI System Architecture and Workflow
            </p>
            <p className="text-xl mb-1">Image Acquisition</p>
            <p className="text-md text-justify ">
              AOI systems employ high-resolution cameras (up to 25 megapixels)
              mounted on precision stages to scan the wafer surface.
              Multispectral lighting (visible, UV, IR, polarized) is used to
              highlight different defect types, including particles, scratches,
              and topographical variations. Techniques like dark-field imaging
              enhance edge defect detection.
            </p>
            <p className="mt-3 mb-1 text-xl">Preprocessing and Alignment</p>
            <p className="text-md text-justify">
              Captured images undergo preprocessing to normalize brightness,
              reduce noise, and geometrically align with reference patterns or
              "golden units." This step ensures consistent comparison and
              accurate defect localization by correcting for wafer shifts,
              rotations, or warping.
            </p>
            <p className="mt-3 mb-1 text-xl">Defect Detection</p>
            <p>
              Defect detection combines rule-based algorithms and statistical
              models:
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                {" "}
                Pattern matching to identify deviations from expected shapes
              </li>
              <li>Edge detection for line breaks or mask misalignments</li>
              <li>
                Anomaly detection using statistical deviations to find unknown
                defects
              </li>
              <li>
                Morphological analysis for size, shape, and texture extraction
              </li>
            </ul>
            <p className="mt-3 mb-1 text-xl">Defect Classification</p>
            <p className="mb-2 text-md">
              Defect detection combines rule-based algorithms and statistical
              models:
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                Pattern matching to identify deviations from expected shapes
              </li>
              <li>Edge detection for line breaks or mask misalignments</li>
              <li>
                Anomaly detection using statistical deviations to find unknown
                defects
              </li>
              <li>
                Morphological analysis for size, shape, and texture extraction
              </li>
            </ul>

            <p className="text-2xl font-semibold mt-3 mb-1">
              AI and Deep Learning in AOI-Based Defect Classification
            </p>
            <p className="text-xl mb-1">AI-Driven Defect Analysis</p>
            <p className="text-md text-justify ">
              Modern AOI systems integrate AI to enhance detection and
              classification accuracy. AI models can differentiate between
              cosmetic and critical defects, reducing false positives and
              improving decision-making. Techniques include:
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li> Object detection for precise defect localization</li>
              <li>Segmentation to isolate defects from background</li>
              <li>
                Anomaly detection using unsupervised learning to identify novel
                defect types
              </li>
            </ul>

            <p className="text-xl my-2">
              Deep Neural Networks (DNN) for Wafer Defect Classification
            </p>
            <p className="text-md mb-2">
              Advanced deep learning models, such as ResNet, VGG, Inception,
              MobileNet or GoogLeNet architectures, have demonstrated
              state-of-the-art performance in classifying both single and mixed
              wafer defect patterns. These models achieve classification
              accuracies up to 99.9% by employing data augmentation techniques
              to address className imbalance and noise robustness.
            </p>
            <p className="text-md">
              Hybrid AI approaches combining Convolutional Neural Networks (CNN)
              and K-Nearest Neighbors (KNN) have shown breakthroughs in
              classification performance, reducing defect escape rates and
              improving inline AOI tool reliability.
            </p>
            <p className="text-2xl font-semibold mt-3 mb-1">
              Key Features of AI Driven AOI-Based Wafer Defect Classification
              Systems
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                <b>High-Resolution Imaging:</b>Sub-micron resolution imaging
                enables detection of the smallest defects.
              </li>
              <li>
                <b>Multispectral Lighting:</b>Enhances visibility of diverse
                defect types, including subsurface anomalies.
              </li>
              <li>
                <b>Automated Focus and Precision Stages:</b>Ensure consistent
                image quality across wafers.
              </li>
              <li>
                <b>Modular and Scalable Design:</b>Facilitates customization and
                upgradeability.
              </li>
              <li>
                <b>AI-Powered Classification:</b>Reduces manual intervention,
                improves accuracy, and accelerates throughput.
              </li>
              <li>
                <b>Traceability and Documentation:</b>Generates detailed defect
                maps with timestamps and severity scores for process control and
                auditability.
              </li>
              <li>
                <b>Automated Material Handling:</b>Integration with robotic arms
                for seamless wafer transfer during inspection.
              </li>
            </ul>

            <p className="text-2xl font-semibold mt-3 mb-1">
              Benefits of AI Driven AOI-Based Wafer Defect Classification
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                <b>Yield Improvement: </b>Early detection and accurate
                classification prevent defective wafers from progressing,
                reducing scrap rates.
              </li>
              <li>
                <b>Increased Throughput: </b>Automated analysis reduces Manual
                Inspection effort by 75% - 90% without compromising quality.
              </li>
              <li>
                <b>Process Control Enablement: </b>Defect data feeds into
                Statistical Process Control (SPC) and Yield Management Systems
                (YMS) to identify trends and root causes.
              </li>
              <li>
                <b>Reduced False Positives: </b>AI classification minimizes
                unnecessary rework and inspection cycles.
              </li>
              <li>
                <b>Adaptability: </b>Continuous learning AI models adapt to new
                defect patterns and process changes, maintaining inspection
                relevance in evolving manufacturing environments.
              </li>
              <li>
                <b>Cost Efficiency:</b> Reduces manpower needs for visual
                inspection while improving overall inspection accuracy.
              </li>
            </ul>

            <p className="text-2xl font-semibold mt-3 mb-1">
              Applications and Use Cases
            </p>
            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                <b>Front-End Wafer Inspection:</b>Detecting pattern defects
                post-lithography and etching.
              </li>
              <li>
                <b>Back-End Packaging Inspection:</b>Ensuring integrity during
                wafer-level packaging and singulated package inspection.
              </li>
              <li>
                <b>Post-Saw Inspection:</b>Identifying sawing-induced surface
                defects.
              </li>
              <li>
                <b>3D Structure Inspection:</b>Detecting topographical defects
                such as dishing and erosion using 3D AOI techniques.
              </li>
            </ul>

            <img
              src={WhitePaperFlow.src}
              alt="white-paper"
              className="w-full h-full"
            />
            <h2 className="text-2xl font-semibold mt-3 mb-1">
              Technology Stack
            </h2>
            <p className="text-md my-3">
              This section outlines the key technologies used in building the
              wafer defect classification system. It includes tools for image
              processing, machine learning, model deployment, integration, and
              visualization. The stack ensures performance, scalability, and
              seamless factory integration.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-200 text-left text-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-3 py-2">
                      Component
                    </th>
                    <th className="border border-gray-200 px-3 py-2">
                      Technologies Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Image Processing
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      OpenCV, scikit-image
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Learning Frameworks
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      PyTorch, TensorFlow, Keras
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Model Deployment
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      ONNX, TorchServe, TensorRT, MLflow, GoogleNet
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Deployment Platform
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      NVIDIA GPU, Triton Inference Server
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Integration
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      REST APIs, Kafka, MES/SCM systems
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Visualization
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      Streamlit, Plotly Dash, Grafana
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mt-3 mb-1">
              Deployment Strategy
            </h2>
            <p className="text-md mb">
              The deployment approach ensures real-time performance and
              flexibility across different environments. It supports edge
              deployment for low-latency inference and cloud integration for
              scalable model management. Automation through CI/CD (MLOps)
              enables continuous improvements without hindering production.
            </p>

            <ul className="text-md pl-4 list-disc space-y-1">
              <li>
                <strong>Edge Deployment:</strong> Real-time classification on
                in-fab GPU devices.
              </li>
              <li>
                <strong>Cloud/Hybrid:</strong> Model management and retraining
                pipeline hosted on cloud.
              </li>
              <li>
                <strong>CI/CD:</strong> Automated retraining, testing, and
                deployment workflows.
              </li>
              <li>
                <strong>API Integration:</strong> Connects with factory
                automation, MES, SPC, and FDC systems.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-3 mb-1">
              Challenges and Mitigation
            </h2>
            <p className="text-md my-3">
              Deploying a machine learning - based AOI system presents both
              technical and operational challenges. This section addresses
              common obstacles such as className imbalance, noise, and
              integration complexity. Proven mitigation strategies are listed to
              ensure system reliability and adaptability.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-200 text-left text-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-3 py-2">
                      Challenge
                    </th>
                    <th className="border border-gray-200 px-3 py-2">
                      Mitigation Strategy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Class imbalance
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      Data augmentation, synthetic oversampling
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Image noise
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      Noise filtering and robust preprocessing
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      Model drift
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      Scheduled retraining using feedback loops
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">
                      System integration
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      API-first architecture and modular design
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mt-3 mb-1">Conclusion</h2>
            <p className="text-md mb">
              Mindteck offers this AI-driven AOI-based wafer defect
              classification system as a high-value solution in its
              semiconductor service portfolio. The system can be customized for
              client-specific inspection criteria, integrated into factory
              automation pipelines, and scaled across multiple fabs.
            </p>

            <h2 className="text-2xl font-semibold mt-3 mb-1">Glossary</h2>
            <ul className="text-md pl-4 list-disc space-y-1 mb-4">
              <li>
                <strong>AOI:</strong> Automated Optical Inspection
              </li>
              <li>
                <strong>AI:</strong> Artificial Intelligence
              </li>
              <li>
                <strong>CNN:</strong> Convolutional Neural Network
              </li>
              <li>
                <strong>KNN:</strong> K-nearest Neighbors
              </li>
              <li>
                <strong>SPC:</strong> Statistical Process Control
              </li>
              <li>
                <strong>YMS:</strong> Yield Management System
              </li>
              <li>
                <strong>3D AOI:</strong> Three-Dimensional Automated Optical
                Inspection
              </li>
            </ul>

            <div className="text-sm text-gray-500 mt-4 border-t pt-2">
              <p>
                Published Date: <strong>July 14, 2025</strong>
              </p>
              <p>
                Authors: <strong>Arindam Dutta & Tanmay Mondal</strong>
              </p>
              <p>
                Co-Author: <strong>Saibal Dey</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
