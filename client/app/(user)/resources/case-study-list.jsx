"use client";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CmsAssetImage from "@/components/common-client-component/CmsAssetImage";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

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

export default function CaseStudyList({
  initialFilterOptions = [],
  initialResourceCategories = [DEFAULT_RESOURCE_CATEGORY],
  initialSelectedResourceId = DEFAULT_RESOURCE_CATEGORY._id,
  initialCaseStudyList = [],
  initialCaseStudyFetched = false,
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [caseStudyList, setCaseStudyList] = useState(initialCaseStudyList);
  const [brochureList, setBrochureList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [resourceCategories, setResourceCategories] = useState(
    initialResourceCategories.length
      ? initialResourceCategories
      : [DEFAULT_RESOURCE_CATEGORY],
  );
  const [selectedResourceId, setSelectedResourceId] = useState(
    initialSelectedResourceId || initialResourceCategories[0]?._id || DEFAULT_RESOURCE_CATEGORY._id,
  );

  const selectedResource = useMemo(() => {
    return (
      resourceCategories.find((item) => item._id === selectedResourceId) ||
      resourceCategories[0] ||
      DEFAULT_RESOURCE_CATEGORY
    );
  }, [resourceCategories, selectedResourceId]);

  const isCaseStudyCategory =
    (selectedResource?.title || "").trim().toLowerCase() === "case studies";
  const skippedInitialCaseStudyFetchRef = React.useRef(false);

  const careStudyFilterOptions = async () => {
    try {
      const { data } = await axiosInstance(
        "public/menu/getallHierarchically/main",
      );

      const groupedOptions = (data || [])
        .filter(
          (menu) => menu.label !== "About Us" && menu.label !== "Solutions",
        )
        .map((menu) => ({
          _id: menu._id,
          label: menu.label,
          items: getLeafMenuItems(menu.children || []),
        }))
        .filter((menu) => menu.items.length > 0);

      setFilterOptions(groupedOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResourceCategories = async () => {
    try {
      const { data } = await axiosInstance(
        "public/resource-category/getallActive",
      );
      const normalized = Array.isArray(data) ? data : [];
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

      let resolvedCategories = sorted.length ? sorted : [];
      const hasCaseStudy = resolvedCategories.some(
        (item) => item.title.toLowerCase() === "case studies",
      );
      if (!hasCaseStudy) {
        resolvedCategories = [DEFAULT_RESOURCE_CATEGORY, ...resolvedCategories];
      }
      if (!resolvedCategories.length) {
        resolvedCategories = [DEFAULT_RESOURCE_CATEGORY];
      }

      setResourceCategories(resolvedCategories);

      const caseStudyOption = resolvedCategories.find(
        (item) => item.title.toLowerCase() === "case studies",
      );
      setSelectedResourceId(
        caseStudyOption?._id || resolvedCategories[0]._id,
      );
    } catch (error) {
      console.log(error);
      setResourceCategories([DEFAULT_RESOURCE_CATEGORY]);
      setSelectedResourceId(DEFAULT_RESOURCE_CATEGORY._id);
    }
  };

  const getCaseStudyByCategories = useCallback(async () => {
    if (!isCaseStudyCategory) {
      setCaseStudyList([]);
      return;
    }

    try {
      setIsLoadingList(true);
      const { data } = await axiosInstance.post(
        "public/case-study/getallByCategories",
        { categories: selectedFilters },
      );
      const normalizedCaseStudies = (Array.isArray(data) ? data : []).filter(
        (item) => isResourceActive(item?.isActive),
      );
      setCaseStudyList(normalizedCaseStudies);
    } catch (error) {
      console.log(error);
      setCaseStudyList([]);
    } finally {
      setIsLoadingList(false);
    }
  }, [selectedFilters, isCaseStudyCategory]);

  const getBrochuresByCategory = useCallback(async () => {
    if (isCaseStudyCategory) {
      setBrochureList([]);
      return;
    }

    if (!selectedResourceId) {
      setBrochureList([]);
      return;
    }

    try {
      setIsLoadingList(true);
      const { data } = await axiosInstance.post(
        "public/brochure/getByResourceCategory",
        { categoryId: selectedResourceId },
      );
      setBrochureList(data || []);
    } catch (error) {
      console.log(error);
      setBrochureList([]);
    } finally {
      setIsLoadingList(false);
    }
  }, [isCaseStudyCategory, selectedResourceId]);

  useEffect(() => {
    if (!initialFilterOptions.length) {
      careStudyFilterOptions();
    }

    if (!initialResourceCategories.length) {
      fetchResourceCategories();
    }
  }, [initialFilterOptions.length, initialResourceCategories.length]);

  useEffect(() => {
    if (
      !skippedInitialCaseStudyFetchRef.current &&
      initialCaseStudyFetched &&
      isCaseStudyCategory &&
      selectedFilters.length === 0
    ) {
      skippedInitialCaseStudyFetchRef.current = true;
      return;
    }

    skippedInitialCaseStudyFetchRef.current = true;
    getCaseStudyByCategories();
  }, [getCaseStudyByCategories, initialCaseStudyFetched, isCaseStudyCategory, selectedFilters.length]);

  useEffect(() => {
    getBrochuresByCategory();
  }, [getBrochuresByCategory]);

  const handleCheck = (itemUrl) => {
    if (selectedFilters.includes(itemUrl)) {
      setSelectedFilters((prev) => prev.filter((el) => el !== itemUrl));
      return;
    }

    setSelectedFilters((prev) => [...prev, itemUrl]);
  };

  const activeList = useMemo(() => {
    if (isCaseStudyCategory) {
      return caseStudyList.filter((item) => isResourceActive(item?.isActive));
    }

    return brochureList.filter((item) => isResourceActive(item?.isActive));
  }, [brochureList, caseStudyList, isCaseStudyCategory]);

  return (
    <section className="bg-white text-black pt-20 pb-20 z-10 relative font-inter">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-3 col-span-12">
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700">Resources</p>
              <Select
                value={selectedResourceId}
                onValueChange={setSelectedResourceId}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Resource" />
                </SelectTrigger>
                <SelectContent>
                  {resourceCategories.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedResource?.subTitle ? (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedResource.subTitle}
                </p>
              ) : null}
            </div>

            {isCaseStudyCategory
              ? filterOptions.map((el) => (
                  <div className="mb-[40px]" key={el._id}>
                    <h4 className="mb-2 text-xl font-[500]">{el.label}</h4>
                    <ul className="flex flex-col gap-3">
                      {el.items.map((item) => {
                        const checkboxId = `filter-${el._id}-${item._id}`;

                        return (
                          <li
                            key={`${el._id}-${item._id}`}
                            className="flex gap-2 items-center"
                          >
                            <Checkbox
                              id={checkboxId}
                              checked={selectedFilters.includes(item.url)}
                              className="border-[#858484]"
                              onCheckedChange={() => handleCheck(item.url)}
                            />
                            <label
                              htmlFor={checkboxId}
                              className="text-sm font-inter font-normal cursor-pointer"
                            >
                              {item.label}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              : null}
          </div>

          <div className="md:col-span-9 col-span-12">
            <motion.div
              layout
              className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 text-left"
            >
              <AnimatePresence>
                {!isLoadingList && activeList?.map((el) => {
                  const imageUrl = buildUploadedAssetUrl(el?.file?.filePath);
                  const isCaseStudy = isCaseStudyCategory;
                  const fallbackResourceTitle =
                    selectedResource?.title || "Resource";
                  const itemTitle =
                    el?.title ||
                    (isCaseStudy ? "Case Study" : fallbackResourceTitle);
                  const itemDescription = isCaseStudy
                    ? el?.description || ""
                    : el?.subTitle || el?.description || "";
                  const isWhitepaperCategory = ["whitepaper", "white paper"].includes(
                    (selectedResource?.title || "").trim().toLowerCase(),
                  );
                  const normalizedTitle = String(itemTitle || "").trim().toLowerCase();
                  const isLegacyWaferWhitepaper =
                    isWhitepaperCategory &&
                    (normalizedTitle === "ai driven aoi-based wafer defect classification system" ||
                      normalizedTitle.includes("wafer defect classification"));
                  const detailHref = isCaseStudy
                    ? `/case-study-detail/${encodeURIComponent(itemTitle)}`
                    : isLegacyWaferWhitepaper
                      ? "/white-paper/AI-driven-Fault-Inspection"
                      : `/brochure-detail/${encodeURIComponent(itemTitle)}`;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-5"
                      key={el._id}
                    >
                      <Link href={detailHref} className="block" prefetch={false}>
                        {imageUrl ? (
                          <CmsAssetImage
                            src={imageUrl}
                            width={220}
                            height={220}
                            alt={itemTitle}
                            className="transition-all filter w-full m-auto h-[220px] rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-full h-[220px] rounded-xl bg-gray-200" />
                        )}
                      </Link>

                      <h3 className="font-[500] text-1xl mt-2 font-inter min-h-[56px]">
                        <Link
                          href={detailHref}
                          prefetch={false}
                          className="block line-clamp-2"
                        >
                          {itemTitle}
                        </Link>
                      </h3>

                      <div className="flex items-end gap-1">
                        <p className="text-md text-black font-[300] line-clamp-2 flex-1">
                          {itemDescription}
                        </p>
                        <Link href={detailHref} prefetch={false}>
                          <ArrowRight
                            className="inline text-[#000000B2] shrink-0"
                            size={18}
                          />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {isLoadingList && (
              <p className="text-sm text-gray-600">
                {isCaseStudyCategory
                  ? "Loading case studies..."
                  : "Loading resources..."}
              </p>
            )}

            {!isLoadingList && (!activeList || activeList.length === 0) && (
              <p className="text-sm text-gray-600">
                {isCaseStudyCategory
                  ? "No case studies found for selected filters."
                  : "No brochures found for selected resource."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
