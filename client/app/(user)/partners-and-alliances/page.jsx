export const revalidate = 300;
import { axiosInstance } from "@/app/utils/axiosInstance";
import { MainNavBar } from "@/app/navbar";
import Breadcrumbs from "../Breadcrumbs";
import AboutImage from "../../assets/images/banners-and-bg/about.jpg";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
export const metadata = {
  title: "Partners And Alliances",
  description:
    "Know about partners and IOT alliances of mindteck. Mindteck is a Founding Member of 'Atlas online' at Harvard University.",
  keywords:
    "mindteck partners and alliances, atlas online, harvard university, iot alliances",
};
export default async function page() {
  const { data } = await axiosInstance("public/partners-and-alliances/getall");
  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <div className="">
            <img
              src={AboutImage.src}
              className="h-full w-full  max-h-[360px] object-cover"
            />
          </div>

          <Breadcrumbs paths={["partners-and-alliances"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Partners And Alliances
          </h1>
        </div>
      </section>
      <section className="bg-white text-black pt-20 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 text-left">
            {data?.map((el) => {
              const imageUrl = UPLOADED_IMAGE_PATH + el?.file?.filePath;

              return (
                <Card
                  key={el._id}
                  className="mb-5 bg-[#f6f6f6] border-2 border-transparent rounded-lg  sm:w-full overflow-hidden hover:border-[#004e42] hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#004e42] transition-[0.3s]"
                >
                  <Image
                    src={imageUrl}
                    width={319}
                    height={301}
                    alt={el.file.filePath}
                    className="mix-blend-multiply"
                  />
                </Card>
              );
            })}
          </div>
        </div>
        <p className="text-center text-sm mt-3">
          To become a partner, please write to us at:{" "}
          <a
            href="mailto:info@mindteck.us"
            className="text-blue-700 font-[500]"
          >
            info@mindteck.us
          </a>
        </p>
      </section>
    </div>
  );
}
