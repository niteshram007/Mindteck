import { MainNavBar } from "@/app/navbar";
import BannerImage from "../../assets/images/banners-and-bg/resources.png";
import Breadcrumbs from "@/app/(user)/Breadcrumbs";

import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import CaseStudyList from "./case-study-list";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";
import { unstable_cache } from "next/cache";

export const metadata = getStaticPageMetadata("/resources");

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CMS_API_BASE ||
  "https://www.mindteck.com/api/";

const DEFAULT_RESOURCE_CATEGORY = {
  _id: "case-studies",
  title: "Case Studies",
  subTitle: "",
};

const isResourceActive = (isActiveValue) => {
  if (isActiveValue === null || isActiveValue === undefined) {
    return true;
  }

  if (typeof isActiveValue === "boolean") {
    return isActiveValue;
  }

  if (typeof isActiveValue === "number") {
    return isActiveValue === 1;
  }

  if (typeof isActiveValue === "string") {
    const normalizedValue = isActiveValue.trim().toLowerCase();
    return !["false", "0", "inactive", "no"].includes(normalizedValue);
  }

  return Boolean(isActiveValue);
};

const getLeafMenuItems = (items = []) => {
  const leaves = [];

  const walk = (nodes = []) => {
    nodes.forEach((node) => {
      if (node?.url && node.url !== "#") {
        leaves.push({
          _id: node._id,
          label: node.label,
          url: node.url,
        });
      }

      if (Array.isArray(node?.children) && node.children.length > 0) {
        walk(node.children);
      }
    });
  };

  walk(items);

  const uniqueByUrl = new Map();
  leaves.forEach((leaf) => {
    if (!uniqueByUrl.has(leaf.url)) {
      uniqueByUrl.set(leaf.url, leaf);
    }
  });

  return [...uniqueByUrl.values()];
};

const fetchPublicData = async (path, init = {}) => {
  try {
    const response = await fetch(new URL(path, API_BASE_URL), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return { success: false, data: null };
    }

    return {
      success: true,
      data: await response.json(),
    };
  } catch (_error) {
    return { success: false, data: null };
  }
};

const normalizeResourceCategories = (items = []) => {
  const normalized = Array.isArray(items) ? items : [];
  const cleaned = normalized
    .map((item) => {
      const orderValue = Number(item?.order);
      return {
        _id: item?._id || item?.id || "",
        title: (item?.title || "").trim(),
        subTitle: item?.subTitle || "",
        order: Number.isFinite(orderValue) ? orderValue : 999,
      };
    })
    .filter((item) => item._id && item.title);

  const sorted = [...cleaned].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });

  let resourceCategories = sorted.length ? sorted : [];
  const hasCaseStudyCategory = resourceCategories.some(
    (item) => item.title.toLowerCase() === "case studies",
  );

  if (!hasCaseStudyCategory) {
    resourceCategories = [DEFAULT_RESOURCE_CATEGORY, ...resourceCategories];
  }

  if (!resourceCategories.length) {
    resourceCategories = [DEFAULT_RESOURCE_CATEGORY];
  }

  const caseStudyCategory = resourceCategories.find(
    (item) => item.title.toLowerCase() === "case studies",
  );

  return {
    resourceCategories,
    selectedResourceId:
      caseStudyCategory?._id || resourceCategories[0]?._id || DEFAULT_RESOURCE_CATEGORY._id,
  };
};

const getInitialResourcesData = unstable_cache(
  async () => {
    const [menuResponse, categoryResponse, caseStudyResponse] = await Promise.all([
      fetchPublicData("public/menu/getallHierarchically/main"),
      fetchPublicData("public/resource-category/getallActive"),
      fetchPublicData("public/case-study/getallByCategories", {
        method: "POST",
        body: JSON.stringify({ categories: [] }),
      }),
    ]);

    const filterOptions = (Array.isArray(menuResponse.data) ? menuResponse.data : [])
      .filter((menu) => menu.label !== "About Us" && menu.label !== "Solutions")
      .map((menu) => ({
        _id: menu._id,
        label: menu.label,
        items: getLeafMenuItems(menu.children || []),
      }))
      .filter((menu) => menu.items.length > 0);

    const { resourceCategories, selectedResourceId } =
      normalizeResourceCategories(categoryResponse.data);

    return {
      filterOptions,
      resourceCategories,
      selectedResourceId,
      caseStudyList: Array.isArray(caseStudyResponse.data)
        ? caseStudyResponse.data.filter((item) => isResourceActive(item?.isActive))
        : [],
      caseStudyFetched: caseStudyResponse.success,
    };
  },
  ["public-resources-initial-data"],
  { revalidate: 300 },
);

export default async function page() {
  const initialResourcesData = await getInitialResourcesData();

  return (
    <div className="page-container bg-slate-100 font-inter pt-2 overflow-hidden">
      <div className="container relative">
        <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
      </div>
      <GeometricShapes />

      <section className="mt-3 z-10 relative">
        <MainNavBar hiddenSidebar />
        <div className="container">
          <img
            src={BannerImage.src}
            alt="Resources"
            width={1600}
            height={500}
            className="h-full w-full  max-h-[500px] object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <Breadcrumbs paths={["Resources", "Case Studies"]} />
          <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
            Resources
          </h1>
        </div>
      </section>
      <CaseStudyList
        initialFilterOptions={initialResourcesData.filterOptions}
        initialResourceCategories={initialResourcesData.resourceCategories}
        initialSelectedResourceId={initialResourcesData.selectedResourceId}
        initialCaseStudyList={initialResourcesData.caseStudyList}
        initialCaseStudyFetched={initialResourcesData.caseStudyFetched}
      />
    </div>
  );
}
