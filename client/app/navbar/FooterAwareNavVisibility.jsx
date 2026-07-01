"use client";

import { useEffect } from "react";

const HIDDEN_NAV_CLASSES = ["-translate-y-full", "opacity-0", "pointer-events-none"];

export default function FooterAwareNavVisibility() {
  useEffect(() => {
    const footer = document.querySelector('[data-site-footer="true"]');
    const navbars = Array.from(
      document.querySelectorAll('[data-main-navbar="true"]'),
    );

    if (!footer || navbars.length === 0 || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const showNavbars = () => {
      navbars.forEach((navbar) => {
        navbar.classList.remove(...HIDDEN_NAV_CLASSES);
      });
    };

    const hideNavbars = () => {
      navbars.forEach((navbar) => {
        navbar.classList.add(...HIDDEN_NAV_CLASSES);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          hideNavbars();
          return;
        }

        showNavbars();
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -96px 0px",
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      showNavbars();
    };
  }, []);

  return null;
}
