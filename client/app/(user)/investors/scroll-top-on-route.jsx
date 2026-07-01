"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TOP_SCROLL_ROUTES = new Set(["/investors", "/investors/press-room"]);

export default function InvestorScrollTopOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TOP_SCROLL_ROUTES.has(pathname)) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
