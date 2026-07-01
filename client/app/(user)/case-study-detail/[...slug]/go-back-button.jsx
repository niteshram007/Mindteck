"use client";

import { useRouter } from "next/navigation";

export default function CaseStudyGoBackButton() {
  const router = useRouter();

  const onBack = () => {
    router.push("/resources");
  };

  return (
    <button
      type="button"
      onClick={onBack}
      className="mb-4 rounded-md border border-[#0a4a3c] px-4 py-2 text-sm font-medium text-[#0a4a3c] transition-colors hover:bg-[#0a4a3c] hover:text-white"
    >
      Back to Case Studies
    </button>
  );
}
