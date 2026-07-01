"use client";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";
import { addUpdateTemplateData } from "@/app/admin/api-hook/mutations";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useRef, useState } from "react";
import AboutImage from "../../assets/images/banners-and-bg/about.jpg";
import Atlas from "../../assets/images/who-we-are/atlas.jpg";
import MindteckGlobe from "../../assets/images/who-we-are/whoweare-globe.png";
import { axiosInstance } from "@/app/utils/axiosInstance";
import Image from "next/image";
import CMMIDev from "../../assets/images/who-we-are/CMMI_DEV.png";
import Engagement from "../../assets/images/who-we-are/engagement.png";

export default function WhoWeAre({ pageId, url, pageData, reload }) {
  const { template } = pageData || {};
  const { toast } = useToast();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [mainContent, setMainContent] = useState("");
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [uploadImageType, setUploadImageType] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleSubmit = async () => {
    try {
      const req = {
        pageId,
        templateName: "WHO_WE_ARE",
        main: mainContent.replaceAll(
          '<p classname="text-md" dir="auto"></p>',
          "<br/>"
        ),
        first: {
          content: firstContent.replaceAll(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: firstImage?.filePath ?? "",
        },
        second: {
          content: secondContent.replaceAll(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: secondImage?.filePath ?? "",
        },
      };
      const isEditMode = template !== null;
      await addUpdateTemplateData(req, url,isEditMode);
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added data!",
      });
      reload();
    } catch (error) {
      console.log(error, "error");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  const generateImagePath = (type) => {
    if (template && type === "first") {
      if (!firstImage?.filePath) {
        return undefined;
      }
      if (template.first.path === firstImage.filePath) {
        return UPLOADED_IMAGE_PATH + firstImage.filePath;
      }
      return TEMP_IMAGE_PATH + firstImage.filePath;
    }
    if (template && type === "second") {
      if (!secondImage?.filePath) {
        return undefined;
      }
      if (template.second.path === secondImage.filePath) {
        return UPLOADED_IMAGE_PATH + secondImage.filePath;
      }
      return TEMP_IMAGE_PATH + secondImage.filePath;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axiosInstance.post("page/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      if (uploadImageType === "first") {
        setFirstImage(data);
      }
      if (uploadImageType === "second") {
        setSecondImage(data);
      }
      // Reset state after successful upload
      setUploadImageType("");
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (template) {
      setFirstImage({ filePath: template.first.path });
      setSecondImage({ filePath: template?.second?.path });
    }
  }, [template]);
  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
      <section className="mt-3">
        <div className="container">
          <div className="">
            <img
              src={AboutImage.src}
              className="h-full w-full  max-h-[500px] object-cover"
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
            <div className="col-span-8">
              <Editor defaultValue={template?.main} setContent={setMainContent}>
                <p className="text-md">
                  We are the global engineering and technology solutions company
                  devoted to delivering knowledge that matters to help clients
                  compete, innovate and propel forward along the digital
                  continuum.
                </p>

                <p className="text-md">
                  Our legacy expertise in embedded systems, enterprise
                  applications and testing is a powerful complement to
                  competencies in digital engineering, including cloud, IoT and
                  cybersecurity, as well as data engineering services such as
                  AI/ML and analytics.
                </p>

                <p className="text-md">
                  Results-driven: Whether precision, sound product design,
                  faster development, or other business-critical outcomes are
                  desired, our metrics-based project and quality management
                  tools, methodologies and frameworks are designed to
                  consistently enhance performance benefits, reduce risk and
                  provide predictable results.
                </p>

                <p className="text-md">
                  Right-sized: We're small enough to be nimble, flexible and
                  accessible from the top down, plus have the resources,
                  experience and judgement to have been trusted for engagements
                  from a top-tier clientele around the globe for 30 years and
                  counting. View history
                </p>

                <p className="text-md">
                  Ready: We're ready to work for you - and with you - to help
                  you keep pace as you seek to ensure continued relevance for
                  the future. If you are aiming to adapt to digitalization,
                  strike a balance between quarterly growth and innovation,
                  optimize R&D spend and business operations, or manage shorter
                  development and deployment life cycles, we'd appreciate
                  connecting with you to explore how we can help you deliver
                  upon your core business objectives. Let's talk
                </p>
              </Editor>
              <hr className="my-5" />
              <div className="grid grid-cols-12 gap-2">
                <div className="relative col-span-6">
                  <img
                    src={generateImagePath("first") ?? Atlas.src}
                    alt="Atlas"
                  />
                  {uploading && uploadImageType === "first" && (
                    <div className="flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute  inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="small"
                      className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
                      onClick={() => {
                        setUploadImageType("first");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="col-span-6">
                  <Editor
                    defaultValue={template?.first.content}
                    setContent={setFirstContent}
                    hideToolBar
                  >
                    <p className="text-md">
                      Mindteck is a Founding Member of "The Atlas of Economic
                      Complexity" developed by the Center for International
                      Development (CID) at Harvard University. Read more
                    </p>
                  </Editor>
                </div>
              </div>
              <hr className="my-5" />
              <div className="grid grid-cols-12 gap-2">
                <div className="relative col-span-3">
                  <img
                    src={generateImagePath("second") ?? MindteckGlobe.src}
                    alt="MindteckGlobe"
                  />
                  {uploading && uploadImageType === "second" && (
                    <div className="flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute  inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="small"
                      className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
                      onClick={() => {
                        setUploadImageType("second");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="col-span-9">
                  <Editor
                    defaultValue={template?.second.content}
                    setContent={setSecondContent}
                    hideToolBar
                  >
                    <p className="text-md">
                      Our global footprint spans the US (California, New Jersey,
                      Missouri, Florida and Pennsylvania), Canada (Ontario),
                      India (Bengaluru, Kolkata, Mumbai), Europe (United Kingdom
                      and Germany), the APAC region (Singapore, Malaysia and
                      Philippines), and Middle East (Bahrain). We also have two
                      Development Centers - Kolkata and Bengaluru.
                    </p>
                  </Editor>
                </div>
              </div>
              <hr className="my-5" />
            </div>
            <div className="col-span-4 text-center space-y-8 ">
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
                  Version 1.3 Level 5
                </h1>
              </div>
              <Image
                src={Engagement}
                alt="Engagement"
                width={315}
                height={20}
                className="m-auto"
              />
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

      <Button
        onClick={handleSubmit}
        type="button"
        className="fixed right-10 bottom-[5%]"
      >
        Save Data
      </Button>
    </div>
  );
}
