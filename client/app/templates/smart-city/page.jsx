"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import SuccessStoryImage from "../../assets/images/success-story/smart-city.png";
import SuccessStoryImage1 from "../../assets/images/success-story/smart-citty-2.png";
import SuccessStoryImage2 from "../../assets/images/success-story/smart-parking.png";
import SuccessStoryImage3 from "../../assets/images/success-story/metering.png";
import SuccessStoryImage4 from "../../assets/images/success-story/health-care.png";

import SuccessStoryOne from "../../assets/images/success-story/success-story1.png";
import Breadcrumbs from "../../(user)/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Editor from "@/components/Editor/Editor";
import { useToast } from "@/hooks/use-toast";
import { addUpdateTemplateData } from "@/app/admin/api-hook/mutations";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import ContactForm from "@/components/common-client-component/form";
import Link from "next/link";

export default function SmartCity({ pageId, url, pageData, reload }) {
  const { page, template } = pageData ?? {};
  const fileRef = useRef();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [bannerTitle, setBannerTitle] = useState("");
  const [title, setTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [titleSecondary, setTitleSecondary] = useState("");
  const [contentF1, setContentF1] = useState("");
  const [contentF2, setContentF2] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [uploadedImageFor, setUploadImageFor] = useState("");
  const [uploadedImages, setUploadedImages] = useState({
    CF2: "",
    C2: "",
    C3: "",
    C4: "",
    C5: "",
    C6: "",
    banner: "",
  });
  let regex = /<p\s+class="text-md"\s+dir="auto"\s*><\/p>/g;
  const handleSubmit = async () => {
    try {
      const req = {
        pageId,
        templateName: "Smart City",
        bannerTitle: bannerTitle.replace(
          '<p classname="text-md" dir="auto"></p>',
          "<br/>"
        ),
        bannerDescription,
        title,
        titleSecondary: titleSecondary,
        first: {
          contentOne: contentF1.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          contentTwo: contentF2.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["CF2"]["filePath"] ?? "",
        },
        second: {
          content: second.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["C2"]["filePath"] ?? "",
        },
        third: {
          content: third.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["C3"]["filePath"] ?? "",
        },
        four: {
          content: four.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["C4"]["filePath"] ?? "",
        },
        five: {
          content: five.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["C5"]["filePath"] ?? "",
        },
        six: {
          content: six.replace(
            '<p classname="text-md" dir="auto"></p>',
            "<br/>"
          ),
          path: uploadedImages["C6"]["filePath"] ?? "",
        },
      };
      const isEditMode = template !== null;
      await addUpdateTemplateData(req, url, isEditMode);
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added data!",
      });
      reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  useEffect(() => {
    setUploadedImages((ps) => ({
      ...ps,
      CF2: { filePath: template?.first?.path ?? "" },
      C2: { filePath: template?.second?.path ?? "" },
      C3: { filePath: template?.third?.path ?? "" },
      C4: { filePath: template?.four?.path ?? "" },
      C5: { filePath: template?.five?.path ?? "" },
      C6: { filePath: template?.six?.path ?? "" },
    }));
  }, [template]);

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
      setUploadedImages((ps) => ({ ...ps, [uploadedImageFor]: data }));
      // setFileDetail(data);
      // Reset state after successful upload
      setUploadImageFor("");
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };
  const generateImagePath = (imageDetail, contentSection) => {
    const mapping = {
      CF2: "first",
      C2: "second",
      C3: "third",
      C4: "four",
      C5: "five",
      C6: "six",
    };
    if (!imageDetail["filePath"]) {
      return undefined;
    }
    if (
      template &&
      imageDetail["filePath"] === template[mapping[contentSection]]["path"]
    ) {
      return UPLOADED_IMAGE_PATH + imageDetail?.filePath;
    }
    return TEMP_IMAGE_PATH + imageDetail?.filePath;
  };

  return (
    <>
      {/* for all file upload  */}
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
      <div className="page-container bg-gray-100 font-inter pt-2">
        <section className="mt-3">
          <div className="container">
            <div className="header-banner">
              <div className="grid grid-cols-12 items-stretch align-middle">
                <div
                  className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4  py-5 px-10"
                  style={{
                    background:
                      "radial-gradient(72.49% 393.21% at 73.49% 49.05%, #004730 0%, #05191A 84.04%)",
                  }}
                >
                  <div className="flex-col flex h-full justify-center items-center gap-5">
                    <Editor
                      setContent={setBannerTitle}
                      hideToolBar
                      defaultValue={template?.bannerTitle}
                    >
                      <h1>Smart City Solutions for a Connected Future</h1>
                    </Editor>
                    <hr className="border border-secondary w-full" />
                    <Editor
                      setContent={setBannerDescription}
                      hideToolBar
                      defaultValue={template?.bannerDescription}
                    >
                      <p>
                        Transform urban living with intelligent systems for
                        traffic management, energy efficiency, e-governance, and
                        smart healthcare.
                      </p>
                    </Editor>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-8">
                  <img
                    src={
                      page?.file?.filePath
                        ? UPLOADED_IMAGE_PATH + page?.file?.filePath
                        : SuccessStoryImage.src
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <Breadcrumbs />
            <Editor setContent={setTitle} defaultValue={template?.title} />
          </div>
        </section>

        <section className="bg-[#F7F8F8] text-black pt-10 pb-20">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <Editor
                  setContent={setContentF1}
                  defaultValue={template?.first.contentOne}
                >
                  <h2 className="text-black text-3xl">
                    Powering a Sustainable Future
                  </h2>
                  <p className="text-md italic mb-5">
                    Innovative smart energy solutions that optimize efficiency,
                    reduce costs, and drive sustainability across industries.
                  </p>

                  <p className="text-md text-black">
                    As urban populations continue to grow, cities face
                    increasing pressure to manage resources efficiently, reduce
                    congestion, enhance public services, and ensure sustainable
                    development. Traditional infrastructure struggles to keep
                    pace with these demands, leading to challenges such as
                    traffic bottlenecks, energy wastage, inefficient governance,
                    and inadequate healthcare systems. Without smart solutions
                    that leverage advanced technologies like IoT, automation,
                    and data analytics, cities risk falling behind in delivering
                    the quality of life and economic opportunities that citizens
                    and businesses expect.
                  </p>
                  <h3 className="font-semibold text-xl mt-10 mb-2">
                    {" "}
                    Implementing smart city solutions addresses critical urban
                    challenges by:
                  </h3>
                  <ul className="text-md pl-10 list-disc">
                    <li>
                      <i className="font-semibold text-sm">
                        {" "}
                        Optimizing Resource Usage:
                      </i>{" "}
                      Enhancing energy efficiency, waste management, and water
                      conservation.
                    </li>
                    <li>
                      <i className="font-semibold text-sm">
                        Improving Mobility:
                      </i>{" "}
                      Reducing congestion through intelligent traffic management
                      systems.
                    </li>
                    <li>
                      <i className="font-semibold text-sm">
                        Enhancing Public Services:
                      </i>{" "}
                      Streamlining e-governance processes and healthcare
                      delivery.
                    </li>
                    <li>
                      <i className="font-semibold text-sm">
                        {" "}
                        Driving Economic Growth:
                      </i>{" "}
                      Creating new business opportunities and improving
                      operational efficiency.
                    </li>
                    <li>
                      <i className="font-semibold text-sm">
                        {" "}
                        Promoting Sustainability:
                      </i>{" "}
                      Lowering carbon footprints with smart infrastructure and
                      eco-friendly solutions.
                    </li>
                  </ul>
                  <p className="text-md mt-10">
                    By adopting these solutions, cities can not only meet the
                    demands of rapid urbanization but also improve residents
                    quality of life and ensure long-term sustainable growth.
                  </p>
                </Editor>
              </div>
              <div className="col-span-4">
                <Card className="rounded-3xl text-center shadow-none border-none pt-5">
                  <CardContent>
                    <Editor
                      setContent={setContentF2}
                      hideToolBar
                      defaultValue={template?.first.contentTwo}
                    >
                      <h2 className="text-primary text-4xl font-athelas mb-2">
                        Transform Your
                        <br />
                        City Today
                      </h2>
                      <p className="text-sm">
                        Explore how our smart city solutions can accelerate
                        growth, optimize resources, and enhance citizen
                        well-being.
                      </p>
                    </Editor>
                    <div className="relative">
                      <img
                        src={
                          generateImagePath(uploadedImages["CF2"], "CF2") ??
                          SuccessStoryImage1.src
                        }
                        width={"299"}
                        height={"248"}
                        alt="success-story"
                        className="mt-2 m-auto"
                      />
                      {uploading && uploadedImageFor === "CF2" && (
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
                            setUploadImageFor("CF2");
                            fileRef.current.click();
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="py-6 border border-white mt-4 rounded-lg"
                    >
                      Get In Touch
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-5">
          <h2 className="text-3xl">
            <Editor
              setContent={setTitleSecondary}
              defaultValue={template?.titleSecondary}
            />
          </h2>
        </div>
        <section className="bg-white py-11 mb-4">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <Editor
                  setContent={setSecond}
                  defaultValue={template?.second.content}
                >
                  <h3 className="text-secondary font-bold text-2xl mb-3">
                    Smart Parking
                  </h3>

                  <p className="text-md">
                    Mindteck offers three versatile smart parking solutions:
                    ZigBee sensor-based, ultrasonic sensor-based, and Wi-Fi
                    camera-based, tailored for street-side, indoor, and
                    multi-level parking environments.
                    <br />
                    <br /> Our latest Car Parking Occupancy Detection and
                    Management solution leverages Wi-Fi-based cameras to deliver
                    a robust, reliable, and cost-effective end-to-end system. It
                    features outdoor HD cameras, Wi-Fi routers, and range
                    extenders to ensure optimal coverage, supported by
                    high-performance server infrastructure for seamless
                    operation.
                  </p>
                </Editor>
              </div>
              <div className="col-span-4 text-center">
                <div className="relative">
                  <img
                    src={
                      generateImagePath(uploadedImages["C2"], "C2") ??
                      SuccessStoryImage2.src
                    }
                    alt="success-story"
                    className="w-full max-h-[400px] h-full "
                  />
                  {uploading && uploadedImageFor === "C2" && (
                    <div className=" flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
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
                        setUploadImageFor("C2");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-11 mb-4">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-4 text-center">
                <div className="relative">
                  <img
                    src={
                      generateImagePath(uploadedImages["C3"], "C3") ??
                      SuccessStoryImage3.src
                    }
                    alt="success-story"
                    className="w-full max-h-[400px] h-full "
                  />
                  {uploading && uploadedImageFor === "C3" && (
                    <div className=" flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
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
                        setUploadImageFor("C3");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <Editor
                  setContent={setThird}
                  defaultValue={template?.third.content}
                >
                  <h3 className="text-secondary font-bold text-2xl mb-3">
                    Smart Metering
                  </h3>
                  <p className="text-md">
                    Mindteck offers three versatile smart parking solutions:
                    ZigBee sensor-based, ultrasonic sensor-based, and Wi-Fi
                    camera-based, tailored for street-side, indoor, and
                    multi-level parking environments.
                    <br />
                    <br /> Our latest Car Parking Occupancy Detection and
                    Management solution leverages Wi-Fi-based cameras to deliver
                    a robust, reliable, and cost-effective end-to-end system. It
                    features outdoor HD cameras, Wi-Fi routers, and range
                    extenders to ensure optimal coverage, supported by
                    high-performance server infrastructure for seamless
                    operation.
                  </p>
                </Editor>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-11 mb-4">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <Editor
                  setContent={setFour}
                  defaultValue={template?.four.content}
                >
                  <h3 className="text-secondary font-bold text-2xl mb-3">
                    Smart Healthcare
                  </h3>
                  <p className="text-md">
                    Mindteck recently collaborated with a European medical
                    device manufacturer to secure FDA approval for an innovative
                    patient monitoring solution. We developed the complete
                    software for their portable telemedicine remote diagnostic
                    device, designed to monitor key vital signs and transmit
                    real-time medical data to healthcare providers remotely.
                    <br />
                    <br /> Our latest Car Parking Occupancy Detection and
                    Management solution leverages Wi-Fi-based cameras to deliver
                    a robust, reliable, and cost-effective end-to-end system. It
                    features outdoor HD cameras, Wi-Fi routers, and range
                    extenders to ensure optimal coverage, supported by
                    high-performance server infrastructure for seamless
                    operation.
                  </p>
                </Editor>
              </div>
              <div className="col-span-4 text-center">
                <div className="relative">
                  <img
                    src={
                      generateImagePath(uploadedImages["C4"], "C4") ??
                      SuccessStoryImage4.src
                    }
                    alt="success-story"
                    className="w-full max-h-[400px] h-full "
                  />
                  {uploading && uploadedImageFor === "C4" && (
                    <div className=" flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
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
                        setUploadImageFor("C4");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-11 mb-4">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-4 text-center">
                <div className="relative">
                  <img
                    src={
                      generateImagePath(uploadedImages["C5"], "C5") ??
                      SuccessStoryImage4.src
                    }
                    alt="success-story"
                    className="w-full max-h-[400px] h-full "
                  />
                  {uploading && uploadedImageFor === "C5" && (
                    <div className=" flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
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
                        setUploadImageFor("C5");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <Editor
                  setContent={setFive}
                  defaultValue={template?.five.content}
                >
                  <h3 className="text-secondary font-bold text-2xl mb-3">
                    Smart Lighting
                  </h3>
                  <p className="text-md leading-tight">
                    We developed an Intelligent Lighting Solution for a UK-based
                    utility company, enabling them to achieve record reductions
                    in energy consumption and CO2 emissions. Mindteck provided
                    end-to-end development of both the hardware and software for
                    the system. Before the installation of energy-efficient
                    lanterns, the street lighting consumed approximately 50
                    million kWh annually. This has now been successfully reduced
                    to 34 million kWh, marking a significant improvement in
                    sustainability.
                  </p>
                </Editor>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-11 mb-4">
          <div className="container">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <Editor
                  setContent={setSix}
                  defaultValue={template?.six?.content}
                >
                  <h3 className="text-secondary font-bold text-2xl mb-3">
                    Smart Building
                  </h3>
                  <h3 className="text-black/90 font-bold text-lg mb-3">
                    Building Efficiency, Power, and Sustainability
                  </h3>
                  <p className="text-md mb-4">
                    Mindteck implemented a building efficiency project to assess
                    the performance, effectiveness, and efficiency of various
                    building systems. The project included capabilities for
                    real-time monitoring, control, and management of test-bed
                    facilities to ensure safe, reliable, and energy-efficient
                    operations. Each room was equipped with multiple subsystems
                    for power control, configuration, consumption tracking, and
                    data analysis, enabling comprehensive energy management.
                  </p>
                  <h3 className="text-black font-bold text-xl mb-3">
                    Building Integrated Microgrid for Power Management
                  </h3>
                  <p className="text-md mb-4">
                    Our latest Car Parking Occupancy Detection and Management
                    solution leverages Wi-Fi-based cameras to deliver a robust,
                    reliable, and cost-effective end-to-end system. It features
                    outdoor HD cameras, Wi-Fi routers, and range extenders to
                    ensure optimal coverage, supported by high-performance
                    server infrastructure for seamless operation.
                  </p>
                </Editor>
              </div>
              <div className="col-span-4 text-center">
                <div className="relative">
                  <img
                    src={
                      generateImagePath(uploadedImages["C6"], "C6") ??
                      SuccessStoryImage3.src
                    }
                    alt="success-story"
                    className="w-full max-h-[400px] h-full "
                  />
                  {uploading && uploadedImageFor === "C6" && (
                    <div className=" flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3 top-0">
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
                        setUploadImageFor("C6");
                        fileRef.current.click();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
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
        <section className="text-black pt-10 pb-20 success-story text-center ">
          <div className="max-w-full px-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-secondary">
              Success Stories
            </h1>
            <p className="text-xl text-center mb-16 mt-5 font-normal">
              Uncover success stories that showcase Mindteck&apos;s ability to
              deliver
              <br />
              customized solutions and measurable outcomes across industries.
            </p>

            <div className="grid grid-cols-4 gap-6 ">
              <div className="success-story-container mb-3">
                <div className="img-container p-1 bg-white">
                  <img
                    src={SuccessStoryOne.src}
                    alt="success-story"
                    className="w-full max-h-[430px] h-full"
                  />
                </div>
                <p className="text-xl font-normal mt-2">
                  Big Data Analytics for a Leading Analytical Instrument Company
                </p>
              </div>

              <div className="success-story-container mb-3">
                <div className="img-container p-1 bg-white">
                  <img
                    src={SuccessStoryOne.src}
                    alt="success-story"
                    className="w-full max-h-[430px] h-full"
                  />
                </div>
                <p className="text-xl font-normal mt-2">
                  Remote Patient Monitoring Device Enhancements
                </p>
              </div>

              <div className="success-story-container mb-3">
                <div className="img-container p-1 bg-white">
                  <img
                    src={SuccessStoryOne.src}
                    alt="success-story"
                    className="w-full max-h-[430px] h-full"
                  />
                </div>
                <p className="text-xl font-normal mt-2">
                  Wearable Device Solution Increases Manufacturing Productivity
                  by 20%
                </p>
              </div>

              <div className="success-story-container mb-3">
                <div className="img-container p-1 bg-white">
                  <img
                    src={SuccessStoryOne.src}
                    alt="success-story"
                    className="w-full max-h-[430px] h-full"
                  />
                </div>
                <p className="text-xl font-normal mt-2">
                  Sustainable IoT Solution for Soil Condition Monitoring
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href={"/"}
                className="font-athelas text-lg font-normal p-3 bg-primary text-white rounded-md text-mdF"
              >
                Explore more...
              </Link>
            </div>
          </div>
        </section>
        <ContactForm />
      </div>
    </>
  );
}
