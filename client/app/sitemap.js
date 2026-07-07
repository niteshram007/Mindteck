import { axiosInstance } from "@/app/utils/axiosInstance";
import { makePressReleaseSlug } from "@/app/utils/slug";
import {
  buildSiteUrl,
  dedupeSitePaths,
  PUBLIC_SITE_ROUTES,
} from "@/app/utils/siteSeo";

export const revalidate = 3600;

const DEFAULT_LAST_MODIFIED = new Date();

const mapStaticRoutes = (routes = []) =>
  dedupeSitePaths(routes).map((path) => ({
    url: buildSiteUrl(path),
    lastModified: DEFAULT_LAST_MODIFIED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/investors") ? 0.7 : 0.8,
  }));

const mapPressRoomRoutes = async () => {
  try {
    const { data } = await axiosInstance("public/press-release/getallPublished");
    const years = Object.keys(data || {});

    return years.flatMap((year) =>
      (Array.isArray(data?.[year]) ? data[year] : [])
        .filter((item) => item?._id)
        .map((item) => ({
          url: buildSiteUrl(
            `/investors/press-room/${item._id}/${makePressReleaseSlug(item?.title || "")}`,
          ),
          lastModified: item?.updatedAt || item?.publicationDate || DEFAULT_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
    );
  } catch (_error) {
    return [];
  }
};

const mapLeadershipRoutes = async (category, basePath) => {
  try {
    const { data } = await axiosInstance("public/bod/getall", {
      params: { category },
    });

    return (Array.isArray(data) ? data : [])
      .filter((item) => item?._id && item?.fullName)
      .map((item) => ({
        url: buildSiteUrl(
          `${basePath}/${item._id}/${encodeURIComponent(item.fullName)}`,
        ),
        lastModified: item?.updatedAt || item?.createdAt || DEFAULT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch (_error) {
    return [];
  }
};

export default async function sitemap() {
  const [pressRoomRoutes, boardRoutes, managementRoutes, practiceRoutes] =
    await Promise.all([
      mapPressRoomRoutes(),
      mapLeadershipRoutes("Board of Director", "/board-of-directors"),
      mapLeadershipRoutes("Management Team", "/management-team"),
      mapLeadershipRoutes("Practice Team", "/practice-team"),
    ]);

  return [
    ...mapStaticRoutes(PUBLIC_SITE_ROUTES),
    ...pressRoomRoutes,
    ...boardRoutes,
    ...managementRoutes,
    ...practiceRoutes,
  ];
}
