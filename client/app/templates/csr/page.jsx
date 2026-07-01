"use client";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";
import React, { useEffect, useState } from "react";
import AboutImage from "../../assets/images/banners-and-bg/about.jpg";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import UploadImage from "./upload-image";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { useToast } from "@/hooks/use-toast";
import { addUpdateTemplateData } from "@/app/admin/api-hook/mutations";

export default function CSR({ pageId, url, pageData, reload }) {
  const { template } = pageData || {};
  const { toast } = useToast();
  const [mainContent, setMainContent] = useState("");
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");
  const [firstImageList, setFirstImageList] = useState([]);
  const [secondImageList, setSecondImageList] = useState([]);
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImageType, setUploadImageType] = useState("");
  const handleSubmit = async () => {
    try {
      const req = {
        pageId,
        templateName: "CSR",
        mainContent: mainContent.replace(
          '<p classname="text-md" dir="auto"></p>',
          "<br/>"
        ),
        csr: [
          {
            content: firstContent.replace(
              '<p classname="text-md" dir="auto"></p>',
              "<br/>"
            ),
            images: firstImageList.map((el) => ({
              path: el?.path,
              title: el.title,
            })),
          },
          {
            content: secondContent.replace(
              '<p classname="text-md" dir="auto"></p>',
              "<br/>"
            ),
            images: secondImageList?.map((el) => ({
              path: el?.path,
              title: el?.title,
            })),
          },
        ],
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
    if (template) {
      setFirstImageList(
        template.csr[0].images.map((el) => ({ ...el, isExist: true }))
      );
      setSecondImageList(
        template.csr[1].images.map((el) => ({ ...el, isExist: true }))
      );
    }
  }, [template]);
  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      {openUploadImage && (
        <UploadImage
          onClose={() => {
            setOpenUploadImage(false);
            setUploadImageType("");
            setIsEdit(false);
            setSelectedImage(null);
          }}
          imageType={uploadImageType}
          setSecondImageList={setSecondImageList}
          setFirstImageList={setFirstImageList}
          selectedImage={selectedImage}
          isEdit={isEdit}
        />
      )}
      <section className="mt-3">
        <div className="container">
          <div className="">
            <img
              src={AboutImage.src}
              className="h-full w-full  max-h-[500px] object-cover"
            />
          </div>

          <Breadcrumbs paths={["board-of-directors"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Corporate Social Responsibility
          </h1>
        </div>
      </section>
      <section className="bg-white text-black pt-10 pb-20 font-inter">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <Editor
                defaultValue={template?.mainContent}
                setContent={setMainContent}
              >
                <p className="text-md">
                  We Care is Mindtecks framework for honoring commitments and
                  making a lasting difference throughout the organization, as
                  well as externally to clients, partners and communities. The
                  cornerstones of the framework are Knowledge, Opportunity,
                  Advocacy, Inclusion, Goodwill and Respect.
                </p>

                <p className="text-md">
                  Care is rooted in the ways we engage and enable, and
                  fundamental to building and nurturing relationships,
                  championing others and stewarding community causes.
                </p>

                <p className="text-md">
                  We Care Ambassadors represent our brand and, in concert with
                  others in the company, work to ensure a positive experience.
                  This includes, but is not limited to, fostering a caring
                  culture and business approach.
                </p>

                <p className="text-md">
                  Our Corporate Social Responsibility (CSR) commitment is part
                  of We Care. We believe that through our successes around the
                  globe, we should give back in kind and deed. We do what we can
                  to create shared value and steward our resources to create
                  hopeful tomorrows for others.
                </p>

                <p className="text-md">
                  Core pillars of our CSR endeavors are Global Education and
                  Local Targeted Giving. We believe in the empowerment of
                  knowledge and how it helps to bring positive change and
                  stability to society as a whole; we also know that giving to
                  local organizations that embrace the interests and values of
                  the communities we serve builds stronger communities and makes
                  business sense.
                </p>
              </Editor>
              <div>
                <Editor
                  defaultValue={template?.csr[0]?.content}
                  setContent={setFirstContent}
                >
                  <p className="text-md">India CSR</p>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Organization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-md">Bengaluru</td>
                        <td className="text-md">
                          Gandhi Old Age Home - Donated an ambulance, a
                          commercial washer/dryer, kitchen equipment, the
                          installation of a solar transformer, and provided
                          other infrastructure support to Gandhi Old Age Home, a
                          government-recognized institution dedicated to the
                          welfare of the aged and neglected.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Samarthanam Trust - Empowers visually impaired,
                          disabled and underprivileged individuals through
                          developmental initiatives focused on education,
                          social, economic independence and technology. Provided
                          targeted funding to enhance the state-of-the-art
                          computer lab.
                        </td>
                      </tr>

                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Rotary Club of Bombay Kandivali Charitable Trust -
                          Repair and major revamp of toilet blocks on suburban
                          railway stations from Virar to Churchgate (Mumbai) for
                          local stations.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Government High School and Pre-University College for
                          Girls via Bangalore Indiranagar Rotary Trust -
                          Supports academic improvement, extracurricular
                          activities and sanitation facilities.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Mantra4Change - Addresses the lack of delivery of
                          quality education in under-resourced schools. Mindteck
                          contributed towards the 'School Readiness Program' for
                          Early Childhood Education (ECE) for five schools
                          located in Bengaluru. Conducted 25 training programs
                          for teachers and 25 counselling sessions for parents
                          and children alike, including storytelling techniques.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Pink Parking for Bhopal Smart City - Mindteck funded
                          the Pink Parking project for the city of Bhopal. The
                          dedicated women-only parking spaces were inaugurated
                          on Womens Day at three different sites (New Market,
                          Pragati, and 10 No. Market).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Editor>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {firstImageList?.map((el, index) => {
                  const ImagePath = el.isExist
                    ? UPLOADED_IMAGE_PATH
                    : TEMP_IMAGE_PATH;
                  return (
                    <div key={el} className="relative">
                      <img src={ImagePath + el?.path} />
                      <p className="text-md italic text-center mt-2">
                        {el?.title}
                      </p>
                      <div className="absolute  inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          size="small"
                          className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
                          onClick={() => {
                            setUploadImageType("first");
                            setOpenUploadImage(true);
                            setIsEdit(true);
                            setSelectedImage(el);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <Button
                  onClick={() => {
                    setOpenUploadImage(true);
                    setUploadImageType("first");
                  }}
                >
                  Add New Image
                </Button>
              </div>

              <div>
                <Editor
                  defaultValue={template?.csr[1]?.content}
                  setContent={setSecondContent}
                >
                  <p className="text-md">US CSR</p>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Organization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-md">Bengaluru</td>
                        <td className="text-md">
                          Gandhi Old Age Home - Donated an ambulance, a
                          commercial washer/dryer, kitchen equipment, the
                          installation of a solar transformer, and provided
                          other infrastructure support to Gandhi Old Age Home, a
                          government-recognized institution dedicated to the
                          welfare of the aged and neglected.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Samarthanam Trust - Empowers visually impaired,
                          disabled and underprivileged individuals through
                          developmental initiatives focused on education,
                          social, economic independence and technology. Provided
                          targeted funding to enhance the state-of-the-art
                          computer lab.
                        </td>
                      </tr>

                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Rotary Club of Bombay Kandivali Charitable Trust -
                          Repair and major revamp of toilet blocks on suburban
                          railway stations from Virar to Churchgate (Mumbai) for
                          local stations.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Government High School and Pre-University College for
                          Girls via Bangalore Indiranagar Rotary Trust -
                          Supports academic improvement, extracurricular
                          activities and sanitation facilities.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Mantra4Change - Addresses the lack of delivery of
                          quality education in under-resourced schools. Mindteck
                          contributed towards the 'School Readiness Program' for
                          Early Childhood Education (ECE) for five schools
                          located in Bengaluru. Conducted 25 training programs
                          for teachers and 25 counselling sessions for parents
                          and children alike, including storytelling techniques.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-md"></td>
                        <td className="text-md">
                          Pink Parking for Bhopal Smart City - Mindteck funded
                          the Pink Parking project for the city of Bhopal. The
                          dedicated women-only parking spaces were inaugurated
                          on Womens Day at three different sites (New Market,
                          Pragati, and 10 No. Market).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Editor>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {secondImageList?.map((el) => {
                  const ImagePath = el.isExist
                    ? UPLOADED_IMAGE_PATH
                    : TEMP_IMAGE_PATH;
                  return (
                    <div key={el} className="relative">
                      <img src={ImagePath + el?.path} />
                      <p className="text-md italic text-center mt-2">
                        {el?.title}
                      </p>
                      <div className="absolute  inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          size="small"
                          className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
                          onClick={() => {
                            setUploadImageType("second");
                            setOpenUploadImage(true);
                            setIsEdit(true);
                            setSelectedImage(el);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <Button
                  onClick={() => {
                    setOpenUploadImage(true);
                    setUploadImageType("second");
                  }}
                >
                  Add New Image
                </Button>
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
