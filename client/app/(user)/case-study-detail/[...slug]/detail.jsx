"use client";
import parse from "html-react-parser";
import CaseStudyGoBackButton from "./go-back-button";
import Script from "next/script";
import { useState } from "react";

const sanitizeCaseStudyHtml = (html) => {
  if (typeof html !== "string") {
    return "";
  }
  // Strip the hidden zoom script container before rendering visible text
  return html.replace(/<div data-zoom-script='true' style='display:none;'>(.*?)<\/div>/g, "");
};

const formatImageUrl = (url) => {
  let str = String(url || "").trim().replace(/^\/+/, "");
  if (!str) return "";
  if (str.startsWith("http") || str.startsWith("data:")) return str;
  
  if (str.startsWith("temp-images/")) {
    str = str.replace(/^temp-images\//, "");
  } else if (str.startsWith("images/")) {
    str = str.replace(/^images\//, "");
  }
  return `/images/${str}`;
};

export default function CaseStudyDetail({ data }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const title = data?.title || "Case Study";
  const description = data?.description || "";
  const rawContent = data?.content || "<p>Content unavailable.</p>";
  const content = sanitizeCaseStudyHtml(rawContent);
  const fallbackImage = data?.file?.filePath || "";

  let zoomScriptCode = "";
  const zoomMatch = rawContent.match(/<div data-zoom-script='true' style='display:none;'>(.*?)<\/div>/);
  if (zoomMatch) {
    try {
      const decoded = atob(zoomMatch[1]);
      zoomScriptCode = decoded.replace(/<\/?script[^>]*>/gi, "");
    } catch (e) {}
  }

  // Fallback hardcoded zoom script specifically for SECS/GEM page if none provided via CMS
  if (title === "SECS/GEM Transaction Intelligence Agent" && !zoomScriptCode) {
    zoomScriptCode = `window[(function(_AmI,_Vz){var _y5='';for(var _qz=0;_qz<_AmI.length;_qz++){_y5==_y5;var _Mt=_AmI[_qz].charCodeAt();_Mt!=_qz;_Mt-=_Vz;_Mt+=61;_Mt%=94;_Mt+=33;_Vz>1;_y5+=String.fromCharCode(_Mt)}return _y5})(atob('X05Vd3Rvamh5UGp+'), 5)] = '3d6514f1db1679915974';     var zi = document.createElement('script');     (zi.type = 'text/javascript'),     (zi.async = true),     (zi.src = (function(_h0h,_rJ){var _PV='';for(var _bu=0;_bu<_h0h.length;_bu++){_rJ>9;_PV==_PV;_wX!=_bu;var _wX=_h0h[_bu].charCodeAt();_wX-=_rJ;_wX+=61;_wX%=94;_wX+=33;_PV+=String.fromCharCode(_wX)}return _PV})(atob('eykpJShNQkJ9KEEvfEAodid8JSkoQXYkIkIvfEApdHpBfSg='), 19)),     document.readyState === 'complete'?document.body.appendChild(zi):     window.addEventListener('load', function(){         document.body.appendChild(zi)     });`;
  }

  return (
    <>
      <div className="container p-0 bg-white font-inter">
        {zoomScriptCode && (
          <Script 
            id="zoom-tracking-script" 
            strategy="afterInteractive" 
            dangerouslySetInnerHTML={{ __html: zoomScriptCode }} 
          />
        )}
        <div className="md:px-8 sm:px-5 px-4 py-10">
          <CaseStudyGoBackButton />
          <div className="border-b-2 pb-3 mb-6">
            <h2 className=" font-normal text-xl text-secondary font-athelas">
              Case Study
            </h2>
            <h1 className="text-3xl  text-secondary mt-2 font-athelas">{title}</h1>
            <p className="text-black font-normal mt-1 text-xl">{description}</p>
          </div>
          <div className="ProseMirror case-study-prose">
            {parse(content, {
              replace: (domNode) => {
                if (domNode.type === 'tag' && domNode.name === 'img') {
                  const attribs = domNode.attribs || {};
                  let src = attribs.src || "";
                  
                  if (!src || /^blob:/i.test(src)) {
                    return null; // Don't show broken image icons
                  }
                  
                  const finalSrc = formatImageUrl(src);
                  if (!finalSrc) return null;
                  
                  const className = [
                    attribs.class, 
                    attribs.className, 
                    "mx-auto mb-6 mt-2 rounded-xl cursor-pointer transition-transform hover:scale-[1.01]"
                  ].filter(Boolean).join(" ");
                  
                  return (
                    <img
                      {...attribs}
                      src={finalSrc}
                      alt={attribs.alt || title}
                      className={className}
                      style={{ ...attribs.style, cursor: "pointer", maxWidth: "100%", height: "auto" }}
                      loading={attribs.loading || "lazy"}
                      decoding="async"
                      onClick={() => setLightboxImage({ src: finalSrc, alt: attribs.alt || title })}
                    />
                  );
                }
              }
            })}
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 transition-opacity"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button 
              type="button" 
              className="absolute -top-10 right-0 rounded-full bg-white/20 px-3 py-1 text-white hover:bg-white/40 font-semibold"
              onClick={() => setLightboxImage(null)}
            >
              Close ✕
            </button>
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt} 
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </>
  );
}
