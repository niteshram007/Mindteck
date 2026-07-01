"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useMemo, useRef, useState } from "react";
import { axiosInstance } from "./utils/axiosInstance";
import { UPLOADED_IMAGE_PATH } from "./utils/constant";
import AiMlFallbackBanner from "@/app/assets/images/ai-ml/banner.png";

const HOME_SLIDER_TITLE = "Home Slider";
const SLIDE_DELAY_MS = 8000;
const FALLBACK_SLIDER_IMAGE = AiMlFallbackBanner.src;
const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
const SLIDER_CACHE_KEY = "home_slider_cache_v1";
const SLIDER_CACHE_TTL_MS = 5 * 60 * 1000;
const KNOW_MORE_CLASS =
  "inline-flex items-center rounded-md border border-white bg-transparent px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base text-white font-semibold transition-colors hover:bg-secondary hover:border-secondary hover:text-white";

const isHomeSlider = (title = "") => title.trim().toLowerCase() === HOME_SLIDER_TITLE.toLowerCase();

const renderHtml = (value = "") => ({
  __html: String(value || ""),
});

const toEpoch = (value) => {
  const timestamp = Date.parse(value || "");
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const normalizeRedirectPath = (redirectPath = "") => {
  const path = String(redirectPath || "").trim();
  if (!path) return "";
  if (path.startsWith("/") || path.startsWith("#") || /^https?:\/\//i.test(path)) {
    return path;
  }
  return `/${path}`;
};

const normalizeSlides = (rawData) => {
  if (!Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  const hasHomeSlider = rawData.some((slider) => isHomeSlider(slider?.title));
  const sourceSliders = hasHomeSlider
    ? rawData.filter((slider) => isHomeSlider(slider?.title))
    : rawData;

  const slides = sourceSliders.flatMap((slider, sliderIndex) => {
    const sliderCreatedAt = toEpoch(slider?.createdAt);
    const sliderItems = Array.isArray(slider?.items) ? slider.items : [];

    return sliderItems.map((item, itemIndex) => {
      const filePath = item?.file?.filePath || "";
      const itemOrder = Number(item?.order);
      const safeOrder = Number.isFinite(itemOrder) ? itemOrder : Number.MAX_SAFE_INTEGER;
      const sliderImage = filePath ? `${UPLOADED_IMAGE_PATH}${filePath}` : FALLBACK_SLIDER_IMAGE;

      return {
        id:
          item?.id ||
          `${slider?._id || "slider"}-${safeOrder}-${sliderIndex}-${itemIndex}`,
        order: safeOrder,
        sliderIndex,
        itemIndex,
        sliderCreatedAt,
        title: slider?.title || "",
        altText: item?.altText || slider?.title || "slider-image",
        content: item?.content || slider?.title || "",
        description: item?.description || "",
        redirectPath: normalizeRedirectPath(item?.redirectPath || "/"),
        sliderImage,
      };
    });
  });

  slides.sort((a, b) => {
    if (hasHomeSlider) {
      if (a.order !== b.order) return a.order - b.order;
      if (a.sliderIndex !== b.sliderIndex) return a.sliderIndex - b.sliderIndex;
      return a.itemIndex - b.itemIndex;
    }

    if (a.sliderCreatedAt !== b.sliderCreatedAt) {
      return b.sliderCreatedAt - a.sliderCreatedAt;
    }
    if (a.order !== b.order) return a.order - b.order;
    return a.itemIndex - b.itemIndex;
  });

  return slides;
};

const readSliderCache = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SLIDER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed?.items) ? parsed.items : null;
    if (!items || items.length === 0) return null;
    const ageMs = Date.now() - Number(parsed?.timestamp || 0);
    if (ageMs > SLIDER_CACHE_TTL_MS) return null;
    return items;
  } catch (error) {
    return null;
  }
};

const writeSliderCache = (items) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      SLIDER_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), items }),
    );
  } catch (error) {
    // Ignore storage errors
  }
};

export default function HomeBannerV2() {
  const initialSlides = useMemo(() => readSliderCache() || [], []);
  const [sliderItems, setSliderItems] = useState(initialSlides);
  const [isSliderLoading, setIsSliderLoading] = useState(!initialSlides.length);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]));
  const hasResetAutoplayRef = useRef(false);

  const getallSliderList = async () => {
    try {
      const { data } = await axiosInstance("public/slider/getall");
      const normalized = normalizeSlides(data);
      setSliderItems(normalized);
      writeSliderCache(normalized);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSliderLoading(false);
    }
  };

  useEffect(() => {
    const cachedSlides = readSliderCache();
    if (cachedSlides?.length) {
      setSliderItems(cachedSlides);
      setIsSliderLoading(false);
    }

    getallSliderList();
  }, []);

  const handleSlideChange = (swiper) => {
    const realIndex = typeof swiper?.realIndex === "number" ? swiper.realIndex : 0;
    setLoadedSlides((prev) => {
      const next = new Set(prev);
      next.add(realIndex);
      next.add(realIndex + 1);
      if (realIndex > 0) next.add(realIndex - 1);
      return next;
    });
  };

  const handleSwiperInit = (swiper) => {
    if (!swiper?.params?.autoplay) return;

    // Enforce autoplay interval from runtime params as well.
    swiper.params.autoplay.delay = SLIDE_DELAY_MS;

    if (!hasResetAutoplayRef.current) {
      hasResetAutoplayRef.current = true;
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  };

  return (
    <div className="ProseMirror text-white w-full">
      {isSliderLoading ? (
        <div className="relative overflow-hidden h-[560px] sm:h-[600px] lg:h-[620px] bg-primary" />
      ) : sliderItems.length > 0 ? (
        <Swiper
          speed={650}
          touchStartPreventDefault={false}
          resistanceRatio={0.75}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper home-hero-swiper"
          autoHeight={false}
          loop={sliderItems.length > 1}
          preloadImages={false}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: SLIDE_DELAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {sliderItems.map((slide, index) => {
            const isExternal = /^https?:\/\//i.test(slide.redirectPath);
            const isFirstSlide = index === 0;

            return (
              <SwiperSlide key={slide.id}>
                <div className="group relative overflow-hidden h-[560px] sm:h-[600px] lg:h-[620px]">
                  <div className="absolute inset-0 pointer-events-none">
                    <img
                      src={loadedSlides.has(index) ? slide.sliderImage : TRANSPARENT_PIXEL}
                      alt={slide.altText}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out md:duration-700 md:group-hover:scale-110 will-change-transform"
                      loading={isFirstSlide ? "eager" : "lazy"}
                      fetchPriority={isFirstSlide ? "high" : "auto"}
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_SLIDER_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/45" />
                  </div>

                  <div className="container relative z-10 h-[560px] sm:h-[600px] lg:h-[620px] flex items-center py-10 sm:py-14 lg:py-16">
                    <div className="w-full max-w-[920px] text-left text-white">
                      <div
                        className="home-hero-heading font-athelas text-[38px] sm:text-[48px] lg:text-[58px] leading-[1.08] sm:leading-[1.04]"
                        dangerouslySetInnerHTML={renderHtml(slide.content)}
                      />

                      <div
                        className="home-hero-description mt-5 text-[16px] sm:text-[18px] leading-[1.6] sm:leading-7 text-white/90 max-w-[860px]"
                        dangerouslySetInnerHTML={renderHtml(slide.description)}
                      />

                      <div className="mt-8 sm:mt-12 flex justify-start">
                        {isExternal ? (
                          <a
                            href={slide.redirectPath || "/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={KNOW_MORE_CLASS}
                          >
                            Know More
                          </a>
                        ) : (
                          <Link
                            href={slide.redirectPath || "/"}
                            className={KNOW_MORE_CLASS}
                          >
                            Know More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="relative overflow-hidden h-[560px] sm:h-[600px] lg:h-[620px] bg-primary">
          <div className="container relative z-10 h-[560px] sm:h-[600px] lg:h-[620px] flex items-center py-10 sm:py-14 lg:py-16">
            <div className="w-full max-w-[740px] mx-auto text-center text-white">
              <h2 className="font-athelas text-[38px] sm:text-[48px] lg:text-[58px] leading-[1.08] sm:leading-[1.04]">
                Add slider content from Admin
              </h2>
              <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.6] sm:leading-7 text-white/90">
                Go to Admin {">"} Slider and create slider entries with images and text.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
