const normalizeBaseUrl = (url) => {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed) return "";
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
};

const resolveCmsApiBase = () => {
  const explicit = normalizeBaseUrl(process.env.NEXT_PUBLIC_CMS_API_BASE || process.env.CMS_API_BASE);
  if (explicit) return explicit;

  const apiBase = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL);
  if (apiBase) return apiBase;

  const cmsDomain = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_CMS_DOMAIN ||
      process.env.NEXT_PUBLIC_DOMAIN ||
      process.env.NEXT_PUBLIC_API_IMAGE ||
      ""
  );
  if (cmsDomain) return `${cmsDomain}api/`;

  const origin = normalizeBaseUrl(getRequestOrigin());
  if (origin) return `${origin}api/`;

  return "";
};

export const getCmsMenu = async (position, { revalidate = 300 } = {}) => {
  const baseUrl = resolveCmsApiBase();
  if (!baseUrl) return [];

  const url = `${baseUrl}public/menu/getallHierarchically/${position}`;

  try {
    const response = await fetch(url, { next: { revalidate } });
    if (!response.ok) {
      console.error(`CMS menu fetch failed (${position}): ${response.status}`);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    console.error(`CMS menu fetch error (${position}):`, error);
    return [];
  }
};
