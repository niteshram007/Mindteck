export const revalidate = 300;
import AboutImage from "../../../assets/images/banners-and-bg/about.jpg";
import MemberDetailBg from "../../../assets/images/banners-and-bg/member-detail-bg.png";
import { MainNavBar } from "@/app/navbar";
import Breadcrumbs from "../../Breadcrumbs";
import parse from "html-react-parser";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import BODTabs from "../../board-of-directors/breadcrumbs";
import dynamic from "next/dynamic";
import {
  buildLeadershipMetadata,
  buildLeadershipPersonJsonLd,
} from "@/app/utils/leadershipSeo";
import { notFound } from "next/navigation";

const LeadershipSlider = dynamic(
  () => import("@/components/common-client-component/leadership-slider"),
  { ssr: false },
);

export async function generateMetadata({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const memberId = slug[0];

  if (!memberId) {
    return buildLeadershipMetadata({
      member: {},
      basePath: "/practice-team",
      teamLabel: "Practice Team",
    });
  }

  const { data } = await axiosInstance(`public/bod/getById/${memberId}`);

  return buildLeadershipMetadata({
    member: data || {},
    basePath: "/practice-team",
    teamLabel: "Practice Team",
  });
}

export default async function page({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug : [];
  const memberId = slug[0];

  if (!memberId) {
    notFound();
  }

  const [memberResponse, allMemberResponse] = await Promise.all([
    axiosInstance(`public/bod/getById/${memberId}`),
    axiosInstance("public/bod/getall", {
      params: {
        category: "Practice Team",
      },
    }),
  ]);
  const data = memberResponse?.data;
  const allMember = allMemberResponse?.data;

  if (!data?._id) {
    notFound();
  }

  const profileImageUrl = data?.profileImage?.filePath
    ? `${UPLOADED_IMAGE_PATH}${data.profileImage.filePath}`
    : "";
  const personJsonLd = buildLeadershipPersonJsonLd({
    member: data,
    basePath: "/practice-team",
    teamLabel: "Practice Team",
    imageUrl: profileImageUrl,
  });

  return (
    <div className="page-container bg-gray-100 font-inter pt-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />
      <MainNavBar hiddenSidebar />
      <section className="mt-3">
        <div className="container">
          <div className="">
            <img
              src={AboutImage.src}
              className="h-full w-full  max-h-[500px] object-cover"
            />
          </div>

          <Breadcrumbs paths={["Practice Team", data.fullName]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Leadership Team
          </h1>
          <BODTabs activeTab={"practice-team"} />
        </div>
      </section>

      <section
        className="py-10"
        id="info"
        style={{
          background: `url(${MemberDetailBg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-12 items-center md:gap-10 gap-y-3">
            <div className="md:col-span-8 col-span-12 ProseMirror leadership-detail-content text-justify [&_*]:text-justify">
              {parse(data.content)}
            </div>
            <div className="md:col-span-4 col-span-12 relative text-white">
              <div>
                <img src={profileImageUrl} alt={data.name} />
                <div className="absolute bg-[#84754EE5]/80 w-full text-center p-2 bottom-[0px]">
                  <h3 className="text-2xl font-semibold">{data.fullName}</h3>
                  <p className="text-sm">{data.designation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LeadershipSlider data={allMember || []} path={"/practice-team"} />
    </div>
  );
}
