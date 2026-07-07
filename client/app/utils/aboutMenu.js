const normalizeAboutMenuPath = (value = "") => {
  const safeValue = String(value || "").trim();

  if (!safeValue) {
    return "";
  }

  if (/^https?:\/\//i.test(safeValue)) {
    return safeValue.toLowerCase();
  }

  if (safeValue.startsWith("#")) {
    return safeValue.toLowerCase();
  }

  const withLeadingSlash = safeValue.startsWith("/")
    ? safeValue
    : `/${safeValue.replace(/^\/+/, "")}`;

  return withLeadingSlash.toLowerCase();
};

const normalizeAboutMenuLabel = (value = "") =>
  String(value || "").trim().toLowerCase();

const isSalesTeamEntry = (item, resolveUrl) => {
  const normalizedLabel = normalizeAboutMenuLabel(item?.label || "");
  const normalizedUrl = resolveUrl(item?.url || item?.path || "");

  return normalizedLabel === "sales team" || normalizedUrl === "/sales-team";
};

export const ensureAboutUsChildren = (
  items = [],
  { resolveUrl = normalizeAboutMenuPath } = {},
) => {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  return safeItems.filter((item) => !isSalesTeamEntry(item, resolveUrl));
};
