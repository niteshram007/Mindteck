export const revalidate = 300;
import { redirect } from "next/navigation";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { makePressReleaseSlug } from "@/app/utils/slug";
import parse from "html-react-parser";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import {
  buildPageMetadata,
  extractSummary,
  normalizeMetadataText,
} from "@/app/utils/staticPageMetadata";
import { buildSiteUrl } from "@/app/utils/siteSeo";

const PRESS_ROOM_FALLBACK_METADATA = {
  title: "Press Room",
  description: "Explore Mindteck press releases and media updates.",
  canonicalPath: "/investors/press-room",
  openGraphType: "article",
};

const isValidObjectId = (value = "") => /^[a-fA-F0-9]{24}$/.test(String(value));

const getPressReleaseById = async (id = "") => {
  if (!isValidObjectId(id)) {
    return null;
  }

  try {
    const { data } = await axiosInstance("public/press-release/" + id);
    return data || null;
  } catch (_error) {
    return null;
  }
};

export async function generateMetadata({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const pressReleaseId = slug[0] || "";
  const data = await getPressReleaseById(pressReleaseId);
  const expectedSlug = makePressReleaseSlug(data?.title || "");
  const canonicalPath = `/investors/press-room/${pressReleaseId}${
    expectedSlug ? `/${expectedSlug}` : ""
  }`;

  if (!data) {
    return buildPageMetadata(PRESS_ROOM_FALLBACK_METADATA);
  }

  return buildPageMetadata({
    title: data?.title || "Press Room",
    description:
      normalizeMetadataText(data?.seoDescription) ||
      normalizeMetadataText(data?.seoTitle) ||
      extractSummary(data?.content, 160) ||
      normalizeMetadataText(data?.title) ||
      "Press Room",
    keywords: [data?.title, data?.seoTitle, "press release", "Mindteck"]
      .map((value) => normalizeMetadataText(value))
      .filter(Boolean)
      .filter((value, index, list) => list.indexOf(value) === index)
      .join(", "),
    canonicalPath,
    openGraphType: "article",
  });
}

export default async function page({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const pressReleaseId = slug[0] || "";
  if (!pressReleaseId || !isValidObjectId(pressReleaseId)) {
    redirect("/investors/press-room");
  }

  const data = await getPressReleaseById(pressReleaseId);
  if (!data) {
    redirect("/investors/press-room");
  }

  const expectedSlug = makePressReleaseSlug(data?.title);
  if (expectedSlug && (!slug[1] || slug[1] !== expectedSlug)) {
    redirect(`/investors/press-room/${pressReleaseId}/${expectedSlug}`);
  }

  const mainHeading = data?.title?.trim() || "Press Room";
  const subHeading = data?.seoTitle?.trim() || "";
  const showSubHeading =
    !!subHeading && subHeading.toLowerCase() !== mainHeading.toLowerCase();
  const expectedCanonicalPath = expectedSlug
    ? `/investors/press-room/${pressReleaseId}/${expectedSlug}`
    : `/investors/press-room/${pressReleaseId}`;
  const publishedDate = data?.publicationDate
    ? new Date(data.publicationDate)
    : null;
  const hasValidPublishedDate = Boolean(
    publishedDate && !Number.isNaN(publishedDate.getTime()),
  );
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: mainHeading,
    description:
      normalizeMetadataText(data?.seoDescription) ||
      extractSummary(data?.content, 160) ||
      mainHeading,
    datePublished: data?.publicationDate || data?.createdAt || undefined,
    dateModified: data?.updatedAt || data?.publicationDate || undefined,
    mainEntityOfPage: buildSiteUrl(expectedCanonicalPath),
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsArticleJsonLd),
        }}
      />
      <h1 className="font-athelas text-primary font-semibold text-3xl mb-2">
        {mainHeading}
      </h1>
      {showSubHeading && (
        <p className="text-secondary font-medium text-sm mb-2 uppercase tracking-wide">
          {subHeading}
        </p>
      )}
      {hasValidPublishedDate && (
        <p className="text-sm text-gray-600">
          {format(publishedDate, "MMMM dd, yyyy")}
        </p>
      )}
      <div className="ProseMirror">{parse(data?.content || "")}</div>
      <Link
        href="/investors/press-room"
        className="text-white text-sm mt-3 flex items-center gap-2 bg-black p-1.5 w-max rounded-sm"
      >
        <ArrowBigLeft size={20} /> Back to Press Room
      </Link>
    </div>
  );
}
