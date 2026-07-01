"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MotionContainer, varFade } from "@/lib/animate";
import CmsAssetImage from "./CmsAssetImage";

const SUCCESS_STORY_CARD_SIZE = 240;
const SUCCESS_STORY_GAP = 18;
const SUCCESS_STORY_VISIBLE_COUNT = 4;
const SUCCESS_STORY_TRACK_WIDTH =
  SUCCESS_STORY_CARD_SIZE * SUCCESS_STORY_VISIBLE_COUNT +
  SUCCESS_STORY_GAP * (SUCCESS_STORY_VISIBLE_COUNT - 1);
const CASE_STUDY_CACHE = new Map();

const renderCaseStudyCard = (el, index) => {
  const caseStudyTitle = el?.title || "Case Study";
  const imageUrl = buildUploadedAssetUrl(el?.file?.filePath);
  const detailHref = `/case-study-detail/${encodeURIComponent(caseStudyTitle)}`;

  return (
    <motion.div
      key={el?._id || index}
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
              loading="lazy"
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
        {el?.description || ""}
      </p>
      <Link
        href={detailHref}
        className="text-primary underline font-[500] text-md"
      >
        View Case Study
      </Link>
    </motion.div>
  );
};

export default function CaseStudySliderVariant() {
  const pathName = usePathname();
  const [caseStudyList, setCaseStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = useMemo(() => {
    const segments = String(pathName || "").split("/").filter(Boolean);
    return segments[0] || "";
  }, [pathName]);

  useEffect(() => {
    let isActive = true;

    const getCaseStudyByCategories = async () => {
      if (!category) {
        setCaseStudyList([]);
        setIsLoading(false);
        return;
      }

      const cachedCaseStudies = CASE_STUDY_CACHE.get(category);
      if (cachedCaseStudies) {
        setCaseStudyList(cachedCaseStudies);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await axiosInstance.post(
          "public/case-study/getallByCategories",
          { categories: [category] },
        );
        if (!isActive) {
          return;
        }

        const nextCaseStudies = Array.isArray(data) ? data : [];
        CASE_STUDY_CACHE.set(category, nextCaseStudies);
        setCaseStudyList(nextCaseStudies);
      } catch (error) {
        if (isActive) {
          setCaseStudyList([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    getCaseStudyByCategories();

    return () => {
      isActive = false;
    };
  }, [category]);

  if (isLoading) {
    return (
      <div className="container py-6 text-center" role="status" aria-live="polite">
        <p className="text-sm text-gray-600">Loading case studies...</p>
      </div>
    );
  }

  if (!caseStudyList || caseStudyList.length === 0) {
    return null;
  }

  const showNavigation = caseStudyList.length > SUCCESS_STORY_VISIBLE_COUNT;

  return (
    <div className="container">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary">
        Success Stories
      </h2>
      <p className="text-xl text-center mb-16 mt-5 font-normal">
        Uncover success stories that showcase Mindteck&apos;s ability to deliver
        <br />
        customized solutions and measurable outcomes across industries.
      </p>

      <div className="mx-auto max-w-[1220px] relative z-0">
        {showNavigation ? (
          <div className="flex items-start justify-center gap-3 md:gap-4">
            <button
              type="button"
              aria-label="Previous success stories"
              className="case-study-prev mt-[104px] shrink-0 z-0 rounded-full bg-primary text-white p-2 shadow-md"
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
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".case-study-prev",
                    nextEl: ".case-study-next",
                  }}
                >
                  {caseStudyList.map((el, index) => (
                    <SwiperSlide
                      key={el?._id || index}
                      className="!w-auto"
                      style={{ width: `${SUCCESS_STORY_CARD_SIZE}px` }}
                    >
                      {renderCaseStudyCard(el, index)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </MotionContainer>
            </div>

            <button
              type="button"
              aria-label="Next success stories"
              className="case-study-next mt-[104px] shrink-0 z-0 rounded-full bg-primary text-white p-2 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudyList.map((el, index) => renderCaseStudyCard(el, index))}
          </div>
        )}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={varFade({ delay: 0.95 }).inUp}
        className="mt-6 text-center"
      >
        <Link
          href="/resources"
          className="font-inter text-md font-normal p-3 bg-primary text-white rounded-md"
          size="lg"
        >
          Explore more...
        </Link>
      </motion.div>
    </div>
  );
}
