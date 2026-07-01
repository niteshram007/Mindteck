export const revalidate = 300;
import SuccessStoryImage from "../../assets/images/success-story/smart-city.png";
import WeCare from "../../assets/images/wecare-com.png";
import Breadcrumbs from "../Breadcrumbs";
import { axiosInstance, HOST_API } from "@/app/utils/axiosInstance";
import parse from "html-react-parser";
import { MainNavBar } from "../../navbar";
import { UPLOADED_IMAGE_PATH } from "../../utils/constant";
import "../../style.css";
import Footer from "@/app/Footer";
import * as motion from "motion/react-client";
import { staggerItem, varContainer, varFade } from "@/lib/animate";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
export async function generateMetadata() {
  const { data } = await axiosInstance.post("public/page/getTemplateByUrl", {
    url: "csr",
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
      canonical: "/csr",
    },
  };
}
export default async function page() {
  const { data } = await axiosInstance.post(`public/page/getTemplateByUrl`, {
    url: "csr",
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

          <Breadcrumbs
            paths={["About Us", "Corporate Social Responsibility"]}
          />
          <motion.h1
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
            variants={varFade().inLeft}
            className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3"
          >
            Corporate Social Responsibility
          </motion.h1>
        </div>
      </section>

      <section className="bg-white text-black pt-10 pb-20 font-inter ">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="bg-gray-100 rounded-sm px-4 pt-3 pb-4 w-full md:w-[210px] md:float-right md:ml-6 mb-6 md:-mt-1">
                <img src={WeCare.src} className="w-full max-w-[135px] m-auto" />
                <p className="text-sm italic mt-3">
                  We Care is Mindteck{`'`}s framework for honoring its
                  commitments and making a lasting difference both inside and
                  outside the company.
                </p>
              </div>
              <motion.div
                viewport={{ once: true }}
                initial="hidden"
                whileInView="visible"
                variants={varFade().inUp}
                className="ProseMirror"
              >
                {parse(template.mainContent)}
              </motion.div>
              <motion.div
                viewport={{ once: true }}
                initial="hidden"
                whileInView="visible"
                variants={varFade().inUp}
                className="clear-both ProseMirror"
              >
                {parse(template.csr[0].content)}
              </motion.div>

              <motion.div
                viewport={{ once: true }}
                initial="hidden"
                whileInView="visible"
                variants={varContainer({ delay: 0.2, staggerIn: 0.3 })}
                className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-3"
              >
                {template.csr[0]?.images?.map((el) => {
                  return (
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      key={el}
                      className="mb-3"
                    >
                      <img
                        src={UPLOADED_IMAGE_PATH + el?.path}
                        className="w-full h-[190px] object-cover bg-white"
                      />
                      <p className="text-xs italic text-center mt-2">
                        {el?.title}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                viewport={{ once: true }}
                initial="hidden"
                whileInView="visible"
                variants={varFade().inUp}
                className="mt-3 ProseMirror"
              >
                {parse(template?.csr[1]?.content)}
              </motion.div>

              <motion.div
                viewport={{ once: true }}
                initial="hidden"
                whileInView="visible"
                variants={varContainer({ delay: 0.2, staggerIn: 0.3 })}
                className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-3 "
              >
                {template?.csr[1]?.images?.map((el) => {
                  return (
                    <motion.div
                      variants={staggerItem}
                      viewport={{ once: true }}
                      key={el}
                      className="mb-3"
                    >
                      <img
                        src={UPLOADED_IMAGE_PATH + el?.path}
                        className="w-full h-[190px] object-cover bg-white"
                      />
                      <p className="text-xs italic text-center mt-2">
                        {el?.title}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
              <div className="clear-both" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
