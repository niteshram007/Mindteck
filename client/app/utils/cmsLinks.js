const EXTERNAL_PROTOCOL_RE = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;
const CONTACT_PATH = "/contact";
const CONTACT_ALIASES = new Set([
  "contact",
  "/contact",
  "contact-us",
  "/contact-us",
  "contactus",
  "/contactus",
]);
const HOME_PATH_ALIASES = new Set(["", "/", "/home-page-2", "/home-page-2/"]);

const normalizeContactKey = (value = "") =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/\/+$/, "");

const resolveContactFallbackPath = (value = "") => {
  const normalizedKey = normalizeContactKey(value);
  if (normalizedKey === "#feedback-form-section") {
    return CONTACT_PATH;
  }
  if (CONTACT_ALIASES.has(normalizedKey)) {
    return CONTACT_PATH;
  }
  return null;
};

export const normalizeCmsDomain = (domain) => {
  if (!domain) return "";
  const trimmed = String(domain).trim();
  if (!trimmed) return "";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

export const isExternalPath = (value) => {
  if (!value) return false;
  if (value.startsWith("//")) return true;
  return EXTERNAL_PROTOCOL_RE.test(value);
};

export const normalizeMenuPath = (value, cmsDomain = "") => {
  if (!value || value === "#") return "#";
  if (isExternalPath(value)) {
    try {
      const externalUrl = new URL(value);
      const normalizedHash = normalizeContactKey(externalUrl.hash || "");
      const normalizedPath = normalizeContactKey(externalUrl.pathname || "/");
      const normalizedHomePath = HOME_PATH_ALIASES.has(normalizedPath);

      if (normalizedHash === "#feedback-form-section" && normalizedHomePath) {
        return CONTACT_PATH;
      }
    } catch (_error) {
      // Keep original URL for any unparsable values.
    }

    return value;
  }

  const base = normalizeCmsDomain(cmsDomain);
  const path = value.startsWith("/") || value.startsWith("#") ? value : `/${value}`;
  const normalizedPath = /^\/home-page-2\/?$/i.test(path) ? "/" : path;
  const contactFallback = resolveContactFallbackPath(normalizedPath);
  if (contactFallback) return contactFallback;

  if (value.startsWith("#")) return value;

  return base ? `${base}${normalizedPath}` : normalizedPath;
};
