"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

import { Pagination } from "swiper/modules";
import * as motion from "motion/react-client";
import { MotionViewport, varFade } from "@/lib/animate";
import { useEffect, useState } from "react";
import { axiosInstance } from "./utils/axiosInstance";
import { UPLOADED_IMAGE_PATH } from "./utils/constant";
import parse from "html-react-parser";
export default function HomeBanner() {
  const [sliderList, setSliderList] = useState({});
  const getallSliderList = async () => {
    try {
      const { data } = await axiosInstance("public/slider/getall");
      const homeSlider = data.find((el) => el.title === "Home Slider");
      setSliderList(homeSlider);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallSliderList();
  }, []);

  return (
    <div className=" rounded-lg ProseMirror">
      <MotionViewport>
        <Swiper
          pagination={{
            clickable: true,
            type: "bullets", // Use dots as the pagination style
          }}
          modules={[Pagination]}
          className="mySwiper home-hero-swiper"
          autoplay={true}
        >
          {sliderList?.items?.map((el) => (
            <SwiperSlide key={el.order}>
              <div
                className="slide-1 sm:py-[80px] sm:px-[40px] rounded-[25px] py-[30px] px-[30px]"
                style={{
                  background: `url('${
                    UPLOADED_IMAGE_PATH + el?.file?.filePath
                  }')`,
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="grid grid-cols-12">
                  <div className="lg:col-span-4 md:col-span-8 sm:col-span-10 col-span-12 ">
                    <div className="flex flex-col gap-4">
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={varFade().inLeft}
                        className="font-athelas"
                      >
                        {parse(el?.content)}
                      </motion.div>

                      <hr
                        style={{
                          height: "2px",
                          background: "#84754E",
                          border: "none",
                        }}
                      />
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3, delay: 0.1 }}
                        variants={varFade({ delay: 0.4 }).inLeft}
                      >
                        {parse(el?.description)}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MotionViewport>
    </div>
  );
}
