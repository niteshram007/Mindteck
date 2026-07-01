import Banner from "../../../assets/images/success-story/case-study-detail.png";
import ContactForm from "@/components/common-client-component/form";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import CaseStudyDetail from "./detail";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import {
  buildPageMetadata,
  extractSummary,
  normalizeMetadataText,
} from "@/app/utils/staticPageMetadata";
import { buildSiteUrl } from "@/app/utils/siteSeo";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import "../../../style.css";

const safeDecodeURIComponent = (value = "") => {
  try {
    return decodeURIComponent(value);
  } catch (_error) {
    return value;
  }
};

const isCaseStudyActive = (isActiveValue) => {
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

const getCaseStudyByTitle = unstable_cache(
  async (caseStudyTitle) => {
    try {
      const response = await axiosInstance(
        "public/case-study/getByTitle/" + encodeURIComponent(caseStudyTitle),
      );
      return response?.data || null;
    } catch (_error) {
      return null;
    }
  },
  ["public-case-study-by-title"],
  { revalidate: 120 },
);

const getCaseStudyKeywords = (data) => {
  const keywordParts = [
    data?.title,
    ...(Array.isArray(data?.categories) ? data.categories : []),
    "case study",
    "Mindteck",
  ];

  return keywordParts
    .map((item) => normalizeMetadataText(item))
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
    .join(", ");
};

export async function generateMetadata({ params }) {
  const slugParts = Array.isArray(params?.slug) ? params.slug : [];
  const rawTitle = slugParts.join("/");
  const caseStudyTitle = safeDecodeURIComponent(rawTitle || "").trim();
  const fallbackCanonicalPath = `/case-study-detail/${encodeURIComponent(caseStudyTitle)}`;

  if (!caseStudyTitle) {
    return buildPageMetadata({
      title: "Case Study",
      description: "Explore Mindteck case studies and success stories.",
      canonicalPath: "/resources",
      openGraphType: "article",
    });
  }

  const data = await getCaseStudyByTitle(caseStudyTitle);
  if (!data || !isCaseStudyActive(data?.isActive)) {
    return buildPageMetadata({
      title: "Case Study",
      description: "Explore Mindteck case studies and success stories.",
      canonicalPath: fallbackCanonicalPath,
      openGraphType: "article",
    });
  }

  const resolvedTitle = normalizeMetadataText(data?.title || caseStudyTitle);
  const description =
    normalizeMetadataText(data?.description) ||
    extractSummary(data?.content, 160) ||
    `Explore how Mindteck delivered outcomes for ${resolvedTitle}.`;
  const keywords = getCaseStudyKeywords(data);
  const canonicalPath = `/case-study-detail/${encodeURIComponent(
    data?.title?.trim() || caseStudyTitle,
  )}`;
  const bannerImage = data?.file?.filePath
    ? buildUploadedAssetUrl(data.file.filePath)
    : Banner.src;

  return buildPageMetadata({
    title: resolvedTitle,
    description,
    keywords,
    canonicalPath,
    openGraphType: "article",
    image: bannerImage,
  });
}

export default async function CaseStudyDetails({ params }) {
  const slugParts = Array.isArray(params?.slug) ? params.slug : [];
  const rawTitle = slugParts.join("/");
  const caseStudyTitle = safeDecodeURIComponent(rawTitle || "").trim();

  if (!caseStudyTitle) {
    notFound();
  }

  const data = await getCaseStudyByTitle(caseStudyTitle);

  if (!data) {
    notFound();
  }

  if (!isCaseStudyActive(data?.isActive)) {
    notFound();
  }

  const bannerImage = data?.file?.filePath
    ? buildUploadedAssetUrl(data.file.filePath)
    : Banner.src;
  const canonicalPath = `/case-study-detail/${encodeURIComponent(
    data?.title?.trim() || caseStudyTitle,
  )}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: normalizeMetadataText(data?.title || caseStudyTitle),
    description:
      normalizeMetadataText(data?.description) ||
      extractSummary(data?.content, 160) ||
      `Explore how Mindteck delivered outcomes for ${normalizeMetadataText(
        data?.title || caseStudyTitle,
      )}.`,
    image: bannerImage,
    articleSection: Array.isArray(data?.categories) ? data.categories : undefined,
    datePublished: data?.createdAt || undefined,
    dateModified: data?.updatedAt || data?.createdAt || undefined,
    mainEntityOfPage: buildSiteUrl(canonicalPath),
    author: {
      "@type": "Organization",
      name: "Mindteck",
    },
    publisher: {
      "@type": "Organization",
      name: "Mindteck",
      url: buildSiteUrl("/"),
    },
  };

  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
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
                alt={data?.title || "case-study-banner"}
                src={bannerImage}
                width={1600}
                height={300}
                className="h-full w-full object-cover max-h-[300px]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <CaseStudyDetail data={data} />

      <ContactForm />
    </div>
  );
}
