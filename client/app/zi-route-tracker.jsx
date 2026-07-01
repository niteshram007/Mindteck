"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ZIRouteTracker() {
  const pathname = usePathname();
  const previousUrlRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextUrl = window.location.href;
    window.ZIPageurl = nextUrl;

    if (previousUrlRef.current === null) {
      previousUrlRef.current = nextUrl;
      return;
    }

    if (previousUrlRef.current === nextUrl) {
      return;
    }

    previousUrlRef.current = nextUrl;

    if (typeof window.zitag?.GetListOfEntitlements === "function") {
      Promise.resolve(window.zitag.GetListOfEntitlements()).catch(() => {});
    }
  }, [pathname]);

  return null;
}
