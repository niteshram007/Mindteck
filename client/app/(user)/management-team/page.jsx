export const revalidate = 300;
import { MainNavBar } from "@/app/navbar";
import AboutImage from "../../assets/images/banners-and-bg/about.jpg";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import Link from "next/link";
import BODTabs from "../board-of-directors/breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/management-team");

export default async function page() {
  const { data } = await axiosInstance("public/bod/getall", {
    params: {
      category: "Management Team",
    },
  });
  return (
    <div className="page-container bg-slate-100 font-inter pt-2 overflow-hidden ">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className="mt-2 z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <img
            src={AboutImage.src}
            className="h-full w-full  max-h-[250px] object-cover"
          />

          <Breadcrumbs paths={["About Us", "Management Team"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Management Team
          </h1>
          <BODTabs activeTab={"management-team"} />
        </div>
      </section>
      <section className="bg-white text-black pt-20 pb-20 z-10 relative">
        <div className="container">
          <div className="text-center">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 text-left">
              {data.map((el) => {
                const imageUrl =
                  UPLOADED_IMAGE_PATH + el?.passportImage?.filePath;
                const profileHref = `/management-team/${el._id}/${encodeURIComponent(
                  el.fullName,
                )}#info`;

                return (
                  <div className="mb-5" key={el._id}>
                    <Card className="bg-[#D9D9D9] rounded-lg h-[290px] w-min-[250px] sm:w-full w-[277px] overflow-hidden align-bottom pt-10 group relative">
                      <Link href={profileHref}>
                        <Image
                          src={imageUrl}
                          width={319}
                          height={301}
                          alt={el.fullName}
                          sizes="(max-width: 640px) 277px, (max-width: 1024px) 33vw, 25vw"
                          className="absolute bottom-0 transition-all filter grayscale group-hover:grayscale-0 object-contain w-full  m-auto"
                        />
                      </Link>
                    </Card>
                    <h3 className="font-semibold text-2xl mt-2">
                      <Link href={profileHref}>{el.fullName}</Link>
                    </h3>
                    <h6 className="text-[17px] text-gray-700">
                      {el.designation}
                    </h6>
                    {el.description ? (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {el.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
