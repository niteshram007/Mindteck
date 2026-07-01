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

const mergeInlineImageStyle = (styleText = "", hasExplicitHeight = false) => {
  const normalizedStyle = String(styleText || "")
    .trim()
    .replace(/\s*;+\s*$/g, "");
  const hasMaxWidth = /(?:^|;)\s*max-width\s*:/i.test(normalizedStyle);
  const hasHeight = /(?:^|;)\s*height\s*:/i.test(normalizedStyle);
  const styleParts = [];

  if (normalizedStyle) {
    styleParts.push(normalizedStyle);
  }

  if (!hasMaxWidth) {
    styleParts.push("max-width:100%");
  }

  if (!hasHeight && !hasExplicitHeight) {
    styleParts.push("height:auto");
  }

  return styleParts.join("; ");
};

export default function BrochureDetail({ data, fallbackImage = "" }) {
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
            Brochures
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
                "mx-auto my-6 rounded-xl",
              ]
                .filter(Boolean)
                .join(" ");
              const mergedStyle = mergeInlineImageStyle(
                attributes.style,
                Boolean(attributes.height),
              );

              node.attribs = {
                ...attributes,
                src: resolvedSrc,
                alt: attributes.alt || title,
                class: mergedClassName,
                style: mergedStyle,
                loading: attributes.loading || "lazy",
                decoding: "async",
              };

              return undefined;
            },
          })}
        </div>
      </div>
    </div>
  );
}
