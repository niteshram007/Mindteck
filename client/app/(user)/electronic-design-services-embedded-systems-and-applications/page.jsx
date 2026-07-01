import EDSbanner from "../../assets/images/eds/eds-banner.png";
import WhyChoose from "../../assets/images/eds/why-choose-us.png";
import ElectricalPowerDesign from "../../assets/images/eds/electrical-design-power.png";
import FPGADesign from "../../assets/images/eds/fpga-design.png";
import HardwareDesign from "../../assets/images/eds/hardware-design.png";
import PLCSystemControl from "../../assets/images/eds/plc-industry-control-system.png";
import RVV from "../../assets/images/eds/rigorous-verification-validation.png";
import * as motion from "motion/react-client";
import Breadcrumbs from "../Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/common-client-component/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import SuccessStory from "@/components/success-story";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/electronic-design-services-embedded-systems-and-applications");

export default function EDSApplication() {
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
                    Embedded Intelligence, <br />
                    Engineered for Excellence
                  </motion.h1>
                  <hr className="border border-secondary w-full" />
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="text-md text-white"
                  >
                    End-to-end embedded design services powering smarter,
                    connected products.
                  </motion.p>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <Image
                  width={1065}
                  height={524}
                  alt="iot"
                  src={EDSbanner.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Embedded Design Services"]} />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary mb-3"
          >
            Embedded Design Services
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
                Empowering the Future with Advanced Solutions
              </h3>
              <p className="text-md italic mb-5">
                Mindteck - Innovating at the Edge, Delivering Intelligence
                Everywhere.
              </p>

              <p className="text-md text-black">
                In today's rapidly evolving technological landscape, embedded
                systems are the silent architects of innovation, powering
                everything from smart devices to mission-critical industrial
                applications. At Mindteck, we specialize in delivering
                cutting-edge Electronic Design Services that transform visionary
                concepts into robust, intelligent, and secure embedded
                solutions. With deep expertise spanning the entire product
                lifecycle, we empower businesses to navigate complexity,
                accelerate time-to-market, and achieve unparalleled performance
                in a connected world.
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
                      Why Mindteck for Your Embedded Journey?
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="text-xs leading-5 "
                    >
                      We combine decades of engineering excellence with a
                      forward-thinking approach, ensuring your products are not
                      just functional but also future-proof. Our commitment to
                      innovation, quality, and client success makes us the ideal
                      partner for your next embedded system development.
                    </motion.p>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src={WhyChoose.src}
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
          Our Comprehensive Embedded Systems and Electronic Design Services:
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.3 }).inUp}
          className="text-md"
        >
          Mindteck provides end-to-end product engineering support, from initial
          ideation and prototyping to full-scale manufacturing readiness,
          alongside ongoing feature enhancement and technology modernisation.
          Our expertise in advanced embedded technologies enables us to craft
          customised solutions that meet stringent market demands and
          performance expectations.
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
                Advanced Embedded Hardware Design
              </h3>
              <p className="text-md">
                Leverage our expertise to build the foundation of your
                intelligent products:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    High-Performance & Low-Power Architectures:
                  </span>{" "}
                  Designing systems optimized for efficiency, battery life, and
                  demanding computational tasks.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Next-Gen Microcontroller & Processor Integration:
                  </span>{" "}
                  Specializing in ARM Cortex-M/R/A, RISC-V, DSPs, and
                  AI/ML-enabled SoCs for intelligent edge computing.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    High-Speed PCB Design:
                  </span>{" "}
                  Multi-layer board design with meticulous attention to signal
                  integrity, power distribution, and compact form factors.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Sensor & Actuator Interfacing:
                  </span>{" "}
                  Seamless integration of complex sensor arrays (e.g., LiDAR,
                  RADAR, biosensors) and precision actuators.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Power Management Solutions:
                  </span>{" "}
                  Designing efficient power delivery networks (PDN) for optimal
                  energy consumption and extended device lifespan.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Design for Manufacturability (DFM) & Testability (DFT):{" "}
                  </span>
                  Ensuring cost-effective production and streamlined testing
                  processes
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
                  src={HardwareDesign.src}
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
          <div className="grid grid-cols-12 sm:gap-10 gap-2 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="sm:col-span-7 col-span-12"
            >
              <h3 className="text-secondary text-xl mb-3 font-bold">
                Cutting-Edge Embedded Firmware & Software Development
              </h3>
              <p className="text-md">
                Bring your hardware to life with intelligent, secure, and
                responsive software:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Real-Time Operating Systems (RTOS) & Bare-Metal Development:
                  </span>{" "}
                  Expertise in FreeRTOS, Zephyr, VxWorks, and custom bare-metal
                  implementations for deterministic performance.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Embedded Linux & Android Capabilities:
                  </span>{" "}
                  Developing robust applications and system software for
                  embedded Linux platforms, including custom kernel development,
                  bootloaders, and user-space applications for complex embedded
                  systems and HMI solutions.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Edge AI/ML Integration:
                  </span>{" "}
                  Deploying neural network inference models directly on embedded
                  devices for real-time analytics and intelligent
                  decision-making.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Secure Boot & Firmware Over-the-Air (FOTA) Updates:
                  </span>{" "}
                  Implementing robust security mechanisms and enabling seamless,
                  secure remote firmware upgrades.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Advanced Communication Protocols:
                  </span>{" "}
                  Developing solutions for high-speed (Ethernet, USB 3.0),
                  wireless (Wi-Fi 6, Bluetooth 5.x, LoRaWAN, NB-IoT, 5G), and
                  industrial protocols (CAN-FD, EtherCAT, PROFINET).
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Device Driver Development:
                  </span>{" "}
                  Custom drivers for intricate peripherals, communication
                  interfaces, and specialized hardware.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Middleware & Application Layer Development:
                  </span>{" "}
                  Building robust software stacks for complex device
                  functionalities and user interactions.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-5 col-span-12"
            >
              <div className="bg-secondary text-white px-3 py-7 rounded-xl">
                <p className="text-3xl font-normal font-athelas mb-3 text-center">
                  Transforming Industries with Embedded Intelligence
                </p>
                <p className="text-md">
                  Mindteck's solutions drive innovation across diverse sectors,
                  including:
                </p>
                <ul className="text-md pl-4 list-disc space-y-2">
                  <li>
                    <span className="text-sm font-semibold">
                      Medical Devices:{" "}
                    </span>
                    Wearable health tech, diagnostic equipment, remote patient
                    monitoring.
                  </li>
                  <li>
                    <span className="text-sm font-semibold">Semicon:</span>{" "}
                    Capital Equipment Manufacturer, Design House, Fabs
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      Instrumentation:
                    </span>{" "}
                    Analytical Instruments, Test and Measurement, Data
                    Acquisition
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      Energy & Building Automation:
                    </span>{" "}
                    Smart grids, energy management systems, HVAC control, smart
                    lighting, access control, and security systems.
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      Industrial Automation:
                    </span>{" "}
                    Smart factories, predictive maintenance, robotics, edge
                    control
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      Consumer Electronics:
                    </span>{" "}
                    Smart home devices, wearables
                  </li>
                </ul>
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={PLCSystemControl.src}
                  alt="iot-platforms"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12 md:order-1 order-2"
            >
              <h3 className="text-secondary text-xl font-bold mb-3">
                PLC & Industrial Control Systems
              </h3>
              <p className="text-md">
                Drive automation and efficiency with our specialized expertise:
                multiple cloud providers, offering you flexibility and choice:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    PLC Programming & Configuration:
                  </span>{" "}
                  Developing, programming, and configuring Programmable Logic
                  Controllers (PLCs) for automated control systems, including
                  ladder logic, structured text, and function block diagrams.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    HMI/SCADA Integration:
                  </span>{" "}
                  Designing and implementing Human-Machine Interfaces (HMI) and
                  Supervisory Control and Data Acquisition (SCADA) systems for
                  intuitive monitoring and control.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Industrial Networking:
                  </span>{" "}
                  Expertise in industrial communication protocols such as
                  Modbus, PROFINET, EtherNet/IP, and OPC UA.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Process Automation:
                  </span>{" "}
                  Creating intelligent control solutions for complex industrial
                  processes, optimizing performance and reducing downtime.
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
              variants={varFade().inRight}
              className="sm:col-span-9 col-span-12 sm:order-1 order-2"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                Electrical Design & Power Systems
              </h3>
              <p className="text-md">
                Ensuring reliable and safe electrical integration for your
                products:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Power Supply Design:
                  </span>{" "}
                  Developing stable and efficient power supply units (PSUs) for
                  various applications.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Wiring Harness Design:
                  </span>{" "}
                  Custom design and optimization of wiring harnesses for complex
                  embedded systems, ensuring reliability and ease of assembly.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Control Panel Design:
                  </span>{" "}
                  Designing and laying out electrical control panels for
                  industrial and commercial applications, adhering to safety
                  standards.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Electrical Safety & Compliance:
                  </span>{" "}
                  Ensuring designs meet international electrical safety
                  standards (e.g., IEC, UL) and provide robust surge and fault
                  protection.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-3 text-center col-span-12 sm:order-2 order-1"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={ElectricalPowerDesign.src}
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
              variants={varFade().inRight}
              className="sm:col-span-3 text-center col-span-12"
            >
              <div className="relative">
                <Image
                  width={"400"}
                  height={"400"}
                  src={FPGADesign.src}
                  alt="iot-for-mindteck-cliet"
                  className="w-full max-w-[250px] max-h-[250px] h-full  m-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="sm:col-span-9 col-span-12"
            >
              <h3 className="text-secondary font-bold text-xl mb-3">
                FPGA Design & Accelerated Computing
              </h3>
              <p className="text-md">
                Unlock unparalleled performance and flexibility with
                reconfigurable logic:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="text-sm font-semibold">
                    Custom IP Core Development:
                  </span>{" "}
                  Designing highly optimized intellectual property (IP) cores
                  for specific functionalities.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    High-Speed Digital Design:
                  </span>{" "}
                  Implementing complex algorithms and data processing on FPGA
                  platforms for accelerated performance.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    System-on-Chip (SoC) Integration:
                  </span>{" "}
                  Developing custom logic and integrating it with embedded
                  processors on SoC FPGAs.
                </li>
                <li>
                  <span className="text-sm font-semibold">
                    Prototyping & Emulation:{" "}
                  </span>
                  Utilizing FPGAs for rapid prototyping and hardware emulation,
                  significantly reducing development cycles.
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
              <h3 className="text-secondary font-bold text-xl mb-3">
                Rigorous Verification & Validation (V&V)
              </h3>
              <p className="text-md">
                Ensure your embedded systems are robust, reliable, and
                compliant:
              </p>
              <ul className="text-md pl-4 list-disc mb-3 space-y-1">
                <li>
                  <span className="font-semibold text-sm">
                    Automated Testing Frameworks & Custom Test Jigs:
                  </span>{" "}
                  Utilizing advanced automation for unit, integration, and
                  system-level testing of hardware, firmware, and mechanical
                  components, complemented by the design and deployment of
                  specialized test jigs for precise, repeatable, and high-volume
                  product validation.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Performance & Reliability Testing:
                  </span>{" "}
                  Comprehensive testing for optimal speed, power consumption,
                  thermal management, and long-term durability.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Safety & Security Compliance:
                  </span>{" "}
                  Adhering to industry standards (e.g., ISO 26262 for
                  automotive, IEC 62304 for medical) and robust cybersecurity
                  protocols.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Simulation & Emulation:{" "}
                  </span>
                  Leveraging virtual environments and hardware-in-the-loop (HIL)
                  testing for early defect detection.
                </li>
                <li>
                  <span className="font-semibold text-sm">
                    Regulatory & Certification Support:
                  </span>{" "}
                  Guiding you through compliance requirements (CE, FCC, UL,
                  etc.) to ensure market readiness.
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
                  src={RVV.src}
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
