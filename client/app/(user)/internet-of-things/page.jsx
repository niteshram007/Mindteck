import IOTBanner from "../../assets/images/iot/iot-banner.png";
import IOT from "../../assets/images/iot/why-iot.png";
import AIPoweredIOT from "../../assets/images/iot/ai-powered-iot.png";
import CoreExpertise from "../../assets/images/iot/core-expertise.png";
import IOTPlatforms from "../../assets/images/iot/iot-platforms.png";
import IOTSolutions from "../../assets/images/iot/iot-targeted-solutions.png";
import ClientAdvantage from "../../assets/images/iot/client-advantage.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/internet-of-things");

export default function InternetOfThings() {
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />
      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div className="header-banner">
            <div className="grid grid-cols-12 items-stretch align-middle">
              <div
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-10"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex-col flex h-full justify-center  gap-5">
                  <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-white leading-tight"
                  >
                    Unlocking the Future <br />
                    with Advanced IoT
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    Connect. Innovate. Transform.
                  </motion.p>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={IOTBanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Internet of Things"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Internet of Things
          </motion.h2>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-7 col-span-12"
            >
              <h3 className="text-black text-3xl font-athelas font-normal leading-tight mb-4">
                Unlocking the Future with Advanced IoT Solutions
              </h3>
              <p className="text-md italic mb-5">
                Connect. Innovate. Transform.
              </p>

              <p className="text-md text-black">
                At Mindteck, we don't just connect devices; we engineer
                intelligent ecosystems that drive unprecedented efficiency,
                insight, and competitive advantage for your business. The
                Internet of Things (IoT) is rapidly evolving, and we are at the
                forefront, leveraging the latest technological advancements to
                deliver scalable, secure, and future-proof solutions.
              </p>
            </motion.div>
            <div className="sm:col-span-5 col-span-12 md:mt-0 mt-5">
              <MotionContainer
                containerProps={{ delay: 0.4, staggerIn: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="rounded-3xl text-center shadow-none border-none pt-5 bg-primary text-white">
                  <CardContent>
                    <motion.h2
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className=" text-3xl font-athelas mb-2"
                    >
                      Why IoT, and Why Now?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 "
                    >
                      The convergence of cutting-edge technologies like AI, 5G,
                      Edge Computing, and Digital Twins is revolutionizing how
                      industries operate. Businesses that embrace advanced IoT
                      solutions are gaining real-time visibility, optimizing
                      operations, and creating new revenue streams. Don't be
                      left behind in the digital transformation - partner with
                      Mindteck to harness the full potential of IoT.
                    </motion.p>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src={IOT.src}
                        width={"587"}
                        height={"290"}
                        alt="success-story"
                        className="mt-2 m-auto"
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </MotionContainer>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade().inUp}
          className="text-3xl font-norma mb-3"
        >
          Our Next-Generation IoT Capabilities
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
          className="text-md"
        >
          Mindteck's comprehensive IoT services are built on a foundation of
          deep domain expertise and a commitment to innovation. We offer
          end-to-end solutions, from strategy and consulting to deployment and
          ongoing management, powered by the latest trends:
        </motion.p>
      </div>
      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-1">
                AI-Powered IoT & Machine Learning:
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Predictive Analytics & Maintenance:
                  </span>{" "}
                  Move beyond reactive fixes. Our AI/ML-driven IoT solutions
                  analyze real-time sensor data to predict equipment failures,
                  optimize maintenance schedules, and significantly reduce
                  downtime and operational costs.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Automated Decision-Making:
                  </span>{" "}
                  Empower your systems to learn and adapt. We integrate AI into
                  your IoT infrastructure for intelligent automation, optimizing
                  processes, resource allocation, and delivering personalized
                  experiences.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Anomaly Detection:
                  </span>{" "}
                  Proactively identify unusual patterns and potential issues
                  across your connected assets, enhancing security and
                  operational stability.
                </li>
              </ul>
              <h3 className="text-secondary font-bold text-xl mb-1">
                Edge Computing & Connectivity:
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Real-time Insights at the Edge:
                  </span>{" "}
                  Process data closer to the source with our edge computing
                  solutions, enabling ultra-low latency decision-making crucial
                  for applications like autonomous systems, industrial
                  automation, and real-time security.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Unleashed Connectivity:
                  </span>{" "}
                  Leverage the speed, bandwidth, and reliability of Wireless
                  connectivity for massive IoT deployments, enabling seamless
                  communication for high-volume data transfer and
                  mission-critical applications.
                </li>
              </ul>

              <h3 className="text-secondary font-bold text-xl mb-1">
                Robust IoT Security:
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Security by Design:
                  </span>{" "}
                  With an increasing number of connected devices, security is
                  paramount. We embed robust cybersecurity measures from the
                  ground up, including advanced encryption, secure communication
                  protocols, and proactive threat detection to protect your data
                  and infrastructure.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 col-span-12 text-center md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={AIPoweredIOT.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 col-span-12 text-center"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={CoreExpertise.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <p className="text-black text-2xl mb-3 font-normal">
                Our Core Expertise: Seamless Device Connectivity
              </p>
              <p className="text-md mb-3">
                Connecting diverse devices, sensors, and equipment reliably and
                securely is the bedrock of any successful IoT implementation.
                Mindteck possesses deep expertise in a wide array of
                connectivity technologies and protocols to ensure your data
                flows seamlessly from the edge to the cloud and back:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Wireless Protocols:
                  </span>{" "}
                  Our proficiency spans industry standards like Wi-Fi, Bluetooth
                  (BLE), LoRaWAN, Zigbee, Z-Wave, NB-IoT, LTE-M, 5G, and other
                  cellular technologies. We guide you in selecting the optimal
                  connectivity for various use cases, ranging from short-range
                  personal area networks to wide-area industrial deployments.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Wired Protocols:
                  </span>{" "}
                  We are expert in integrating industrial protocols such as
                  Modbus, OPC UA, BACnet, PROFINET, Ethernet/IP, and CAN Bus for
                  robust and high-speed industrial IoT and automation.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Sensor Integration:
                  </span>{" "}
                  Extensive experience in integrating a vast range of sensors
                  (temperature, humidity, pressure, motion, GPS, accelerometers,
                  gyroscopes, environmental, proximity, vision-based sensors,
                  etc.) to collect precise and relevant data from your physical
                  assets and environments.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Gateway Development & Management:
                  </span>{" "}
                  Design and deploy intelligent IoT gateways, including both
                  hardware and software, that aggregate data from multiple
                  devices, perform essential edge processing and analytics, and
                  securely transmit filtered or raw information to the cloud or
                  on-premise systems.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Firmware & Embedded Systems:
                  </span>{" "}
                  Deep understanding of embedded systems development, enabling
                  us to optimize device firmware for low power consumption,
                  secure boot, over-the-air (OTA) updates, and efficient data
                  communication.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <p className="text-black text-2xl font-normal mb-3">
                Leading IoT Platform Expertise
              </p>
              <p className="text-md mb-3">
                Mindteck leverages industry-leading IoT platforms to build
                robust, scalable, and secure solutions. Our deep expertise spans
                multiple cloud providers, offering you flexibility and choice:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li className="font-semibold">AWS IoT</li>
                <li className="font-semibold">Azure IoT</li>
                <li className="font-semibold">
                  Google Cloud IoT (and other Google Cloud IoT services):
                </li>
                <li className="font-semibold">
                  Other Platforms & Custom Solutions:
                  <ul className="text-md pl-4 list-disc">
                    <li className="font-normal">
                      While we specialize in leading cloud platforms, we also
                      have experience with open-source IoT platforms like
                      ThingsBoard and can develop custom IoT platforms tailored
                      to highly specific business requirements or on-premise
                      deployments, ensuring maximum flexibility and control.
                    </li>
                  </ul>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={IOTPlatforms.src}
                  alt="iot-platforms"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={IOTSolutions.src}
                  alt="success-story"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12"
            >
              <p className="text-black font-normal text-2xl mb-3">
                Targeted Solutions for Key Industries
              </p>
              <p className="text-md mb-3">
                Mindteck's deep industry knowledge allows us to tailor IoT
                solutions that address your specific challenges and
                opportunities:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Manufacturing (Industry 4.0):
                  </span>{" "}
                  Optimize production lines, enable predictive maintenance for
                  machinery, enhance supply chain visibility, and improve
                  quality control with IIoT (Industrial IoT) solutions.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Energy & Utilities:
                  </span>{" "}
                  Implement smart grid solutions, intelligent lighting,
                  efficient building management systems, and advanced meter
                  infrastructure for enhanced energy conservation and
                  operational efficiency.
                </li>
                <li>
                  <span className="font-semibold text-sm">Healthcare:</span>{" "}
                  Revolutionize patient care with remote patient monitoring,
                  smart medical devices, asset tracking within hospitals, and
                  real-time diagnostics.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Smart Cities & Infrastructure:
                  </span>{" "}
                  Develop intelligent transportation systems, smart parking
                  solutions, environmental monitoring, and connected public
                  services for safer, more sustainable urban environments.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Building Automation:
                  </span>{" "}
                  Transform commercial and residential spaces into intelligent
                  environments. Our IoT solutions enable:
                  <ul className="text-md pl-4 list-disc space-y-1">
                    <li>
                      <span className="font-semibold text-sm">
                        Smart HVAC Optimization:
                      </span>{" "}
                      Real-time monitoring and automated control of heating,
                      ventilation, and air conditioning systems for energy
                      efficiency and occupant comfort.
                    </li>
                    <li>
                      <span className="font-semibold text-sm">
                        Advanced Lighting Control:
                      </span>{" "}
                      Dynamic lighting adjustments based on occupancy, natural
                      light, and time of day, significantly reducing energy
                      consumption.
                    </li>
                    <li>
                      <span className="font-semibold text-sm">
                        Occupancy Management:
                      </span>{" "}
                      Optimize space utilization, manage crowd flow, and enhance
                      security through integrated sensor data.
                    </li>
                    <li>
                      <span className="font-semibold text-sm">
                        {" "}
                        Predictive Maintenance for Building Systems:
                      </span>{" "}
                      Monitor elevators, escalators, plumbing, and electrical
                      systems to anticipate failures and streamline maintenance.
                    </li>
                    <li>
                      <span className="font-semibold text-sm">
                        Enhanced Security & Access Control:
                      </span>{" "}
                      Integrate smart locks, surveillance systems, and visitor
                      management for robust building security.
                    </li>
                  </ul>
                </li>

                <li>
                  <span className="font-semibold text-sm">
                    {" "}
                    Connected Assets & Logistics:
                  </span>{" "}
                  Gain real-time tracking, remote diagnostics, and optimized
                  fleet management for assets across various sectors, improving
                  efficiency and reducing operational costs.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-11 mb-4">
        <div className="container">
          <div className="grid grid-cols-12 sm:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-black font-normal text-2xl mb-3">
                The Mindteck Advantage for New Clients
              </h3>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Proven Expertise, Future-Ready Vision:
                  </span>{" "}
                  Benefit from our decades of experience in product engineering
                  and IT services, combined with a relentless focus on next-gen
                  IoT technologies.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    ROI-Driven Solutions:
                  </span>{" "}
                  We prioritize delivering measurable business value. Our
                  solutions are designed to provide clear ROI through cost
                  savings, increased efficiency, and new revenue opportunities.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    End-to-End Partnership:{" "}
                  </span>
                  From initial consultation and ideation to seamless deployment
                  and ongoing support, we are your trusted partner every step of
                  the way.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Security & Scalability:
                  </span>{" "}
                  Our solutions are built with robust security frameworks and
                  designed for seamless scalability to grow with your business
                  needs.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Global Reach, Local Support:
                  </span>{" "}
                  With offices and development centers worldwide, we offer both
                  global expertise and localized support.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={ClientAdvantage.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="text-black pt-10 pb-20 success-story text-center ">
        <SuccessStory />
      </section>
      <ContactForm />
    </div>
  );
}
