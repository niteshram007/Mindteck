"use client";

import { useEffect, useMemo, useState } from "react";
import { encodeAssetUrl } from "@/app/utils/cmsAssetPath";

export default function CmsAssetImage({
  src = "",
  fallbackSrc = "",
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  ...props
}) {
  const normalizedSrc = useMemo(() => encodeAssetUrl(src), [src]);
  const normalizedFallbackSrc = useMemo(
    () => encodeAssetUrl(fallbackSrc),
    [fallbackSrc],
  );
  const [currentSrc, setCurrentSrc] = useState(
    normalizedSrc || normalizedFallbackSrc || "",
  );

  useEffect(() => {
    setCurrentSrc(normalizedSrc || normalizedFallbackSrc || "");
  }, [normalizedFallbackSrc, normalizedSrc]);

  if (!currentSrc) {
    return <div aria-hidden="true" className={className} />;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={() => {
        if (normalizedFallbackSrc && currentSrc !== normalizedFallbackSrc) {
          setCurrentSrc(normalizedFallbackSrc);
        }
      }}
      {...props}
    />
  );
}
