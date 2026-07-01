"use client";
import SmartCity from "../smart-city/page";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
import CSR from "../csr/page";
import WhoWeAre from "../who-we-are/page";
import CaseStudyTemplate from "../case-study/page";

export default function DynamicPage({ params }) {
  const router = useRouter();
  const { slug } = params;
  const [pageData, setPageData] = useState(null);
  const getPageDataByUrl = async (url) => {
    try {
      let config = {
        url: "page/getTemplateByUrl",
        data: { url },
        method: "post",
      };
      if (slug[1] === "CASE_STUDY_DETAIL") {
        config = {
          url: "case-study/getCaseStudyById/" + slug[0],
          data: undefined,
          method: "get",
        };
      }
      const { data } = await axiosInstance(config);
      setPageData(data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const reloadData = () => {
    getPageDataByUrl(slug[2]);
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const tokenFromStorage = sessionStorage.getItem("token");
    if (slug[2] && user) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenFromStorage}`;
      getPageDataByUrl(slug[2]);
    } else {
      router.push("/login");
    }
  }, [slug]);

  return (
    <div>
      {slug[1] === "smart-city" && (
        <SmartCity
          pageId={slug[0]}
          url={slug[2]}
          pageData={pageData}
          reload={reloadData}
        />
      )}

      {slug[1] === "CSR" && (
        <CSR
          pageId={slug[0]}
          url={slug[2]}
          pageData={pageData}
          reload={reloadData}
        />
      )}
      {slug[1] === "WHO_WE_ARE" && (
        <WhoWeAre
          pageId={slug[0]}
          url={slug[2]}
          pageData={pageData}
          reload={reloadData}
        />
      )}
      {slug[1] === "CASE_STUDY_DETAIL" && (
        <CaseStudyTemplate
          pageId={slug[0]}
          url={slug[2]}
          pageData={pageData}
          reload={reloadData}
        />
      )}
    </div>
  );
}
