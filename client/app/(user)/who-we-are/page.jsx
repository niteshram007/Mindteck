export const revalidate = 300;
import SuccessStoryImage from "../../assets/images/success-story/smart-city.png";
import Breadcrumbs from "../Breadcrumbs";
import { axiosInstance } from "@/app/utils/axiosInstance";
import ContactForm from "@/components/common-client-component/form";
import parse from "html-react-parser";
import { MainNavBar } from "../../navbar";
import { UPLOADED_IMAGE_PATH } from "../../utils/constant";
import "../../style.css";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import Atlas from "../../assets/images/who-we-are/atlas.jpg";
import MindteckGlobe from "../../assets/images/who-we-are/whoweare-globe.png";
import CMMIDev from "../../assets/images/who-we-are/CMMI_DEV.png";
import Image from "next/image";
import CmsAssetImage from "@/components/common-client-component/CmsAssetImage";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import { buildPageMetadata, normalizeMetadataText } from "@/app/utils/staticPageMetadata";
import { unstable_cache } from "next/cache";

const GLOBAL_FOOTPRINT_CONTENT =
  "Our global footprint spans the United States (California and Florida), Canada (Ontario), India (Bengaluru, Kolkata, and Mumbai), Europe (the United Kingdom and Germany), the APAC region (Singapore and Malaysia), and the Middle East (Bahrain). We also operate two dedicated Development Centers in Bengaluru and Kolkata, strengthening our global delivery capabilities.";

const VISION_STATEMENT =
  "To be the engineering and technology partner that global innovators trust when the work is complex, the stakes are high, and execution cannot fail.";

const MISSION_STATEMENT =
  "Mindteck brings over 30 years of hands-on expertise in product engineering, embedded systems, AI, and enterprise data storage, including cloud-native storage platforms, distributed systems, and storage testing, to help clients across medical devices, semiconductors, life sciences, analytical instruments, energy utilities, manufacturing, and smart infrastructure build reliable products and systems, with the technical depth, rigorous process, and senior-level attention that complex engineering demands.";

const WHO_WE_ARE_META_DESCRIPTION =
  "Discover Mindteck -- a global engineering and technology solutions company with 30+ years of expertise across AI/ML, IoT, embedded systems, and product engineering.";

const getWhoWeArePageData = unstable_cache(
  async () => {
    const { data } = await axiosInstance.post("public/page/getTemplateByUrl", {
      url: "who-we-are",
    });

    return data ?? {};
  },
  ["public-page-who-we-are"],
  { revalidate: 300 },
);

const sanitizeWhoWeAreContent = (content = "") =>
  String(content || "")
    .replace(/Let[^<]*talk/gi, "")
    .replace(
      /<p>\s*Our global footprint spans the US[\s\S]*?<\/p>/i,
      `<p>${GLOBAL_FOOTPRINT_CONTENT}</p>`,
    )
    .replace(
      /Our global footprint spans the US[^<]*/i,
      GLOBAL_FOOTPRINT_CONTENT,
    )
    .replace(
      /View history/g,
      '<a href="/history.pdf" target="_blank" rel="noopener noreferrer" class="underline text-secondary font-semibold">View history</a>',
    );

export async function generateMetadata() {
  const { page } = await getWhoWeArePageData();
  const resolvedTitle = normalizeMetadataText(page?.title || "Who We Are");
  const resolvedKeywords = normalizeMetadataText(page?.metaKeyword || "");

  return buildPageMetadata({
    title: resolvedTitle,
    description: WHO_WE_ARE_META_DESCRIPTION,
    keywords: resolvedKeywords,
    canonicalPath: "/who-we-are",
  });
}
export default async function page() {
  const { page, template } = await getWhoWeArePageData();

  if (!(template && page)) {
    return null;
  }
  return (
    <div className="page-container bg-gray-100 font-inter pt-2 overflow-x-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className=" mt-3  z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div>
            <CmsAssetImage
              src={buildUploadedAssetUrl(page?.file?.filePath)}
              fallbackSrc={SuccessStoryImage.src}
              className="h-full w-full object-cover max-h-[360px]"
            />
          </div>
          <Breadcrumbs paths={["About Us", "Who We Are"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Who We Are
          </h1>
        </div>
      </section>

      <section className="bg-white text-black pt-10 pb-20 font-inter">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 md:gap-14 gap-y-5">
            <div className="col-span-8 ProseMirror">
              {parse(sanitizeWhoWeAreContent(template.main))}
              <hr className="my-5" />
              <div className="space-y-4">
                <div className="relative w-full text-center">
                  <img
                    src={
                      template?.first?.path
                        ? UPLOADED_IMAGE_PATH + template.first.path
                        : Atlas.src
                    }
                    alt="Atlas of Economic Complexity"
                    className="m-auto w-full max-w-[460px]"
                  />
                </div>
                <div className="border border-gray-200 rounded-md px-4 py-3">
                  <div className="space-y-3 text-md leading-7">
                    <p className="font-semibold">
                      Founding Member of &apos;The Atlas of Economic
                      Complexity&apos;
                    </p>
                    <p>
                      Mindteck works with the Center for International
                      Development (CID) at Harvard University - a leading
                      research hub focused on resolving the dilemmas of public
                      policy associated with generating stable, shared and
                      sustainable prosperity in developing countries. We are a
                      Founding Member of &apos;The Atlas of Economic
                      Complexity&apos;, and also provide ongoing technical
                      advisory and big data services for this important
                      resource.
                    </p>
                    <p>
                      &apos;The Atlas of Economic Complexity&apos; (
                      <a
                        href="https://atlas.cid.harvard.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline"
                      >
                        www.atlas.cid.harvard.edu
                      </a>
                      ) is a powerful, interactive tool that provides
                      visualizations of growth opportunities for over 170
                      countries worldwide. Investors, policymakers,
                      entrepreneurs, and academics use the tool to visualize a
                      country&apos;s global trade flows, track how these
                      dynamics change over time, and garner insights for
                      fueling economic growth around the globe.
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
              <div className="grid sm:grid-cols-12 grid-cols-1 gap-2">
                <div className="relative sm:col-span-3 col-span-12">
                  <img
                    src={
                      template?.second?.path
                        ? UPLOADED_IMAGE_PATH + template.second.path
                        : MindteckGlobe.src
                    }
                    alt="Mindteck global footprint"
                  />
                </div>
                <div className="sm:col-span-9  col-span-12 ProseMirror">
                  {parse(sanitizeWhoWeAreContent(template?.second?.content || ""))}
                </div>
              </div>
              <hr className="my-5" />
            </div>
            <div className="col-span-4 text-center space-y-8 md:sticky md:top-24 self-start">
              <div>
                <Image
                  src={CMMIDev}
                  width={315}
                  height={61}
                  alt="cmmi-dev/5"
                  className="m-auto"
                />
                <h1 className="text-xl font-semibold text-center mt-1 leading-relaxed">
                  Appraised at CMMI Dev
                  <br />
                  Version 2.0 Level 5
                </h1>
              </div>
              <div className="space-y-3 border border-secondary max-w-[315px] w-full m-auto px-2 py-3">
                <p className="text-xl font-bold mb-5">Clientele</p>
                <p className="text-[18px] ">Fortune 1000 Companies</p>
                <p className="text-[18px] ">Leading Universities</p>
                <p className="text-[18px] ">Government Entities</p>
                <p className="text-[18px] ">Start-ups</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f8f8] text-black pt-6 md:pt-10 pb-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-white border border-slate-200 rounded-md p-6">
              <h2 className="font-athelas text-3xl text-secondary mb-3">Vision</h2>
              <p className="text-md leading-7 text-justify">{VISION_STATEMENT}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-md p-6">
              <h2 className="font-athelas text-3xl text-secondary mb-3">Mission</h2>
              <p className="text-md leading-7 text-justify">{MISSION_STATEMENT}</p>
            </div>
          </div>
        </div>
      </section>
      <ContactForm requireManualCaptcha />
    </div>
  );
}
