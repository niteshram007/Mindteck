/** @type {import('next').NextConfig} */

const cmsDomain = String(process.env.NEXT_PUBLIC_DOMAIN || "").trim();
const cmsDomainUrl = cmsDomain
  ? /^https?:\/\//i.test(cmsDomain)
    ? cmsDomain
    : `https://${cmsDomain}`
  : "";
const remotePatterns = [];

if (cmsDomainUrl) {
  try {
    const parsedCmsDomainUrl = new URL(cmsDomainUrl);
    const sharedPattern = {
      hostname: parsedCmsDomainUrl.hostname,
      pathname: "/**",
      port: parsedCmsDomainUrl.port || "",
    };

    remotePatterns.push({
      ...sharedPattern,
      protocol: parsedCmsDomainUrl.protocol.replace(":", ""),
    });

    if (parsedCmsDomainUrl.protocol === "https:") {
      remotePatterns.push({
        ...sharedPattern,
        protocol: "http",
      });
    }
  } catch (_error) {
    // Ignore invalid domain strings and keep default image behavior.
  }
}

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
