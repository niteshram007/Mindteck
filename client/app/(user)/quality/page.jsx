import { MainNavBar } from "@/app/navbar";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import React from "react";
import SuccessStoryImage from "../../assets/images/success-story/smart-city.png";
import QualityImg1 from "../../assets/images/quality/Quality-img1.png";
import QualityImg2 from "../../assets/images/quality/Quality-img2.png";
import QualityImg3 from "../../assets/images/quality/Quality-img3.png";
import QualityImg4 from "../../assets/images/quality/Quality-img4.png";
import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { varFade } from "@/lib/animate";
export default function page() {
  return (
    <div className="overflow-x-hidden">
      <div className=" bg-gray-100 font-inter pt-2 ">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <div className="">
              <img
                src={
                  page?.file?.filePath
                    ? UPLOADED_IMAGE_PATH + page?.file?.filePath
                    : SuccessStoryImage.src
                }
                className="h-full w-full object-cover max-h-[360px]"
              />
            </div>

            <Breadcrumbs paths={["About Us", "Quality Certifications"]} />
            <motion.h1
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade().inLeft}
              className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3"
            >
              Quality Certifications
            </motion.h1>
          </div>
        </section>
      </div>
      <section className="pt-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-stretch">
            <motion.div
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade().in}
              className="flex h-full items-center justify-center"
            >
              <Link
                href="/1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={QualityImg1}
                  width={243}
                  height={509}
                  alt={"iso-2015"}
                  className="h-[280px] sm:h-[360px] md:h-[430px] w-auto object-contain"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade({ delay: 0.2 }).inLeft}
              className="flex h-full items-center justify-center"
            >
              <Link
                href="/2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={QualityImg2}
                  width={243}
                  height={509}
                  alt={"iso-2016"}
                  className="h-[280px] sm:h-[360px] md:h-[430px] w-auto object-contain"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade({ delay: 0.4 }).inLeft}
              className="flex h-full items-center justify-center"
            >
              <Link
                href="/3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={QualityImg3}
                  width={243}
                  height={509}
                  alt={"iso-2013"}
                  className="h-[280px] sm:h-[360px] md:h-[430px] w-auto object-contain"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade({ delay: 0.6 }).inLeft}
              className="flex h-full items-center justify-center"
            >
              <Link
                href="/4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={QualityImg4}
                  width={243}
                  height={509}
                  alt="CMMI DEV & SVC"
                  className="h-[280px] sm:h-[360px] md:h-[430px] w-auto object-contain"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
