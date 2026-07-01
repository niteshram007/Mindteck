"use client";

import { Button } from "../ui/button";

const FEEDBACK_SECTION_ID = "feedback-form-section";
const FIRST_NAME_INPUT_SELECTOR = "input[name='firstName'], #feedback-first-name";

export default function ContactFormVariantTwo({ btnText = "Connect with us" }) {
  const normalizedBtnText =
    String(btnText || "").trim().toLowerCase() === "talk to our experts"
      ? "Connect with us"
      : btnText || "Connect with us";

  const scrollToFeedbackForm = () => {
    const section = document.getElementById(FEEDBACK_SECTION_ID);
    const firstNameInput = section?.querySelector(FIRST_NAME_INPUT_SELECTOR);

    if (firstNameInput) {
      firstNameInput.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        if (typeof firstNameInput.focus === "function") {
          firstNameInput.focus();
        }
      }, 350);
      return;
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={scrollToFeedbackForm}
      className="h-auto min-h-[60px] rounded-2xl px-8 py-4 md:px-12 text-lg md:text-[21px] font-athelas font-normal tracking-[0.01em] shadow-[0_16px_32px_rgba(132,117,78,0.28)] bg-secondary text-white hover:bg-secondary hover:text-white"
    >
      {normalizedBtnText}
    </Button>
  );
}
