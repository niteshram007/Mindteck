import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axiosInstance";
import { useState } from "react";

const getRecencyTimestamp = (item) => {
  if (!item || typeof item !== "object") return 0;

  const updatedAt = Date.parse(item.updatedAt || "");
  if (Number.isFinite(updatedAt)) return updatedAt;

  const createdAt = Date.parse(item.createdAt || "");
  if (Number.isFinite(createdAt)) return createdAt;

  const idValue = String(item._id || "");
  const objectIdPrefix = idValue.slice(0, 8);
  if (/^[a-fA-F0-9]{8}$/.test(objectIdPrefix)) {
    return parseInt(objectIdPrefix, 16) * 1000;
  }

  return 0;
};

const sortNewestFirst = (items) =>
  [...items].sort((left, right) => getRecencyTimestamp(right) - getRecencyTimestamp(left));

const withNewestFirst = (value) =>
  Array.isArray(value) ? sortNewestFirst(value) : value;

export const useGetMenuCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      const { data } = await axiosInstance("menu/categories");
      return withNewestFirst(data);
    },
  });
  return { data, isLoading };
};

export const useGetAllMenus = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getAllMenus"],
    queryFn: async () => {
      const { data } = await axiosInstance("menu/getall");
      return withNewestFirst(data).map((el) => ({
        ...el,
        parent: el?.parent ? el?.parent : "-",
      }));
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllMenus"] });
  };
  return { data, isLoading, refetch };
};

export const useGetAllLeaders = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getAllLeaders"],
    queryFn: async () => {
      const { data } = await axiosInstance("leadership/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllLeaders"] });
  };
  return { data, isLoading, refetch };
};
export const useGetAllBOD = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getAllBOD"],
    queryFn: async () => {
      const { data } = await axiosInstance("bod/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = () => {
    queryClient.refetchQueries({ queryKey: ["getAllBOD"], type: "all" });
  };
  return { data, isLoading, refetch };
};
export const useGetAllCountry = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllCountry"],
    queryFn: async () => {
      const { data } = await axiosInstance("main-location/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllCountry"] });
  };
  return { data, isLoading, refetch };
};
export const useGetAllOffice = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllOffice"],
    queryFn: async () => {
      const { data } = await axiosInstance("office/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = (data) => {
    queryClient.refetchQueries({ queryKey: ["getAllOffice"], type: "all" });
  };
  return { data, isLoading, refetch };
};
export const useGetAllSlider = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllSlider"],
    queryFn: async () => {
      const { data } = await axiosInstance("slider/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllSlider"] });
  };
  return { data, isLoading, refetch };
};
export const useGetAllPages = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllPages"],
    queryFn: async () => {
      const { data } = await axiosInstance("page/getall");
      return withNewestFirst(data);
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllPages"] });
  };
  return { data, isLoading, refetch };
};
export const useGetAllUser = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: async () => {
      const { data } = await axiosInstance("user/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllJobCategory = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllJobCategory"],
    queryFn: async () => {
      const { data } = await axiosInstance("job-category/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllJobPost = ({
  categoryId,
  pageSize,
  page,
  reviewStatus,
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllJobPost", categoryId, pageSize, page, reviewStatus],
    queryFn: async () => {
      const { data } = await axiosInstance("job/getall", {
        params: {
          categoryId,
          pageSize,
          page: page + 1,
          reviewStatus,
        },
      });
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllJobsByUserId = ({ userId }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllJobsByUserId"],
    queryFn: async () => {
      const { data } = await axiosInstance(
        "job/get-jobs-by-userId-with-application-count"
      );
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const getAllApplicationByFilter = async ({ queryKey, signal }) => {
  const { data } = await axiosInstance(
    "application/getall-filter",
    {
      params: queryKey[1],
    },
    { signal }
  );
  return withNewestFirst(data);
};
export const useGetAllApplicationByFilter = ({ jobId, pageSize, page }) => {
  const [params, setParams] = useState({ jobId, pageSize, page: page + 1 });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllApplicationByFilter", params],
    queryFn: getAllApplicationByFilter,
    // enabled: !!params,
  });
  const refreshWithParams = (formData) => {
    if (formData) {
      let val = { jobId, pageSize, page: page + 1 };
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          val[key] = value;
        }
      });
      setParams({ ...val });
    }
  };

  return { data, isLoading, refreshWithParams, refetch };
};

export const useGetAllPartnerAndAlliances = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["PartnerAndAlliances"],
    queryFn: async () => {
      const { data } = await axiosInstance("partner-and-alliance/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllPressRelease = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllPressRelease"],
    queryFn: async () => {
      const { data } = await axiosInstance("press-release/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllCaseStudy = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["CaseStudy"],
    queryFn: async () => {
      const { data } = await axiosInstance("case-study/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllPolicyCategory = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllPolicyCategory"],
    queryFn: async () => {
      const { data } = await axiosInstance("policy-category/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllPolicy = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllPolicy"],
    queryFn: async () => {
      const { data } = await axiosInstance("policy/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllFinancialInformation = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllFinancialInformation"],
    queryFn: async () => {
      const { data } = await axiosInstance("financial-info/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllAnnualReport = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllAnnualReport"],
    queryFn: async () => {
      const { data } = await axiosInstance("annual-report/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllStockExchangeFilling = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllStockExchangeFilling"],
    queryFn: async () => {
      const { data } = await axiosInstance("stock-exchange-filing/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllBrochure = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Brochure"],
    queryFn: async () => {
      const { data } = await axiosInstance("brochure/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};


export const useGetAllResourceCategories = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["resourceCategories"],
    queryFn: async () => {
      const { data } = await axiosInstance("resource-category/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllNotice = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllNotice"],
    queryFn: async () => {
      const { data } = await axiosInstance("notice/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllCommittees = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllCommittees"],
    queryFn: async () => {
      const { data } = await axiosInstance("committee/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetInvestorByType = ({ type }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getInvestorByType", type],
    queryFn: async () => {
      const { data } = await axiosInstance("pdf-with-title/getall/" + type);
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetInvestorStaticPdf = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getInvestorStaticPdf"],
    queryFn: async () => {
      const { data } = await axiosInstance("pdf/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllShareHoldingPattern = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllShareHoldingPattern"],
    queryFn: async () => {
      const { data } = await axiosInstance("share-holding-pattern/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllSubsidiariesFinancial = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllSubsidiariesFinancial"],
    queryFn: async () => {
      const { data } = await axiosInstance("subsidiaries-financial/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
export const useGetAllPostalBallot = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllPostalBallot"],
    queryFn: async () => {
      const { data } = await axiosInstance("postal-ballot/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllInvestorFeedBack = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllInvestorFeedback"],
    queryFn: async () => {
      const [investorResponse, contactResponse] = await Promise.all([
        axiosInstance("investor-feedback/getall"),
        axiosInstance("contact/getall"),
      ]);

      const investorFeedback = (investorResponse?.data || []).map((item) => ({
        ...item,
        source: "Investors",
        name: `${item?.firstName || ""} ${item?.lastName || ""}`.trim() || "-",
        telephone: item?.telephone || "-",
        smsOptIn: null,
        emailOptIn: null,
        unsubscribed: typeof item?.unsubscribed === "boolean" ? item.unsubscribed : null,
        company: "-",
        country: "-",
        message: item?.comments || "-",
        page: item?.sourcePage || "-",
      }));

      const contactFeedback = (contactResponse?.data || []).map((item) => ({
        ...item,
        source: "Industries",
        name: item?.fullname || "-",
        telephone: item?.telephone || "-",
        smsOptIn: item?.smsOptIn === true,
        emailOptIn: item?.unsubscribed
          ? false
          : item?.emailOptIn ?? item?.marketingUpdates ?? false,
        unsubscribed: item?.unsubscribed === true,
        company: item?.company || "-",
        country: item?.country || "-",
        message: item?.message || "-",
        page: item?.sourcePage || "-",
      }));

      return [...contactFeedback, ...investorFeedback].sort((a, b) => {
        const aTime = new Date(a?.createdAt || 0).getTime();
        const bTime = new Date(b?.createdAt || 0).getTime();
        return bTime - aTime;
      });
    },
  });

  return { data, isLoading, refetch };
};

export const useGetAllBuyBack = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllBuyBack"],
    queryFn: async () => {
      const { data } = await axiosInstance("buy-back/getall");
      return withNewestFirst(data);
    },
  });

  return { data, isLoading, refetch };
};
