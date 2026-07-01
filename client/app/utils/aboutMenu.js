const DEFAULT_SALES_TEAM_ITEM = {
  label: "Sales Team",
  url: "/sales-team",
  children: [],
};

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

const getInsertIndex = (items, resolveUrl) => {
  const preferredOrder = [
    "/board-of-directors",
    "/management-team",
    "/practice-team",
  ];

  for (let index = preferredOrder.length - 1; index >= 0; index -= 1) {
    const matchIndex = items.findIndex((item) => {
      const normalizedLabel = normalizeAboutMenuLabel(item?.label || "");
      const normalizedUrl = resolveUrl(item?.url || item?.path || "");
      const expectedUrl = preferredOrder[index];

      if (normalizedUrl === expectedUrl) {
        return true;
      }

      if (expectedUrl === "/board-of-directors") {
        return normalizedLabel === "board of directors";
      }

      if (expectedUrl === "/management-team") {
        return normalizedLabel === "management team";
      }

      return normalizedLabel === "practice team";
    });

    if (matchIndex !== -1) {
      return matchIndex + 1;
    }
  }

  return items.length;
};

export const ensureAboutUsChildren = (
  items = [],
  {
    resolveUrl = normalizeAboutMenuPath,
    createItem = () => ({ ...DEFAULT_SALES_TEAM_ITEM }),
  } = {},
) => {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  if (safeItems.some((item) => isSalesTeamEntry(item, resolveUrl))) {
    return safeItems;
  }

  const insertAt = getInsertIndex(safeItems, resolveUrl);
  const nextItem = createItem();

  return [
    ...safeItems.slice(0, insertAt),
    nextItem,
    ...safeItems.slice(insertAt),
  ];
};
