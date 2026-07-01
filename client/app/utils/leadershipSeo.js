import {
  buildPageMetadata,
  extractSummary,
  normalizeMetadataText,
} from "./staticPageMetadata";
import { buildSiteUrl } from "./siteSeo";

export const getLeadershipCanonicalPath = (basePath = "", member = {}) => {
  const id = String(member?._id || "").trim();
  const fullName = normalizeMetadataText(member?.fullName || member?.name || "");

  if (!id) {
    return basePath || "/";
  }

  const encodedName = fullName ? `/${encodeURIComponent(fullName)}` : "";
  return `${basePath}/${id}${encodedName}`;
};

const getLeadershipDescription = (member = {}, teamLabel = "Leadership") => {
  const summary =
    extractSummary(member?.content, 160) ||
    extractSummary(member?.description, 160);

  if (summary) {
    return summary;
  }

  const fullName = normalizeMetadataText(member?.fullName || member?.name || "");
  const designation = normalizeMetadataText(member?.designation || "");

  return `${fullName}${
    designation ? ` serves as ${designation}` : ""
  } at Mindteck ${teamLabel}.`.trim();
};

export const buildLeadershipMetadata = ({
  member = {},
  basePath = "/",
  teamLabel = "Leadership",
}) => {
  const fullName =
    normalizeMetadataText(member?.fullName || member?.name || "") || teamLabel;
  const designation = normalizeMetadataText(member?.designation || "");
  const keywords = [fullName, designation, teamLabel, "Mindteck leadership"]
    .filter(Boolean)
    .join(", ");

  return buildPageMetadata({
    title: fullName,
    description: getLeadershipDescription(member, teamLabel),
    keywords,
    canonicalPath: getLeadershipCanonicalPath(basePath, member),
  });
};

export const buildLeadershipPersonJsonLd = ({
  member = {},
  basePath = "/",
  teamLabel = "Leadership",
  imageUrl = "",
}) => {
  const fullName = normalizeMetadataText(member?.fullName || member?.name || "");
  const designation = normalizeMetadataText(member?.designation || "");
  const url = buildSiteUrl(getLeadershipCanonicalPath(basePath, member));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: designation || teamLabel,
    description: getLeadershipDescription(member, teamLabel),
    url,
    image: imageUrl || undefined,
    worksFor: {
      "@type": "Organization",
      name: "Mindteck",
      url: buildSiteUrl("/"),
    },
  };
};
