import parse from "html-react-parser";
import CaseStudyGoBackButton from "./go-back-button";

const sanitizeCaseStudyHtml = (html) => {
  if (typeof html !== "string") {
    return "";
  }

  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/&lt;script\b[\s\S]*?&lt;\/script&gt;/gi, "")
    .replace(/window\[\(function\(_AmI,_Vz\)[\s\S]*?appendChild\(zi\);\s*}\);\s*/gi, "");
};

export default function CaseStudyDetail({ data }) {
  const title = data?.title || "Case Study";
  const description = data?.description || "";
  const rawContent = data?.content || "<p>Content unavailable.</p>";
  const content = sanitizeCaseStudyHtml(rawContent);

  return (
    <div className="container p-0 bg-white font-inter">
      <div className="md:px-8 sm:px-5 px-4 py-10">
        <CaseStudyGoBackButton />
        <div className="border-b-2 pb-3 mb-6">
          <h2 className=" font-normal text-xl text-secondary font-athelas">
            Case Study
          </h2>
          <h1 className="text-3xl  text-secondary mt-2 font-athelas">{title}</h1>
          <p className="text-black font-normal mt-1 text-xl">{description}</p>
        </div>
        <div className="ProseMirror case-study-prose">{parse(content)}</div>
      </div>
    </div>
  );
}
