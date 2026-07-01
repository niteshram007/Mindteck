import algoliasearch from "algoliasearch/lite";

const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

const normalizeBaseUrl = (value) => {
  if (!value) return "/api/";
  return value.endsWith("/") ? value : `${value}/`;
};

const getApiBaseUrl = () => {
  const defaultBase = "/api/";
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    const envBase = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
    if (typeof window !== "undefined" && envBase.startsWith("http")) {
      try {
        const envUrl = new URL(envBase);
        if (envUrl.hostname !== window.location.hostname) {
          return defaultBase;
        }
      } catch (_error) {
        return defaultBase;
      }
    }
    return envBase;
  }
  return defaultBase;
};

const buildFallbackSearchUrl = (query, limit) => {
  const base = getApiBaseUrl();
  const path = `public/page/search?q=${encodeURIComponent(query)}&limit=${limit}`;
  return `${base}${path}`;
};

export const normalizeSearchResultUrl = (url) => {
  if (!url) return "/";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
};

const normalizeSearchLimit = (limit) => {
  const parsed = Number(limit);
  if (!Number.isFinite(parsed)) return 5;
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsed));
};

const normalizeSearchResultItem = (item = {}) => ({
  title: String(item?.title || "Untitled").trim(),
  url: normalizeSearchResultUrl(String(item?.url || "/").trim()),
  description: String(item?.description || "").trim(),
});

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "";

let searchIndex = null;
if (algoliaAppId && algoliaSearchKey && algoliaIndexName) {
  const client = algoliasearch(algoliaAppId, algoliaSearchKey);
  searchIndex = client.initIndex(algoliaIndexName);
}

const searchWithAlgolia = async (query, limit) => {
  if (!searchIndex) return [];
  const { hits } = await searchIndex.search(query, {
    hitsPerPage: limit,
    attributesToRetrieve: ["title", "url", "description"],
  });

  if (!Array.isArray(hits)) return [];
  return hits.map(normalizeSearchResultItem);
};

const searchWithFallbackApi = async (query, limit, signal) => {
  const response = await fetch(buildFallbackSearchUrl(query, limit), { signal });
  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data = await response.json();
  const items = Array.isArray(data?.data) ? data.data : [];
  return items.map(normalizeSearchResultItem);
};

const mergeSearchResults = (...resultSets) => {
  const mergedMap = new Map();
  resultSets.flat().forEach((item) => {
    const key = normalizeSearchResultUrl(item?.url || "/");
    if (!mergedMap.has(key)) {
      mergedMap.set(key, normalizeSearchResultItem(item));
    }
  });
  return Array.from(mergedMap.values());
};

export const searchSiteResults = async (query, options = {}) => {
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return [];

  const limit = normalizeSearchLimit(options?.limit);
  if (searchIndex) {
    try {
      const algoliaResults = await searchWithAlgolia(safeQuery, limit);
      const fallbackResults = await searchWithFallbackApi(safeQuery, limit, options?.signal);
      return mergeSearchResults(algoliaResults, fallbackResults).slice(0, limit);
    } catch (error) {
      if (error?.name === "AbortError") {
        throw error;
      }
      return searchWithFallbackApi(safeQuery, limit, options?.signal);
    }
  }

  return searchWithFallbackApi(safeQuery, limit, options?.signal);
};
