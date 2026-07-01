"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useCallback, useEffect } from "react";
import RecaptchaLogo from "../assets/images/recaptchaLogo.png";
import Image from "next/image";

const LOADING_MESSAGE = "reCAPTCHA is initializing. Please wait a moment.";

const ReCaptcha = ({ onVerify }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isRecaptchaReady = typeof executeRecaptcha === "function";

  const handleVerify = useCallback(async () => {
    if (!isRecaptchaReady) {
      setError(LOADING_MESSAGE);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = await executeRecaptcha("submit_form");
      onVerify(token);
    } catch (err) {
      console.error("reCAPTCHA Error:", err);
      onVerify("");
      setError("Failed to get reCAPTCHA token");
    } finally {
      setLoading(false);
    }
  }, [executeRecaptcha, isRecaptchaReady, onVerify]);

  useEffect(() => {
    if (isRecaptchaReady && error === LOADING_MESSAGE) {
      setError("");
    }
    if (isChecked && isRecaptchaReady && !loading) {
      void handleVerify();
    }
  }, [error, handleVerify, isChecked, isRecaptchaReady, loading]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      if (isRecaptchaReady) {
        void handleVerify();
      }
      return;
    }

    onVerify("");
    setError("");
  };

  return (
    <div className="flex flex-col ">
      <label className="flex items-center bg-white border border-[#d8d8d8] rounded-[3px] hover:shadow-sm transition-shadow duration-200 w-[300px] h-[60px] px-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
          data-sitekey="your-site-key"
          data-action="submit"
          disabled={loading || !isRecaptchaReady}
        />
        <div
          className={`w-[24px] h-[24px] border ${
            isChecked ? "bg-white border-[#009e55]" : "border-[#d8d8d8]"
          } rounded-[2px] mr-3 flex items-center justify-center transition-colors duration-200`}
        >
          {loading ? (
            <svg
              className="w-[18px] h-[18px] animate-spin text-[#009e55]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="3"
                strokeDasharray="31.4"
                strokeLinecap="round"
              />
            </svg>
          ) : isChecked ? (
            <svg
              className="w-[18px] h-[18px] text-[#009e55]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 12.5l5 5L20 7"
              />
            </svg>
          ) : null}
        </div>
        <span className="text-[14px] text-[#555] font-inter">
          I&apos;m not a robot
        </span>
        <div className="ml-auto">
          <Image
            src={RecaptchaLogo.src}
            alt="reCAPTCHA"
            width={50}
            height={50}
            className="w-[50px]"
          />
        </div>
      </label>
      {!isRecaptchaReady && (
        <p className="text-amber-700 text-sm mt-2">Loading reCAPTCHA...</p>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ReCaptcha;
