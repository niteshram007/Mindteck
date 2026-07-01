"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactFormV2 = dynamic(() => import("@/app/utils/ContactFormV2"), {
  ssr: false,
});

const HomeSuccessStories = dynamic(
  () => import("@/components/common-client-component/home-success-stories"),
  {
    ssr: false,
  },
);

function LazyMount({ children, placeholderClassName, rootMargin = "300px 0px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible || !containerRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        children
      ) : (
        <div aria-hidden="true" className={placeholderClassName} />
      )}
    </div>
  );
}

export function DeferredHomeSuccessStories() {
  return (
    <LazyMount placeholderClassName="min-h-[420px] w-full bg-white/20" rootMargin="400px 0px">
      <HomeSuccessStories />
    </LazyMount>
  );
}

export function DeferredContactFormV2() {
  return (
    <LazyMount
      placeholderClassName="min-h-[520px] rounded-2xl border border-slate-300 bg-white/70"
      rootMargin="400px 0px"
    >
      <ContactFormV2 />
    </LazyMount>
  );
}
