import { NextResponse } from "next/server";

const LEGACY_REDIRECTS = new Map([
  ["/resource", "/resources"],
  ["/leadership-team", "/management-team"],
  ["/research-collaborations", "/research-collaboration"],
  ["/white-papers", "/white-paper"],
  ["/case-studies", "/resources"],
  ["/brochures", "/resources"],
  ["/health-care-and-medical-product-device-development", "/medical-device-and-healthcare"],
  ["/software-product-testing-iv-v-certifications", "/iv-and-v"],
  ["/investors/secretarial-compliance-report", "/investors/annual-secretarial-compliance-report"],
  ["/investors/related-party-transactions", "/investors/disclosures-of-related-party-transactions"],
  ["/investors/transfer-equity-shares", "/investors/transfer-of-equity-shares-to-iepf"],
  ["/investors/notice", "/investors/notices"],
  ["/investors/quarterly-results", "/investors/financial-information"],
  ["/investors/annual-reports", "/investors/annual-report"],
  ["/investors/subsidiaries", "/investors/subsidiaries-financials"],
  ["/investors/ucupdividend", "/investors/unclaimed-unpaid-dividend"],
  ["/investors/committee-bod", "/investors/committees"],
  ["/investors/stock-exchange-filing", "/investors/stock-exchange-filings"],
]);

const normalizePathname = (pathname = "/") => {
  const rawPath = String(pathname || "/");
  const collapsedPath = rawPath.replace(/\/{2,}/g, "/");

  if (collapsedPath === "/") {
    return "/";
  }

  return collapsedPath.endsWith("/")
    ? collapsedPath.slice(0, -1)
    : collapsedPath;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const normalizedPathname = normalizePathname(pathname);

  if (pathname !== normalizedPathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalizedPathname;
    return NextResponse.redirect(url, 301);
  }

  if (normalizedPathname.startsWith("/press-releases/")) {
    const url = request.nextUrl.clone();
    url.pathname = normalizedPathname.replace(
      /^\/press-releases\//,
      "/investors/press-room/",
    );
    return NextResponse.redirect(url, 301);
  }

  if (normalizedPathname.startsWith("/board-of-director-profile/")) {
    const url = request.nextUrl.clone();
    url.pathname = normalizedPathname.replace(
      /^\/board-of-director-profile\//,
      "/board-of-directors/",
    );
    return NextResponse.redirect(url, 301);
  }

  const legacyRedirect = LEGACY_REDIRECTS.get(normalizedPathname);
  if (legacyRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = legacyRedirect;
    return NextResponse.redirect(url, 301);
  }

  if (!normalizedPathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const isAdminRoot = normalizedPathname === "/admin";

  if (!token && !isAdminRoot) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.searchParams.set("next", normalizedPathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|assets/).*)"],
};
