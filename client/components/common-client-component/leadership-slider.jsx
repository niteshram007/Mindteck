"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";

export default function LeadershipSlider({ data = [], path }) {
  return (
    <section className="bg-white">
      <div className="container border-t-2 border-[#84754E] py-8">
        <Swiper
          slidesPerView={6}
          spaceBetween={"30"}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            350: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            546: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 55,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 45,
            },
          }}
          //   navigation={{ clickable:true }}
          effect="fade"
        >
          {data?.map((el) => {
            const imageUrl = UPLOADED_IMAGE_PATH + el?.passportImage?.filePath;
            const designation = el.designation.split("\\n");
            return (
              <SwiperSlide key={el._id}>
                <div className="mb-5">
                  <Card className="bg-transparent rounded-lg w-full overflow-hidden align-bottom group relative flex items-end justify-center">
                    <Link href={`${path}/${el._id}/${el.fullName}#info`}>
                      <img
                        src={imageUrl}
                        alt={el.fullName}
                        className="transition-all filter grayscale group-hover:grayscale-0 m-auto object-contain"
                      />
                    </Link>
                  </Card>
                  <h3 className="font-semibold text-sm mt-2 text-center">
                    <Link href={`${path}/${el._id}/${el.fullName}#info`}>
                      {el.fullName}
                    </Link>
                  </h3>
                  <h6 className="text-[14px] text-gray-700 text-center">
                    {designation.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </h6>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
