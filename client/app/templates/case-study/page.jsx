"use client";
import { addUpdateCaseStudy } from "@/app/admin/api-hook/mutations";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import Image from "next/image";
import Banner from "../../assets/images/success-story/case-study-detail.png";
import Editor from "@/components/Editor/Editor";

export default function CaseStudyTemplate({ pageId, url, pageData, reload }) {
  const { toast } = useToast();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [mainContent, setMainContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    try {
      const req = {
        ...pageData,
        content: mainContent,
        isActive: true,
      };
      await addUpdateCaseStudy(req, pageData?._id);
      toast({
        variant: "success",
        title: "Successfully updated data!",
      });
      reload();
    } catch (error) {
      console.log("Exception while doing something:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  const generateImagePath = (imageDetail, contentSection) => {
    if (imageDetail && !imageDetail["filePath"]) {
      return undefined;
    }
    if (pageData?.file) {
      return UPLOADED_IMAGE_PATH + imageDetail?.filePath;
    }
    return TEMP_IMAGE_PATH + imageDetail?.filePath;
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
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });
      setSelectedImage(data);
      // Reset state after successful upload
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (pageData) {
      setMainContent(pageData?.content);
      setSelectedImage(pageData?.file ?? null);
    }
  }, [pageData]);

  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      {/* <input
        ref={fileRef}
        type="file"
        value=""
        className="hidden"
        onChange={handleImageChange}
      /> */}
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>

      <section>
        <div className="container p-0">
          <div className="grid grid-cols-1">
            <div className="relative">
              <Image
                width={1566}
                height={432}
                alt="iot"
                src={Banner.src}
                className="h-full w-full object-cover max-h-[432px]"
              />
              {/* {uploading && (
                <div className="flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="small"
                  className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  Edit
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <div className="container p-0 bg-white font-inter">
        <div className="md:px-8 sm:px-5 px-4 py-10">
          <div className="border-b-2 pb-3 mb-6">
            <h2 className=" font-normal text-xl text-secondary font-athelas">
              Case Study
            </h2>

            <h1 className="text-3xl  text-secondary mt-2 font-athelas">
              {pageData?.title}
            </h1>

            <p className="text-black font-normal mt-1 text-xl">
              {pageData?.description}
            </p>
          </div>

          <Editor defaultValue={pageData?.content} setContent={setMainContent}>
            <p className="text-black leading-relaxed mb-8 text-md">
              Mindteck successfully tackled the challenge of transmitting
              patient vitals from areas with poor mobile connectivity by
              upgrading firmware, enhancing communication protocols, and
              creating a robust cloud infrastructure. This project culminated in
              the development of a mobile app for physicians to remotely access
              vital patient data. Leveraging a diverse tech stack, Mindteck
              demonstrated its prowess in overcoming connectivity hurdles in
              remote patient monitoring, ultimately enhancing healthcare
              accessibility and efficiency.
            </p>

            {/* Approach */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-2">
                Approach
              </h3>
              <ul className="list-disc list-inside text-black space-y-1 text-md">
                <li>
                  Empowering healthcare innovation through advanced solutions
                </li>
                <li>Upgraded firmware to enhance device performance</li>
                <li>
                  Enhanced communication protocols to facilitate data transfer
                  in areas with poor mobile connectivity
                </li>
                <li>
                  Developed an optimized cloud-based infrastructure for reliable
                  data streaming
                </li>
                <li>
                  Created a mobile app for physicians to remotely access patient
                  data
                </li>
                <li>
                  Conducted thorough verification and validation of the product
                </li>
                <li>
                  Identified suitable hardware components to support enhanced
                  communication protocols
                </li>
                <li>
                  Leveraged product development and engineering expertise for
                  seamless integration
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-2">
                Solution
              </h3>
              <p className="text-black text-md mb-4">
                Mindteck's solutions redefine remote patient monitoring,
                enabling seamless access to vital data, and streamlining
                healthcare operations for enhanced efficiency and accessibility.
              </p>
              <ul className="space-y-2 text-black text-md">
                <li>
                  <span className="font-semibold text-black">
                    Firmware Upgrade:
                  </span>{" "}
                  Enhanced device performance and functionality to ensure
                  reliable data transmission.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Communication Protocol Enhancement:
                  </span>{" "}
                  Improved protocols to facilitate data transfer even in areas
                  with poor mobile connectivity, ensuring uninterrupted
                  communication between devices.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Optimized Cloud-based Infrastructure:
                  </span>{" "}
                  Developed a robust cloud-based approach for efficient data
                  drawing from remote locations to physicians.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Mobile App Development:
                  </span>{" "}
                  Created a user-friendly mobile application for physicians to
                  remotely view patient vitals, providing convenient access to
                  critical data.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Verification & Validation:
                  </span>{" "}
                  Conducted comprehensive testing to ensure reliability and
                  accuracy of the product, guaranteeing quality and
                  effectiveness.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Hardware Identification:
                  </span>{" "}
                  Identified suitable hardware components to support enhanced
                  communication protocols, ensuring seamless integration and
                  reliable data transmission.
                </li>
              </ul>
            </div>

            {/* Outcome */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Outcome</h3>
              <div className="grid grid-cols-1">
                <p className="text-black leading-relaxed text-md">
                  Mindteck's solution marks a notable advancement in remote
                  patient monitoring by overcoming connectivity challenges and
                  enabling physicians with real-time access to patient data.
                  Through technological innovation and robust cloud-based
                  infrastructure, Mindteck successfully enhanced healthcare
                  accessibility and efficiency. This project stands as a
                  testament to Mindteck's engineering expertise and commitment
                  to improving healthcare technology, streamlining patient care,
                  and empowering medical professionals worldwide. The solution
                  reinforces Mindteck's leadership in digital healthcare
                  connectivity and efficiency, underscoring Mindteck's
                  dedication to advancing healthcare technology.
                </p>
              </div>
            </div>
          </Editor>
        </div>
      </div>

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
