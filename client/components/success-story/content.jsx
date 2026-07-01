"use client";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import { MotionContainer, varFade } from "@/lib/animate";
import * as motion from "motion/react-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CmsAssetImage from "@/components/common-client-component/CmsAssetImage";

const caseStudyCache = new Map();
const SUCCESS_STORY_CARD_SIZE = 240;
const SUCCESS_STORY_GAP = 18;
const SUCCESS_STORY_VISIBLE_COUNT = 4;
const SUCCESS_STORY_TRACK_WIDTH =
  SUCCESS_STORY_CARD_SIZE * SUCCESS_STORY_VISIBLE_COUNT +
  SUCCESS_STORY_GAP * (SUCCESS_STORY_VISIBLE_COUNT - 1);

export default function SuccessStory() {
  const pathName = usePathname();
  const [caseStudyList, setCaseStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const category = pathName.split("/")[1] ?? "";
    const cachedCaseStudies = caseStudyCache.get(category);

    const loadCaseStudies = async () => {
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

        if (!isMounted) {
          return;
        }

        const nextCaseStudies = data || [];
        caseStudyCache.set(category, nextCaseStudies);
        setCaseStudyList(nextCaseStudies);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.log(error);
        setCaseStudyList([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCaseStudies();

    return () => {
      isMounted = false;
    };
  }, [pathName]);

  if (isLoading) {
    return (
      <div className="max-w-full px-10 py-6 text-center">
        <p className="text-sm text-gray-600">Loading case studies...</p>
      </div>
    );
  }

  if (caseStudyList && caseStudyList?.length === 0) {
    return null;
  }

  const showNavigation = caseStudyList.length > SUCCESS_STORY_VISIBLE_COUNT;
  const renderCaseStudyCard = (caseStudy, index) => {
    const caseStudyTitle = caseStudy?.title || "Case Study";
    const imageUrl = buildUploadedAssetUrl(caseStudy?.file?.filePath);
    const detailHref = `/case-study-detail/${encodeURIComponent(caseStudyTitle)}`;

    return (
      <motion.div
        key={caseStudy?._id || index}
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
        <Link
          href={detailHref}
          className="text-primary underline font-[500] text-md"
        >
          View Case Study
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="max-w-full px-10">
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
              className="success-story-prev mt-[104px] shrink-0 z-0 rounded-full bg-primary text-white p-2 shadow-md"
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
                    prevEl: ".success-story-prev",
                    nextEl: ".success-story-next",
                  }}
                >
                  {caseStudyList.map((caseStudy, index) => (
                    <SwiperSlide
                      key={caseStudy?._id || index}
                      className="!w-auto"
                      style={{ width: `${SUCCESS_STORY_CARD_SIZE}px` }}
                    >
                      {renderCaseStudyCard(caseStudy, index)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </MotionContainer>
            </div>

            <button
              type="button"
              aria-label="Next success stories"
              className="success-story-next mt-[104px] shrink-0 z-0 rounded-full bg-primary text-white p-2 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudyList.map((caseStudy, index) =>
              renderCaseStudyCard(caseStudy, index),
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/resources"
          className="font-athelas text-lg font-normal p-3 bg-primary text-white rounded-md text-mdF"
        >
          Explore more...
        </Link>
      </div>
    </div>
  );
}
