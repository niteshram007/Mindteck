"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "@/app/utils/axiosInstance";
import InvestorBanner from "@/app/assets/images/banners-and-bg/investor-banner.jpg";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import CmsAssetImage from "@/components/common-client-component/CmsAssetImage";

export default function Policies() {
  const [policiesList, setPoliciesList] = useState([]);

  const getAllPolicies = async () => {
    try {
      const { data } = await axiosInstance("public/policy/getall");
      setPoliciesList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPolicies();
  }, []);

  return (
    <div className="relative z-0 font-inter">
      <motion.div
        layout
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-7"
      >
        <AnimatePresence>
          {[...(policiesList || [])].reverse().map((el) => {
            const pdfHref = buildUploadedAssetUrl(el?.file?.filePath) || "#";

            const imageUrl =
              buildUploadedAssetUrl(el?.image?.filePath) || InvestorBanner.src;

            const openInNewTab = Boolean(el?.file?.filePath);

            return (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
                key={el._id}
              >
                <a
                  href={pdfHref}
                  target={openInNewTab ? "_blank" : "_self"}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                  <CmsAssetImage
                    src={imageUrl}
                    fallbackSrc={InvestorBanner.src}
                    width={212}
                    height={212}
                    alt={el.title}
                    className="transition-all filter m-auto w-[180px] h-[180px] object-cover rounded-[20px]"
                  />
                </a>

                <h3 className="font-[500] text-1xl mt-2 font-inter text-center">
                  <a
                    href={pdfHref}
                    target={openInNewTab ? "_blank" : "_self"}
                    rel={openInNewTab ? "noopener noreferrer" : undefined}
                  >
                    {el.title}
                  </a>
                </h3>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
