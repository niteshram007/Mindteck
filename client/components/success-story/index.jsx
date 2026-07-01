"use client";

import dynamic from "next/dynamic";

const SuccessStoryContent = dynamic(() => import("./content"), {
  ssr: false,
  loading: () => (
    <div className="max-w-full px-10 py-6 text-center">
      <p className="text-sm text-gray-600">Loading case studies...</p>
    </div>
  ),
});

export default function SuccessStory() {
  return <SuccessStoryContent />;
}
