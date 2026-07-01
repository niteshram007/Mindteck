"use client";

import { useEffect, useRef, useState } from "react";

const CEIPAL_WIDGET_SRC = "https://jobsapi.ceipal.com/APISource/widget.js";
const CEIPAL_API_KEY = "ODc5UlBIRlk3ckFvUWJCQXpUV1IrUT09";
const CEIPAL_PORTAL_ID = "UGtpQkJSTEZ3Z0xBaDdsN1QwOXBIUT09";

export default function CeipalJobsWidget({ jobId = "" }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [reloadCount, setReloadCount] = useState(0);

  const normalizedJobId = String(jobId || "").trim();
  const externalJobsUrl = normalizedJobId
    ? `https://careers.mindteck.com/us-jobs?job_id=${encodeURIComponent(normalizedJobId)}`
    : "https://careers.mindteck.com/us-jobs";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setStatus("loading");
    container.innerHTML = "";

    document.querySelectorAll("script[data-ceipal-api-key]").forEach((el) => {
      el.remove();
    });

    const script = document.createElement("script");
    script.id = "ceipal-us-jobs-widget-script";
    script.type = "text/javascript";
    script.src = CEIPAL_WIDGET_SRC;
    script.setAttribute("data-ceipal-api-key", CEIPAL_API_KEY);
    script.setAttribute("data-ceipal-career-portal-id", CEIPAL_PORTAL_ID);
    script.async = true;
    script.defer = true;

    let hasWidgetContent = false;
    const observer = new MutationObserver(() => {
      if (container.innerHTML.trim()) {
        hasWidgetContent = true;
        setStatus("loaded");
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const timeoutId = window.setTimeout(() => {
      if (!hasWidgetContent) {
        setStatus("error");
      }
    }, 15000);

    script.onload = () => {
      if (!container.innerHTML.trim()) {
        setStatus("loading");
      }
    };

    script.onerror = () => {
      setStatus("error");
    };

    document.body.appendChild(script);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      script.remove();
      container.innerHTML = "";
    };
  }, [reloadCount, normalizedJobId]);

  return (
    <div className="rounded-lg border border-[#d9d9d9] bg-white p-4 sm:p-6 shadow-sm">
      <div
        id="example-widget-container"
        ref={containerRef}
        className="min-h-[420px] overflow-x-auto"
      />

      {status === "loading" && (
        <p className="mt-4 text-sm text-gray-600">Loading US jobs...</p>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Unable to load jobs right now.
          <button
            type="button"
            onClick={() => {
              setReloadCount((prev) => prev + 1);
            }}
            className="ml-2 underline underline-offset-2"
          >
            Retry
          </button>
          <a
            href={externalJobsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 underline underline-offset-2"
          >
            Open on Careers Site
          </a>
        </div>
      )}
    </div>
  );
}