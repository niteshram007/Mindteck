import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import { MainNavBar } from "@/app/navbar";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { varFade } from "@/lib/animate";
import ContactForm from "@/components/common-client-component/form";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/talent");

const HERO_IMAGE = "/assets/it-talent/hero-network.png";
const TALENT_MATCH_IMAGE = "/assets/it-talent/talent-match.png";
const BEYOND_STAFFING_IMAGE = "/assets/it-talent/beyond-staffing.jpg";
const BEYOND_RESUMES_IMAGE = "/assets/it-talent/beyond-resumes.jpg";
const BEYOND_BUSINESS_IMAGE = "/assets/it-talent/beyond-business.jpg";

const keyBenefitsLeft = [
  "Expert Talent Acquisition: Access to a vast network of pre-vetted IT professionals with diverse skill sets.",
  "Customized Solutions: Tailored staffing solutions to meet the specific needs of your projects and organizational culture.",
  "Rapid Deployment: Quick onboarding processes to ensure teams are up and running without delays.",
  "Continuous Training: Ongoing professional development through Mindteck Academy, ensuring our talent stays current with industry trends and technologies.",
  "Diversity and Inclusion: Commitment to sourcing diverse talent to foster innovation and varied perspectives within teams.",
];

const keyBenefitsRight = [
  "Cultural Fit Assessment: Focus on matching candidates not just by skills but also by aligning with your company's values and culture.",
  "Dedicated Support: Access to Consultant Care ambassadors who ensure employee satisfaction and project success.",
  "Scalability: Flexibility to scale your workforce up or down based on project demands and business needs.",
  "Proven Track Record: Successful partnerships with leading organizations across various industries.",
  "Advanced Technology Utilization: Leveraging cutting-edge recruitment tools and platforms to enhance the hiring process.",
];

const talentExpertiseLeft = [
  "Business Analyst: Currently one of the most sought-after positions, as companies need experts to translate complex business needs into technical requirements.",
  "Cybersecurity Engineer/Analyst: Demand remains critical due to the rising frequency of cyberattacks. These professionals are essential for protecting organizational data and systems.",
  "Cloud Architect/Engineer: As businesses continue migrating to the cloud, specialists who can design secure and scalable infrastructures on platforms like AWS, Azure, and Google Cloud are in high demand.",
  "DevOps Engineer: These roles act as the bridge between development and operations, focusing on the automation of software delivery and infrastructure management.",
  "Full-Stack Developer: Developers proficient in both front-end (user interface) and back-end (server-side logic) remain a top priority for companies building modern applications.",
];

const talentExpertiseRight = [
  "Data Engineer: Essential for building the pipelines that collect and process data, serving as the foundation for both traditional analytics and AI.",
  "UX/UI Product Designer: High demand persists for professionals who can create intuitive digital experiences, especially as mobile and web usage grows.",
  "Network Architect: One of the highest-paying roles, responsible for designing the complex data communication networks that serve as a company's backbone.",
  "IT Project Manager: Vital for overseeing large-scale technology initiatives and ensuring they are delivered on time and within budget.",
  "ERP Business Analyst: Specifically focused on Enterprise Resource Planning systems to streamline core business processes like finance and supply chain.",
];

const staffAugmentationPoints = [
  "Contract and Contract-to-Hire: Build your team with flexibility to meet evolving needs.",
  "Direct Hire: Bring in top talent that aligns with your organizational culture.",
  "Ongoing Relationship Management: Ensure alignment with your teams and objectives.",
  "Requirements Scoping: Tailored solutions that meet your workforce needs, budget, and timelines.",
  "Managed Services: Onsite, offsite, and offshore models customized for your implementation requirements.",
];

const samplePositionsColumns = [
  [
    "AI Engineer",
    "Machine Learning Operations Lead/Engineer",
    "Data Engineer",
    "AI Solutions Architect",
    "AI Agent Architect",
    "AI Security & Red Teaming Specialist",
  ],
  [
    "AI Ethics & Compliance Officer",
    "Prompt Interaction Designer",
    "Software & Web Development",
    "Mainframe Programming",
    "Enterprise Systems Analysis",
    "Business Analysis",
  ],
  [
    "Database Design and Administration",
    "Network Engineering",
    "Technical Support",
    "Quality Assurance & Testing",
    "Project Management",
    "Security",
  ],
];

export const revalidate = 300;

export default function ITTalentPage() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>

      <GeometricShapes />

      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />

        <div className="container">
          <div className="header-banner">
            <div className="relative overflow-hidden rounded-md bg-[#05191A]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(74.72% 335.28% at 17.4% 31.18%, #004730 0%, rgba(5, 25, 26, 0.92) 67.45%)",
                }}
              />
              <div className="relative grid grid-cols-12 items-stretch">
                <div className="col-span-12 lg:col-span-5 px-8 py-10 lg:px-10 lg:py-12 text-white">
                  <div className="flex h-full flex-col justify-center gap-5">
                    <motion.h1
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={varFade().inLeft}
                      className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal leading-tight"
                    >
                      AI-Ready Talent.
                      <br />
                      Precisely Matched.
                      <br />
                      Globally Deployed.
                    </motion.h1>
                    <hr className="border border-secondary w-full" />
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={varFade({ delay: 0.1 }).inLeft}
                      className="text-md max-w-[38ch]"
                    >
                      Delivering elite AI and ML professionals - expertly vetted, AI-matched, and
                      ready to scale your business worldwide.
                    </motion.p>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 min-h-[280px] md:min-h-[340px]">
                  <Image
                    width={1065}
                    height={524}
                    alt="Talent"
                    src={HERO_IMAGE}
                    className="h-full w-full object-cover max-h-[420px]"
                    priority
                    quality={78}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
              </div>
            </div>
          </div>

          <Breadcrumbs paths={["Services", "Talent"]} />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Talent
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#f7f8f8] text-black py-12">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="col-span-12 lg:col-span-7"
            >
              <h3 className="text-black text-3xl font-athelas font-normal leading-tight mb-4">
                Empowering businesses with future-ready AI talent.
              </h3>
              <p className="text-md mb-4">
                At Mindteck, our Talent services specialize in sourcing, vetting, and deploying
                top-tier professionals, with a dedicated focus on the high-demand AI and machine
                learning roles shaping the future of business. We leverage AI-powered recruitment
                tools to precisely match specialized skill sets with our clients' unique needs
                worldwide.
              </p>
              <p className="text-md">
                Beyond placement, we future-proof workforce capabilities through targeted AI and
                emerging tech training offered by Mindteck Academy. Whether you need individual AI
                architects or entire cross-functional teams-onsite, offsite, or offshore-our tailored
                services are designed to optimize your operations and drive successful outcomes in an
                AI-driven economy.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="col-span-12 lg:col-span-5"
            >
              <div className="rounded-sm bg-white p-0 shadow-sm border border-slate-200 overflow-hidden">
                <Image
                  width={635}
                  height={752}
                  src={TALENT_MATCH_IMAGE}
                  alt="Talent matching"
                  className="w-full h-auto"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-6 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 bg-[#f2f3f3] flex h-full flex-col">
              <div className="p-8 pb-5 flex-1">
                <h3 className="text-3xl font-athelas font-normal mb-4">Beyond Staffing</h3>
                <p className="text-md">
                  Since 1991, Mindteck has built a strong reputation for delivering exceptional
                  engineering value and talent to Fortune 50-1000 companies, startups, leading
                  universities, and government entities globally. We are committed to providing the
                  knowledge and expertise necessary to help our clients meet compliance requirements,
                  develop and test innovative products, automate systems, and secure skilled talent
                  that seamlessly integrates into their workplace.
                </p>
              </div>
              <Image
                width={767}
                height={435}
                src={BEYOND_STAFFING_IMAGE}
                alt="Beyond staffing"
                className="mt-4 w-full h-auto"
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="col-span-12 md:col-span-6 bg-[#f2f3f3] flex h-full flex-col">
              <div className="p-8 pb-5 flex-1">
                <h3 className="text-3xl font-athelas font-normal mb-4">Beyond Resumes</h3>
                <p className="text-md">
                  Our thoughtful approach to staffing begins with actively listening to your needs.
                  Our sales team identifies the essential technical and soft skills required,
                  followed by a strategic evaluation of how to deliver the best candidates.
                  Mindteck's ongoing investment in sourcing tools, recruiting staff, and proven
                  processes ensures we tap the right talent efficiently and cost-effectively.
                </p>
                <p className="text-md mt-4">
                  Our Consultant Care ambassadors maintain contact with newly deployed employees to
                  ensure their satisfaction and focus on delivering success in their projects. We go
                  beyond resumes to provide long-term value.
                </p>
              </div>
              <Image
                width={767}
                height={435}
                src={BEYOND_RESUMES_IMAGE}
                alt="Beyond resumes"
                className="mt-4 w-full h-auto"
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f8] py-12">
        <div className="container">
          <h3 className="text-3xl font-athelas font-normal mb-5">Key Benefits of Our Talent Services</h3>
          <div className="grid grid-cols-12 gap-8">
            <ul className="col-span-12 md:col-span-6 list-disc pl-6 space-y-2 text-md">
              {keyBenefitsLeft.map((item) => (
                <li key={item}>
                  <span className="font-semibold">{item.split(":")[0]}:</span> {item.split(":").slice(1).join(":").trim()}
                </li>
              ))}
            </ul>
            <ul className="col-span-12 md:col-span-6 list-disc pl-6 space-y-2 text-md">
              {keyBenefitsRight.map((item) => (
                <li key={item}>
                  <span className="font-semibold">{item.split(":")[0]}:</span> {item.split(":").slice(1).join(":").trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-6 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 bg-[#efefef]">
            <div className="col-span-12 md:col-span-7 p-8 md:p-12">
              <h3 className="text-3xl font-athelas font-normal mb-4">Beyond Business</h3>
              <p className="text-md">
                At Mindteck, we strive to accelerate our clients' growth and propel them forward.
                Our approach revolves around what is meaningful for our clients, ensuring they
                receive tangible value and an exceptional experience. Our solutions, flexibility in
                engagement, and commitment to relationships are supported by sound methodologies and
                top-level quality certifications. We genuinely care about your success.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <Image
                width={690}
                height={408}
                src={BEYOND_BUSINESS_IMAGE}
                alt="Beyond business"
                className="w-full h-full object-cover"
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f8] py-12">
        <div className="container">
          <h3 className="text-3xl font-athelas font-normal mb-4">Talent Expertise</h3>
          <p className="text-md mb-4">We offer skilled IT professionals in areas including:</p>
          <div className="grid grid-cols-12 gap-8">
            <ul className="col-span-12 md:col-span-6 list-disc pl-6 space-y-2 text-md">
              {talentExpertiseLeft.map((item) => (
                <li key={item}>
                  <span className="font-semibold">{item.split(":")[0]}:</span> {item.split(":").slice(1).join(":").trim()}
                </li>
              ))}
            </ul>
            <ul className="col-span-12 md:col-span-6 list-disc pl-6 space-y-2 text-md">
              {talentExpertiseRight.map((item) => (
                <li key={item}>
                  <span className="font-semibold">{item.split(":")[0]}:</span> {item.split(":").slice(1).join(":").trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 lg:col-span-7">
              <h3 className="text-3xl font-athelas font-normal mb-4">Staff Augmentation Services</h3>
              <ul className="list-disc pl-6 space-y-2 text-md">
                {staffAugmentationPoints.map((item) => (
                  <li key={item}>
                    <span className="font-semibold">{item.split(":")[0]}:</span> {item.split(":").slice(1).join(":").trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-5 rounded-3xl bg-[#8a7a4c] text-white p-8">
              <h4 className="text-3xl font-athelas font-normal mb-4">Engagement Highlights</h4>
              <p className="text-md mb-4">
                <span className="font-semibold">For a Fortune 50 hi-tech company:</span>
                <br />
                Onboarded and ramped up a team of over 50 resources within five weeks for an SAP
                integration project.
              </p>
              <p className="text-md mb-4">
                <span className="font-semibold">For a Fortune 500 IT services firm:</span>
                <br />
                Led a global data center migration of over 1,400 servers from 300 locations to
                three data centers worldwide.
              </p>
              <p className="text-md">
                <span className="font-semibold">For a $14 billion health insurance company:</span>
                <br />
                Delivered more than 70 resources as one of the top suppliers for onsite and offshore
                engagements within 12 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f8] py-12">
        <div className="container">
          <h3 className="text-3xl font-athelas font-normal mb-4">Sample Positions</h3>
          <p className="text-md mb-4">
            We specialize in filling various roles, including but not limited to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {samplePositionsColumns.map((column, columnIndex) => (
              <ul className="list-disc pl-6 space-y-2 text-md font-semibold" key={columnIndex}>
                {column.map((position) => (
                  <li key={position}>{position}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
