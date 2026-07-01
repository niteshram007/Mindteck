import Banner from "../../../assets/images/success-story/case-study-detail.png";
import ContactForm from "@/components/common-client-component/form";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import BrochureDetail from "./detail";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import {
  buildPageMetadata,
  extractSummary,
  normalizeMetadataText,
} from "@/app/utils/staticPageMetadata";
import { notFound } from "next/navigation";
import { cache } from "react";
import "../../../style.css";

export const revalidate = 300;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CMS_API_BASE ||
  "https://www.mindteck.com/api/";

const BROCHURE_FALLBACK_DESCRIPTION =
  "Explore Mindteck brochures and downloadable resources across engineering, AI, IoT, data, and digital transformation.";

const isResourceActive = (isActiveValue) => {
  if (isActiveValue === null || isActiveValue === undefined) {
    return true;
  }

  if (typeof isActiveValue === "boolean") {
    return isActiveValue;
  }

  if (typeof isActiveValue === "number") {
    return isActiveValue === 1;
  }

  if (typeof isActiveValue === "string") {
    const normalizedValue = isActiveValue.trim().toLowerCase();
    return !["false", "0", "inactive", "no"].includes(normalizedValue);
  }

  return Boolean(isActiveValue);
};

const getBrochureTitleFromParams = (params) => {
  const slugParts = Array.isArray(params?.slug) ? params.slug : [];
  const rawTitle = slugParts.join("/");
  return decodeURIComponent(rawTitle || "").trim();
};

const buildBrochureCanonicalPath = (title = "") =>
  `/brochure-detail/${encodeURIComponent(String(title || "").trim())}`;

const getBrochureByTitle = cache(async (brochureTitle) => {
  if (!brochureTitle) {
    return null;
  }

  try {
    const response = await fetch(
      new URL(
        "public/brochure/getByTitle/" + encodeURIComponent(brochureTitle),
        API_BASE_URL,
      ),
      {
        next: { revalidate },
      },
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (_error) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  const brochureTitle = getBrochureTitleFromParams(params);
  const data = await getBrochureByTitle(brochureTitle);
  const resolvedTitle = normalizeMetadataText(data?.title || brochureTitle || "Brochure");
  const resolvedDescription =
    data && isResourceActive(data?.isActive)
      ? extractSummary(
          data?.subTitle ||
            data?.description ||
            data?.content ||
            BROCHURE_FALLBACK_DESCRIPTION,
        )
      : BROCHURE_FALLBACK_DESCRIPTION;

  return buildPageMetadata({
    title: resolvedTitle,
    description: resolvedDescription,
    canonicalPath: brochureTitle
      ? buildBrochureCanonicalPath(data?.title || brochureTitle)
      : "/resources",
    openGraphType: "article",
  });
}

export default async function BrochureDetails({ params }) {
  const brochureTitle = getBrochureTitleFromParams(params);

  if (!brochureTitle) {
    notFound();
  }

  const data = await getBrochureByTitle(brochureTitle);

  if (!data || !isResourceActive(data?.isActive)) {
    notFound();
  }

  const bannerImageBase = data?.file?.filePath
    ? buildUploadedAssetUrl(data.file.filePath)
    : Banner.src;
  const parsedUpdatedAt = data?.updatedAt ? Date.parse(data.updatedAt) : NaN;
  const bannerVersion = Number.isFinite(parsedUpdatedAt)
    ? String(parsedUpdatedAt)
    : "";
  const bannerImage = bannerVersion
    ? `${bannerImageBase}${bannerImageBase.includes("?") ? "&" : "?"}v=${bannerVersion}`
    : bannerImageBase;

  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />
      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
      </section>

      <section>
        <div className="container p-0">
          <div className="grid grid-cols-1">
            <div className="">
              <img
                alt={data?.title || "brochure-banner"}
                src={bannerImage}
                width={1600}
                height={300}
                className="h-full w-full object-cover max-h-[300px]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <BrochureDetail data={data} fallbackImage={bannerImage} />

      <ContactForm />
    </div>
  );
}
