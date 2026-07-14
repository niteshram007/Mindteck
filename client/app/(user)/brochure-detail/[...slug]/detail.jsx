"use client";

import { useState } from "react";
import parse from "html-react-parser";
import { encodeAssetUrl } from "@/app/utils/cmsAssetPath";

const sanitizeBrochureHtml = (html) => {
  if (typeof html !== "string") {
    return "";
  }

  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/&lt;script\b[\s\S]*?&lt;\/script&gt;/gi, "")
    .replace(/window\[\(function\(_AmI,_Vz\)[\s\S]*?appendChild\(zi\);\s*}\);\s*/gi, "");
};

const resolveInlineImageSrc = (src = "", fallbackImage = "") => {
  const normalizedSrc = String(src || "").trim();

  if (!normalizedSrc) {
    return encodeAssetUrl(fallbackImage);
  }

  if (/^blob:/i.test(normalizedSrc)) {
    return encodeAssetUrl(fallbackImage);
  }

  return encodeAssetUrl(normalizedSrc);
};

export default function BrochureDetail({
  data,
  fallbackImage = "",
  categoryTitle = "Brochures",
}) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const title = data?.title || "Brochure";
  const description = data?.subTitle || data?.description || "";
  const content = sanitizeBrochureHtml(
    data?.content || "<p>Content unavailable.</p>",
  );

  return (
    <div className="container p-0 bg-white font-inter">
      <div className="md:px-8 sm:px-5 px-4 py-10">
        <div className="border-b-2 pb-3 mb-6">
          <h2 className=" font-normal text-xl text-secondary font-athelas">
            {categoryTitle || "Brochures"}
          </h2>
          <h1 className="text-3xl  text-secondary mt-2 font-athelas">{title}</h1>
          <p className="text-black font-normal mt-1 text-xl">{description}</p>
        </div>
        <div className="ProseMirror">
          {parse(content, {
            replace(node) {
              if (node?.type !== "tag" || node?.name !== "img") {
                return undefined;
              }

              const attributes = node.attribs || {};
              const resolvedSrc = resolveInlineImageSrc(
                attributes.src,
                fallbackImage,
              );

              if (!resolvedSrc) {
                return null;
              }

              const mergedClassName = [
                attributes.class,
                attributes.className,
                "mx-auto my-6 rounded-xl cursor-pointer transition-transform hover:scale-[1.01]",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <img
                  {...attributes}
                  src={resolvedSrc}
                  alt={attributes.alt || title}
                  className={mergedClassName}
                  style={{ ...attributes.style, cursor: "pointer", maxWidth: "100%", height: "auto" }}
                  loading={attributes.loading || "lazy"}
                  decoding="async"
                  onClick={() => setZoomedImage({ src: resolvedSrc, alt: attributes.alt || title })}
                />
              );
            },
          })}
        </div>
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 transition-opacity"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              type="button"
              className="absolute -top-10 right-0 rounded-full bg-white/20 px-3 py-1 text-white hover:bg-white/40 font-semibold"
              onClick={() => setZoomedImage(null)}
            >
              Close ✕
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
