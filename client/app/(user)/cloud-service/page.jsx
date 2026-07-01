import FABanner from "@/app/assets/images/cloud/cloud-service.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/cloud-service");

export default function page() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>

      <GeometricShapes />

      {/* HEADER SECTION */}
      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />

        <div className="container">
          <div className="header-banner">
            <div className="grid grid-cols-12 items-stretch">
              <div
                className="col-span-12 sm:col-span-6 lg:col-span-4 py-5 px-10"
                style={{
                  background: "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex flex-col h-full justify-center gap-5">
                  <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    Empowering the Data Storage Ecosystem
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="Data Storage"
                  src={FABanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>

          <Breadcrumbs paths={["Cloud"]} />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Cloud
          </motion.h2>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="text-black pt-10 pb-20">
        <div className="container">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-black text-3xl font-athelas font-normal leading-tight mb-4"
          >
            Empowering the Data Storage Ecosystem with Scalable Engineering, AI-Driven Innovation & Platform Validation Expertise
          </motion.h3>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md mb-6"
          >
            At Mindteck, we collaborate with a broad spectrum of data storage technology companies - from fast-moving start-ups to Fortune 500
            leaders - in their mission to deliver solutions with exceptional scalability, seamless integration, enterprise-grade security, and
            rock-solid reliability. As the storage landscape evolves rapidly to meet the demands of cloud, AI, and data-centric
            architectures, we enable our clients to accelerate innovation and enhance competitiveness through engineering depth, domain
            expertise, and AI-driven transformation.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md mb-4"
          >
            With 20 years of experience, we bring a unique blend of <b>domain knowledge, hands-on engineering, and validation
            capabilities,</b> serving as a trusted partner for:
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md list-disc pl-5 space-y-2 mb-6"
          >
            <li><b>Hyperconverged Infrastructure (HCI)</b></li>
            <li><b>Enterprise/Datacenter Storage Platforms</b></li>
            <li><b>Storage Data Management Software</b></li>
            <li><b>Flash Storage Platforms and Testing</b></li>
            <li><b>End-to-End Storage Platform Development & Validation</b></li>
            <li><b>AI enable Infrastructure</b></li>
          </motion.ul>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md mb-8"
          >
            We help clients scale their engineering capacity with agility, allowing them to concentrate internal resources on next-gen
            architecture, GenAI integration, and strategic initiatives. Whether it's building new features, optimizing legacy systems, or
            validating performance at scale, our teams are engineered to deliver.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-black text-2xl font-semibold mb-4"
          >
            Our Differentiators:
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md list-disc pl-5 space-y-3 mb-8"
          >
            <li>
              <b>AI-Integrated Engineering:</b> We leverage AI/ML for intelligent test automation, predictive analytics, smart
              observability, and self-healing systems within storage platforms.
            </li>
            <li>
              <b>Flash & Performance Testing Expertise:</b> Proven capabilities in validating low-latency, high-throughput flash storage
              systems assuring performance, endurance, and reliability at scale.
            </li>
            <li>
              <b>Platform Development & Sustenance:</b> Experience across full lifecycle - architecture, development, QA automation, and
              long-term sustenance of distributed and cloud-native storage platforms.
            </li>
            <li>
              <b>Robust Quality Standards:</b> Aligned with ISO/CMMI best practices and a track record of delivering high-assurance
              engineering outcomes.
            </li>
            <li>
              <b>Knowledge Continuity:</b> Deep-rooted knowledge retention across long-term engagements, even with large teams, through
              structured documentation and mentoring systems.
            </li>
            <li>
              <b>Flexible Engagement Models:</b> Onsite, offshore, and hybrid setups supported across T&M, fixed-price, outcome-based, or
              dedicated team extensions, including seamless integration with captive centers.
            </li>
            <li>
              <b>Rapid Ramp-Up & Reliable Delivery:</b> Agile onboarding, proactive execution, and consistent delivery - on time and with
              quality.
            </li>
          </motion.ul>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-black text-2xl font-semibold mb-4"
          >
            Cloud Services
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade().inUp}
            className="text-md list-disc pl-5 space-y-4"
          >
            <li>
              Mindteck's Cloud Services are built around <b>data-first cloud transformation</b>, helping enterprises run business-critical
              workloads seamlessly across hybrid and multi-cloud environments. Our approach combines cloud-native engineering, deep storage
              and data management expertise, and strong operational rigor to deliver secure, scalable, and cost-optimized cloud solutions.
            </li>
            <li>
              A core differentiator of Mindteck is our advanced capabilities on <b>NetApp Cloud ecosystem</b>. We work extensively <b>with Cloud
              Volumes ONTAP</b> to design highly available, resilient, and performance-driven storage architectures on AWS, Azure, and Google
              Cloud. These solutions enable enterprises to run databases, enterprise applications, analytics, and file services in the cloud
              with the same reliability and data services they expect on-prem.
            </li>
            <li>
              Mindteck leverages <b>NetApp BlueXP</b> as a unified cloud operations and automation platform, enabling centralized visibility,
              governance, cost control, and lifecycle management of cloud data assets. Through BlueXP automation, policy-based tiering,
              backup, disaster recovery, and compliance controls, we help organizations simplify cloud operations while maintaining
              enterprise-grade control.
            </li>
            <li>
              For cloud-native and containerized workloads, Mindteck delivers end-to-end solutions enabling Kubernetes-aware data
              protection, application-consistent backups, disaster recovery, and workload mobility across clusters and clouds. This allows
              customers to confidently scale modern microservices architectures while ensuring data resilience and portability.
            </li>
            <li>
              Beyond implementation, Mindteck provides Cloud Operations, Automation, and Optimization services - often referred to as <b>Cloud
              Automation and CloudOps frameworks</b> - that integrate Infrastructure-as-Code, CI/CD pipelines, observability, and AI-driven
              insights. These capabilities help reduce manual intervention, improve operational efficiency, and proactively manage
              performance, capacity, and cloud spend.
            </li>
            <li>
              With deep domain knowledge in enterprise storage, cloud data platforms, and modern DevOps practices, Mindteck acts as a
              long-term cloud partner - helping organizations modernize faster, operate smarter, and extract maximum value from their
              NetApp-powered cloud investments.
            </li>
          </motion.ul>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
