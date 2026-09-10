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

const mapCaseStudyRoutes = async () => {
  try {
    const { data } = await axiosInstance.post(
      "public/case-study/getallByCategories",
      { categories: [] },
    );

    return (Array.isArray(data) ? data : [])
      .filter((item) => {
        if (!item?.title) return false;
        const isActive = item?.isActive;
        if (isActive === false || isActive === 0 || isActive === "false") return false;
        return true;
      })
      .map((item) => ({
        url: buildSiteUrl(
          `/case-study-detail/${encodeURIComponent(item.title.trim())}`,
        ),
        lastModified: item?.updatedAt || item?.createdAt || DEFAULT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.8,
      }));
  } catch (_error) {
    return [];
  }
};

const mapBrochureRoutes = async () => {
  try {
    const { data: categories } = await axiosInstance(
      "public/resource-category/getallActive",
    );

    const categoryList = Array.isArray(categories) ? categories : [];
    const brochureResponses = await Promise.all(
      categoryList.map(async (cat) => {
        try {
          const { data } = await axiosInstance.post(
            "public/brochure/getByResourceCategory",
            { categoryId: cat._id },
          );
          return Array.isArray(data) ? data : [];
        } catch (_err) {
          return [];
        }
      }),
    );

    const allBrochures = brochureResponses.flat();
    const uniqueBrochures = Array.from(
      new Map(
        allBrochures
          .filter((item) => {
            if (!item?.title) return false;
            const isActive = item?.isActive;
            if (isActive === false || isActive === 0 || isActive === "false")
              return false;
            return true;
          })
          .map((item) => [item.title.trim().toLowerCase(), item]),
      ).values(),
    );

    return uniqueBrochures.map((item) => ({
      url: buildSiteUrl(
        `/brochure-detail/${encodeURIComponent(item.title.trim())}`,
      ),
      lastModified: item?.updatedAt || item?.createdAt || DEFAULT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (_error) {
    return [];
  }
};

export default async function sitemap() {
  const [pressRoomRoutes, boardRoutes, managementRoutes, practiceRoutes, caseStudyRoutes, brochureRoutes] =
    await Promise.all([
      mapPressRoomRoutes(),
      mapLeadershipRoutes("Board of Director", "/board-of-directors"),
      mapLeadershipRoutes("Management Team", "/management-team"),
      mapLeadershipRoutes("Practice Team", "/practice-team"),
      mapCaseStudyRoutes(),
      mapBrochureRoutes(),
    ]);

  return [
    ...mapStaticRoutes(PUBLIC_SITE_ROUTES),
    ...pressRoomRoutes,
    ...boardRoutes,
    ...managementRoutes,
    ...practiceRoutes,
    ...caseStudyRoutes,
    ...brochureRoutes,
  ];
}

