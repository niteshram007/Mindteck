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

    const currentUrl = window.location.href;
    window.ZIPageurl = currentUrl;

    if (previousUrlRef.current === null) {
      previousUrlRef.current = currentUrl;
      return;
    }

    if (previousUrlRef.current === currentUrl) {
      return;
    }

    previousUrlRef.current = currentUrl;

    const triggerTracking = (retries = 5) => {
      try {
        if (typeof window.zitag?.GetListOfEntitlements === "function") {
          Promise.resolve(window.zitag.GetListOfEntitlements()).catch(() => {});
        } else if (retries > 0) {
          setTimeout(() => triggerTracking(retries - 1), 200);
        }
      } catch (_err) {}
    };

    triggerTracking();
  }, [pathname]);

  return null;
}
