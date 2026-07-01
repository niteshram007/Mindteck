export const revalidate = 300;
import SuccessStoryImage from "../../assets/images/success-story/smart-city.png";
import Breadcrumbs from "../../(user)/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance, HOST_API } from "@/app/utils/axiosInstance";
import ContactForm from "@/components/common-client-component/form";
import Link from "next/link";
import parse from "html-react-parser";
import { MainNavBar } from "../../navbar";
import { UPLOADED_IMAGE_PATH } from "../../utils/constant";
import SuccessStoryImage1 from "../../assets/images/success-story/smart-citty-2.png";
import SuccessStoryImage2 from "../../assets/images/success-story/smart-parking.png";
import SuccessStoryImage3 from "../../assets/images/success-story/metering.png";
import SuccessStoryImage4 from "../../assets/images/success-story/health-care.png";
import * as motion from "motion/react-client";
import "../../style.css";
import { MotionContainer, staggerItem, varFade } from "@/lib/animate";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import CmsAssetImage from "@/components/common-client-component/CmsAssetImage";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";

export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetch data once
  const { data } = await axiosInstance.post("public/page/getTemplateByUrl", {
    url: "smartcity-solutions",
  });

  const { page } = data ?? {};
  if (!page) {
    return {
      title: "Mindteck",
      description: "Mindteck India",
    };
  }
  return {
    title: page?.title,
    description: page.metaDescription,
    keywords: page.metaKeyword,
    metadataBase: new URL(HOST_API),
    alternates: {
      canonical: "/smartcity-solutions",
    },
  };
}
export default async function page() {
  const { data } = await axiosInstance.post(`public/page/getTemplateByUrl`, {
    url: "smartcity-solutions",
  });
  const { page, template } = data ?? {};

  if (!(template && page)) {
    return null;
  }
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
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-8"
                style={{
                  background:
                    "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                }}
              >
                <div className="flex-col flex h-full justify-center items-center gap-5 ProseMirror">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade().inLeft}
                    className="font-athelas"
                  >
                    {parse(template.bannerTitle)}
                  </motion.div>
                  <hr className="border border-secondary w-full" />
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={varFade({ delay: 0.1 }).inLeft}
                    className="font-inter"
                  >
                    {parse(template.bannerDescription)}
                  </motion.div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                <CmsAssetImage
                  src={buildUploadedAssetUrl(page?.file?.filePath)}
                  fallbackSrc={SuccessStoryImage.src}
                  className="h-full w-full object-cover max-h-[360px]"
                />
              </div>
            </div>
          </div>
          <Breadcrumbs paths={["Smart City"]} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={varFade({ delay: 0.3 }).inLeft}
            className="ProseMirror font-athelas"
          >
            {parse(template.title)}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F7F8F8] text-black pt-10 pb-20 ProseMirror">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-8 col-span-12 smart-city-solution-copy"
            >
              {parse(template.first.contentOne)}
            </motion.div>
            <div className="md:col-span-4 col-span-12 md:mt-0 mt-5">
              <MotionContainer
                containerProps={{ delay: 0.4, staggerIn: 0.5 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card className="rounded-3xl text-center shadow-none border-none pt-5">
                  <CardContent>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {parse(template.first.contentTwo)}
                    </motion.div>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <img
                        src={
                          template.first.path
                            ? UPLOADED_IMAGE_PATH + template.first.path
                            : SuccessStoryImage1.src
                        }
                        width={"299"}
                        height={"248"}
                        alt="success-story"
                        className="mt-2 m-auto"
                      />
                    </motion.div>
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      className="mt-8"
                    >
                      <Link
                        href={"/smartcity-solutions#feedback-form-section"}
                        className="border border-white  rounded-lg bg-primary p-3 text-white"
                      >
                        Get In Touch
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </MotionContainer>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={varFade().inUp}
        className="container py-5 ProseMirror"
      >
        {parse(template.titleSecondary)}
      </motion.div>
      <section id="SmartParking" className="bg-white py-11 mb-4 ProseMirror scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-8 col-span-12 md:order-1 order-2 smart-city-solution-copy [&_b]:font-normal [&_strong]:font-normal [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal"
            >
              {parse(template.second.content)}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="md:col-span-4 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <img
                  src={
                    template.second.path
                      ? UPLOADED_IMAGE_PATH + template.second.path
                      : SuccessStoryImage2.src
                  }
                  alt="success-story"
                  className="w-full max-h-[400px] h-full "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="SmartUtilities" className="bg-white py-11 mb-4 ProseMirror scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-4 col-span-12 text-center"
            >
              <div className="relative">
                <img
                  src={
                    template.third.path
                      ? UPLOADED_IMAGE_PATH + template.third.path
                      : SuccessStoryImage3.src
                  }
                  alt="success-story"
                  className="w-full max-h-[400px] h-full "
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="md:col-span-8 col-span-12 smart-city-solution-copy [&_b]:font-normal [&_strong]:font-normal [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal"
            >
              {parse(template.third.content)}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="SmartHealthcareSolutions" className="bg-white py-11 mb-4 ProseMirror scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-8 col-span-12 md:order-1 order-2 smart-city-solution-copy"
            >
              {parse(template.four.content)}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="md:col-span-4 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <img
                  src={
                    template.four.path
                      ? UPLOADED_IMAGE_PATH + template.four.path
                      : SuccessStoryImage4.src
                  }
                  alt="success-story"
                  className="w-full max-h-[400px] h-full "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="SmartGovernance" className="bg-white py-11 mb-4 ProseMirror scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-4 col-span-12 text-center"
            >
              <div className="relative">
                <img
                  src={
                    template.five.path
                      ? UPLOADED_IMAGE_PATH + template.five.path
                      : SuccessStoryImage4.src
                  }
                  alt="success-story"
                  className="w-full max-h-[400px] h-full "
                />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="md:col-span-8 col-span-12 smart-city-solution-copy"
            >
              {parse(template.five.content)}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="SmartBuilding" className="bg-white py-11 ProseMirror scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inRight}
              className="md:col-span-8 col-span-12 md:order-1 order-2 smart-city-solution-copy"
            >
              {parse(template.six.content)}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={varFade().inLeft}
              className="md:col-span-4 text-center col-span-12 md:order-2 order-1"
            >
              <div className="relative">
                <img
                  src={
                    template.five.path
                      ? UPLOADED_IMAGE_PATH + template.six.path
                      : SuccessStoryImage4.src
                  }
                  alt="success-story"
                  className="w-full max-h-[400px] h-full "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <section className="text-black pt-10 pb-20 success-story text-center ">
        <div className="max-w-full px-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary">
            Success Stories
          </h1>
          <p className="text-xl text-center mb-16 mt-5 font-normal">
            Uncover success stories that showcase Mindteck&apos;s ability to
            deliver
            <br />
            customized solutions and measurable outcomes across industries.
          </p>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
            <div className="success-story-container mb-3">
              <div className="img-container p-1 bg-white">
                <img
                  src={SuccessStoryOne.src}
                  alt="success-story"
                  className="w-full max-h-[430px] h-full"
                />
              </div>
              <p className="text-xl font-normal mt-2">
                Big Data Analytics for a Leading Analytical Instrument Company
              </p>
            </div>

            <div className="success-story-container mb-3">
              <div className="img-container p-1 bg-white">
                <img
                  src={SuccessStoryOne.src}
                  alt="success-story"
                  className="w-full max-h-[430px] h-full"
                />
              </div>
              <p className="text-xl font-normal mt-2">
                Remote Patient Monitoring Device Enhancements
              </p>
            </div>

            <div className="success-story-container mb-3">
              <div className="img-container p-1 bg-white">
                <img
                  src={SuccessStoryOne.src}
                  alt="success-story"
                  className="w-full max-h-[430px] h-full"
                />
              </div>
              <p className="text-xl font-normal mt-2">
                Wearable Device Solution Increases Manufacturing Productivity by
                20%
              </p>
            </div>

            <div className="success-story-container mb-3">
              <div className="img-container p-1 bg-white">
                <img
                  src={SuccessStoryOne.src}
                  alt="success-story"
                  className="w-full max-h-[430px] h-full"
                />
              </div>
              <p className="text-xl font-normal mt-2">
                Sustainable IoT Solution for Soil Condition Monitoring
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={"/"}
              className="font-athelas text-lg font-normal p-3 bg-primary text-white rounded-md text-mdF"
            >
              Explore more...
            </Link>
          </div>
        </div>
      </section> */}
      <ContactForm />
    </div>
  );
}
