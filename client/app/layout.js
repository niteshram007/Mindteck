
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import ZIRouteTracker from "./zi-route-tracker";
import { SITE_URL } from "@/app/utils/siteSeo";
const athelas = localFont({
  src: [
    {
      path: "./fonts/Athelas-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Athelas-Regular.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Athelas-Regular.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Athelas-Regular.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--athelas",
});

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Italic.ttf",
      style: "italic",
    },
    {
      path: "./fonts/Inter-normal.ttf",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--inter",
});

const siteTitle = "Mindteck | AI, IoT & Product Engineering Solutions";
const siteDescription =
  "Mindteck is a pioneering IT services and Product Engineering company driving digital transformation through innovative AI, IoT, and embedded solutions for global enterprises.";
const siteUrl = SITE_URL;
const socialPreviewImage = `${siteUrl}/android-chrome-512x512.png`;
const GA_TRACKING_ID = "G-0M2P2GWLF6";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}#organization`,
  name: "Mindteck",
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  description: siteDescription,
  alternateName: "Mindteck",
  sameAs: ["https://www.linkedin.com/company/mindteck/"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@mindteck.com",
      url: `${siteUrl}/contact`,
      availableLanguage: ["en"],
    },
  ],
};
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  name: "Mindteck",
  url: siteUrl,
  description: siteDescription,
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Mindteck",
    url: siteUrl,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search-results?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const chunkRecoveryScript = `
  (function () {
    if (typeof window === "undefined") return;

    var RETRY_KEY = "__mindteck_chunk_retry__";
    var CHUNK_ERROR_PATTERN =
      /ChunkLoadError|Loading chunk [^ ]+ failed|Failed to fetch dynamically imported module/i;

    function reloadOnce() {
      try {
        if (sessionStorage.getItem(RETRY_KEY) === "1") {
          sessionStorage.removeItem(RETRY_KEY);
          return;
        }
        sessionStorage.setItem(RETRY_KEY, "1");
      } catch (error) {}
      window.location.reload();
    }

    window.addEventListener(
      "error",
      function (event) {
        var message = (event && event.message) || "";
        if (CHUNK_ERROR_PATTERN.test(message)) {
          reloadOnce();
        }
      },
      true,
    );

    window.addEventListener("unhandledrejection", function (event) {
      var reason = event && event.reason;
      var message = (reason && (reason.message || String(reason))) || "";
      if (CHUNK_ERROR_PATTERN.test(message)) {
        reloadOnce();
      }
    });

    window.addEventListener("load", function () {
      try {
        sessionStorage.removeItem(RETRY_KEY);
      } catch (error) {}
    });
  })();
`;

const userTrackingScript = `
window[(function(_AmI,_Vz){var _y5='';for(var _qz=0;_qz<_AmI.length;_qz++){_y5==_y5;var _Mt=_AmI[_qz].charCodeAt();_Mt!=_qz;_Mt-=_Vz;_Mt+=61;_Mt%=94;_Mt+=33;_Vz>1;_y5+=String.fromCharCode(_Mt)}return _y5})(atob('X05Vd3Rvamh5UGp+'), 5)] = '3d6514f1db1679915974';     var zi = document.createElement('script');     (zi.type = 'text/javascript'),     (zi.async = true),     (zi.src = (function(_h0h,_rJ){var _PV='';for(var _bu=0;_bu<_h0h.length;_bu++){_rJ>9;_PV==_PV;_wX!=_bu;var _wX=_h0h[_bu].charCodeAt();_wX-=_rJ;_wX+=61;_wX%=94;_wX+=33;_PV+=String.fromCharCode(_wX)}return _PV})(atob('eykpJShNQkJ9KEEvfEAodid8JSkoQXYkIkIvfEApdHpBfSg='), 19)),     (document.head || document.documentElement || document.body).appendChild(zi);
`;

const pageUrlTrackingScript = `
  window.ZIPageurl = window.location.href;
`;

const googleAnalyticsInitScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}');
`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  applicationName: "Mindteck",
  description: siteDescription,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "Mindteck",
    "IT services company",
    "product engineering company",
    "digital transformation",
    "AI",
    "IoT",
    "embedded solutions",
    "global enterprises",
    "digital transformation",
    "artificial intelligence",
    "product engineering",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Mindteck",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialPreviewImage,
        width: 512,
        height: 512,
        alt: "Mindteck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialPreviewImage],
  },
  other: {
    "content-language": "en",
    "geo.region": "US",
    "geo.placename": "Global",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='dns-prefetch' href='//www.google.com' />
        <link rel='dns-prefetch' href='//www.gstatic.com' />
        <link rel='dns-prefetch' href='//www.googletagmanager.com' />
        <link rel='dns-prefetch' href='//js.zi-scripts.com' />
        <link rel='preconnect' href='https://www.google.com' />
        <link rel='preconnect' href='https://www.gstatic.com' crossOrigin='' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://js.zi-scripts.com' crossOrigin='' />
        <Script
          id="gtag-url"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: googleAnalyticsInitScript,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: pageUrlTrackingScript,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: userTrackingScript,
          }}
        />
      </head>
      <body className={`${inter.variable}  ${athelas.variable}  antialiased`}>
        <ZIRouteTracker />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: chunkRecoveryScript,
          }}
        />
      </body>
    </html>
  );
}
