"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import SuccessStoryBg from "@/app/assets/images/banners-and-bg/success_story_bg.png";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import { MotionContainer, varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import CmsAssetImage from "./CmsAssetImage";

const sortCaseStudiesByNewest = (items = []) =>
  [...items].sort((a, b) => {
    const aTime = new Date(a?.createdAt || 0).getTime() || 0;
    const bTime = new Date(b?.createdAt || 0).getTime() || 0;

    if (bTime !== aTime) return bTime - aTime;

    return String(b?._id || "").localeCompare(String(a?._id || ""));
  });

const SUCCESS_STORY_CARD_SIZE = 240;
const SUCCESS_STORY_GAP = 18;
const SUCCESS_STORY_VISIBLE_COUNT = 4;
const SUCCESS_STORY_TRACK_WIDTH =
  SUCCESS_STORY_CARD_SIZE * SUCCESS_STORY_VISIBLE_COUNT +
  SUCCESS_STORY_GAP * (SUCCESS_STORY_VISIBLE_COUNT - 1);

export default function HomeSuccessStories() {
  const [caseStudyList, setCaseStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCaseStudies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.post("public/case-study/getallByCategories", {
          categories: [],
        });
        setCaseStudyList(sortCaseStudiesByNewest(data || []));
      } catch (error) {
        console.log(error);
        setCaseStudyList([]);
      } finally {
        setIsLoading(false);
      }
    };

    getCaseStudies();
  }, []);

  const showNavigation = caseStudyList.length > SUCCESS_STORY_VISIBLE_COUNT;

  return (
    <section
      className="text-white pt-10 pb-20 success-story text-center"
      style={{
        background: `url(${SuccessStoryBg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-full px-10 text-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal">
          {["Success", "Stories"].map((el, i) => (
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={varFade({ delay: i * 0.2 }).inLeft}
              key={i}
              className="text-secondary"
            >
              {el}{" "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.2 }).inUp}
          className="text-xl text-center mb-12 mt-5 font-normal"
        >
          Uncover success stories that showcase Mindteck&apos;s ability to deliver
          <br />
          customized solutions and measurable outcomes across industries.
        </motion.p>

        {isLoading ? (
          <p className="text-sm text-gray-700">Loading case studies...</p>
        ) : caseStudyList.length > 0 ? (
          <div className="mx-auto max-w-[1220px]">
            <div className="flex items-start justify-center gap-3 md:gap-4">
              <button
                type="button"
                aria-label="Previous success stories"
                className="success-story-prev mt-[108px] shrink-0 z-20 rounded-full bg-primary text-white p-2 shadow-md disabled:opacity-35"
                disabled={!showNavigation}
              >
                <ChevronLeft size={18} />
              </button>

              <div
                className="w-full overflow-hidden"
                style={{ maxWidth: `${SUCCESS_STORY_TRACK_WIDTH}px` }}
              >
                <MotionContainer>
                  <Swiper
                    slidesPerView="auto"
                    spaceBetween={SUCCESS_STORY_GAP}
                    modules={[Navigation, Autoplay]}
                    loop={caseStudyList.length > 1}
                    autoplay={
                      caseStudyList.length > 1
                        ? {
                            delay: 10000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                          }
                        : false
                    }
                    navigation={{
                      prevEl: ".success-story-prev",
                      nextEl: ".success-story-next",
                    }}
                  >
                {caseStudyList.map((caseStudy, index) => {
                  const caseStudyTitle = caseStudy?.title || "Case Study";
                  const imageUrl = buildUploadedAssetUrl(caseStudy?.file?.filePath);
                  const detailHref = `/case-study-detail/${encodeURIComponent(caseStudyTitle)}`;

                  return (
                    <SwiperSlide
                      key={caseStudy?._id || index}
                      className="!w-auto"
                      style={{ width: `${SUCCESS_STORY_CARD_SIZE}px` }}
                    >
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={varFade({ delay: 0.2 }).inUp}
                        className="success-story-container mb-3 text-left"
                        style={{ width: `${SUCCESS_STORY_CARD_SIZE}px` }}
                      >
                        <Link href={detailHref} className="block">
                          <div
                            className="img-container p-1 bg-white overflow-hidden mx-auto"
                            style={{
                              width: `${SUCCESS_STORY_CARD_SIZE}px`,
                              height: `${SUCCESS_STORY_CARD_SIZE}px`,
                            }}
                          >
                            {imageUrl ? (
                              <CmsAssetImage
                                src={imageUrl}
                                width={SUCCESS_STORY_CARD_SIZE}
                                height={SUCCESS_STORY_CARD_SIZE}
                                alt={caseStudyTitle}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200" />
                            )}
                          </div>
                        </Link>
                        <h3 className="text-lg font-normal mt-2 success-story-title">
                          <Link href={detailHref}>{caseStudyTitle}</Link>
                        </h3>
                        <p className="text-sm font-normal line-clamp-3 mt-1 min-h-[60px]">
                          {caseStudy?.description || ""}
                        </p>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
                  </Swiper>
                </MotionContainer>
              </div>

              <button
                type="button"
                aria-label="Next success stories"
                className="success-story-next mt-[108px] shrink-0 z-20 rounded-full bg-primary text-white p-2 shadow-md disabled:opacity-35"
                disabled={!showNavigation}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : null}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={varFade({ delay: 0.4 }).inUp}
          className="mt-6"
        >
          <Link
            href="/resources"
            className="inline-block font-athelas text-lg font-normal p-3 bg-primary text-white rounded-md"
          >
            Explore more...
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
