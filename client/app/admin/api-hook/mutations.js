import { axiosInstance } from "../../utils/axiosInstance";

export const addUpdateMenus = async (req, id) => {
  if (id) {
    return await axiosInstance.put("menu/update/" + id, req);
  }
  return await axiosInstance.post("menu/create", req);
};
export const uploadLeaderShipImage = async (req, id) => {
  let url = "leadership/upload";
  if (id) {
    url = `leadership/upload/${id}`;
  }
  const data = await axiosInstance.post(url, req);
  return data;
};
export const addUpdateLeaderShipMember = async (req, id) => {
  if (id) {
    const data = await axiosInstance.put(`leadership/update/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post("leadership/create", req);
  return data;
};
export const deleteMember = async (id) => {
  const data = await axiosInstance.delete("leadership/" + id);
  return data;
};
export const deleteMenu = async (id) => {
  const data = await axiosInstance.delete("menu/" + id);
  return data;
};

export const addUpdateBODMember = async (req, id) => {
  if (id) {
    const data = await axiosInstance.put(`bod/update/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post("bod/create", req);
  return data;
};
export const deleteBOD = async (id) => {
  const data = await axiosInstance.delete("bod/" + id);
  return data;
};

export const addUpdateCountry = async (req, id) => {
  if (id) {
    return await axiosInstance.put("main-location/update/" + id, req);
  }
  return await axiosInstance.post("main-location/create", req);
};

export const deleteCountry = async (id) => {
  const data = await axiosInstance.delete("main-location/" + id);
  return data;
};

export const addUpdateOffice = async (req, id) => {
  if (id) {
    return await axiosInstance.put("office/update/" + id, req);
  }
  return await axiosInstance.post("office/create", req);
};

export const deleteOffice = async (id) => {
  const data = await axiosInstance.delete("office/" + id);
  return data;
};

export const addUpdateSlider = async (req, id) => {
  if (id) {
    return await axiosInstance.put("slider/update/" + id, req);
  }
  return await axiosInstance.post("slider/create", req);
};

export const deleteSlider = async (id) => {
  const data = await axiosInstance.delete("slider/" + id);
  return data;
};

export const addUpdatePage = async (req, id) => {
  if (id) {
    return await axiosInstance.put("page/update/" + id, req);
  }
  return await axiosInstance.post("page/create", req);
};

export const deletePage = async (id) => {
  const data = await axiosInstance.delete("page/" + id);
  return data;
};

export const addUpdateTemplateData = async (req, url, isEditMode) => {
  let apiUrl = "template/create/";
  if (isEditMode) {
    apiUrl = "template/update/";
  }
  return await axiosInstance.post(apiUrl + url, req);
};
export const addUpdateUser = async (req, id) => {
  if (id) {
    return await axiosInstance.put("user/update/" + id, req);
  }
  return await axiosInstance.post("user/create", req);
};

export const deleteUser = async (id) => {
  return await axiosInstance.delete("user/" + id);
};

export const addUpdateCategory = async (req, id) => {
  if (id) {
    return await axiosInstance.put("job-category/update/" + id, req);
  }
  return await axiosInstance.post("job-category/create", req);
};

export const deleteCategory = async (id) => {
  return await axiosInstance.delete("job-category/" + id);
};

export const addUpdateJobPost = async (req, id) => {
  if (id) {
    return await axiosInstance.put("job/update/" + id, req);
  }
  return await axiosInstance.post("job/create", req);
};

export const deleteJobPost = async (id) => {
  return await axiosInstance.delete("job/" + id);
};
export const applicationCreate = async (req) => {
  return await axiosInstance.post("public/application/create", req);
};
export const deleteApplication = async (id) => {
  return await axiosInstance.delete("application/" + id);
};

export const updateApplicationStatus = async (req, id) => {
  return await axiosInstance.put("application/updateStatus/" + id, req);
};

export const jobPostReview = async (id, req) => {
  return await axiosInstance.put("job/update-review-status/" + id, req);
};

export const addUpdatePartnerAndAlliances = async (req, id) => {
  if (id) {
    return await axiosInstance.put("partner-and-alliance/update/" + id, req);
  }
  return await axiosInstance.post("partner-and-alliance/create", req);
};
export const deletePartnerAndAlliances = async (id) => {
  return await axiosInstance.delete("partner-and-alliance/" + id);
};
export const addUpdatePressRelease = async (req, id) => {
  if (id) {
    return await axiosInstance.put("press-release/update/" + id, req);
  }
  return await axiosInstance.post("press-release/create", req);
};
export const deletePressRelease = async (id) => {
  return await axiosInstance.delete("press-release/" + id);
};

export const addUpdateCaseStudy = async (req, id) => {
  if (id) {
    return await axiosInstance.put("case-study/update/" + id, req);
  }
  return await axiosInstance.post("case-study/create", req);
};
export const deleteCaseStudy = async (id) => {
  const data = await axiosInstance.delete("case-study/" + id);
  return data;
};

export const addUpdateBrochure = async (req, id) => {
  if (id) {
    return await axiosInstance.put("brochure/update/" + id, req);
  }
  return await axiosInstance.post("brochure/create", req);
};
export const deleteBrochure = async (id) => {
  const data = await axiosInstance.delete("brochure/" + id);
  return data;
};

export const addUpdateResourceCategory = async (req, id) => {
  if (id) {
    return await axiosInstance.put("resource-category/update/" + id, req);
  }
  return await axiosInstance.post("resource-category/create", req);
};
export const deleteResourceCategory = async (id) => {
  return await axiosInstance.delete("resource-category/" + id);
};

export const addUpdatePolicyCategory = async (req, id) => {
  if (id) {
    return await axiosInstance.put("policy-category/update/" + id, req);
  }
  return await axiosInstance.post("policy-category/create", req);
};

export const deletePolicyCategory = async (id) => {
  const data = await axiosInstance.delete("policy-category/" + id);
  return data;
};

export const addUpdatePolicy = async (req, id) => {
  if (id) {
    const data = await axiosInstance.put(`policy/update/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post("policy/create", req);
  return data;
};
export const deletePolicy = async (id) => {
  const data = await axiosInstance.delete("policy/" + id);
  return data;
};

export const addUpdateFinancialInformation = async (req, id) => {
  if (id) {
    return await axiosInstance.put("financial-info/update/" + id, req);
  }
  return await axiosInstance.post("financial-info/create", req);
};

export const deleteFinancialInformation = async (id, itemId) => {
  let url = "financial-info/" + id;
  if (itemId) {
    url = `financial-info/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};
export const addUpdateAnnualReport = async (req, id) => {
  if (id) {
    return await axiosInstance.put("annual-report/update/" + id, req);
  }
  return await axiosInstance.post("annual-report/create", req);
};

export const deleteAnnualReport = async (id, itemId) => {
  let url = "annual-report/" + id;
  if (itemId) {
    url = `annual-report/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};
export const addUpdateStockExchangeFiling = async (req, id) => {
  if (id) {
    return await axiosInstance.put("stock-exchange-filing/update/" + id, req);
  }
  return await axiosInstance.post("stock-exchange-filing/create", req);
};

export const deleteStockExchangeFiling = async (id, itemId) => {
  let url = "stock-exchange-filing/" + id;
  if (itemId) {
    url = `stock-exchange-filing/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};

export const addUpdateNotice = async (req, id) => {
  if (id) {
    return await axiosInstance.put("notice/update/" + id, req);
  }
  return await axiosInstance.post("notice/create", req);
};

export const deleteNotice = async (id, itemId) => {
  let url = "notice/" + id;
  if (itemId) {
    url = `notice/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};

export const addUpdateCommittees = async (req, id) => {
  if (id) {
    return await axiosInstance.put("/committee/update/" + id, req);
  }
  return await axiosInstance.post("committee/create", req);
};

export const deleteCommittees = async (id) => {
  const data = await axiosInstance.delete("committee/" + id);
  return data;
};

export const addUpdateInvestorByType = async (req, id) => {
  if (id) {
    return await axiosInstance.put("pdf-with-title/update/" + id, req);
  }
  return await axiosInstance.post("pdf-with-title/create", req);
};

export const deleteInvestorByType = async (id) => {
  const data = await axiosInstance.delete("pdf-with-title/" + id);
  return data;
};

export const addUpdateInvestorStaticPdf = async (req, id) => {
  if (id) {
    return await axiosInstance.put("pdf/update/" + id, req);
  }
  return await axiosInstance.post("pdf/create", req);
};

export const deleteInvestorStaticPdf = async (id) => {
  const data = await axiosInstance.delete("pdf/" + id);
  return data;
};

export const addUpdateShareHoldingPattern = async (req, id) => {
  if (id) {
    return await axiosInstance.put("share-holding-pattern/update/" + id, req);
  }
  return await axiosInstance.post("share-holding-pattern/create", req);
};

export const deleteShareHoldingPattern = async (id, quarterName) => {
  let url = "share-holding-pattern/" + id;
  if (quarterName) {
    url = `share-holding-pattern/${id}/${quarterName}`;
  }

  const data = await axiosInstance.delete(url);
  return data;
};

export const addUpdateSubsidiariesFinancial = async (req, id) => {
  if (id) {
    return await axiosInstance.put("subsidiaries-financial/update/" + id, req);
  }
  return await axiosInstance.post("subsidiaries-financial/create", req);
};

export const deleteSubsidiariesFinancial = async (id, itemId) => {
  let url = "subsidiaries-financial/" + id;
  if (itemId) {
    url = `subsidiaries-financial/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};
export const addUpdatePostalBallot = async (req, id) => {
  if (id) {
    return await axiosInstance.put("postal-ballot/update/" + id, req);
  }
  return await axiosInstance.post("postal-ballot/create", req);
};

export const deletePostalBallot = async (id, itemId) => {
  let url = "postal-ballot/" + id;
  if (itemId) {
    url = `postal-ballot/${id}/${itemId}`;
  }
  const data = await axiosInstance.delete(url);
  return data;
};

export const deleteInvestorFeedBack = async (id) => {
  const data = await axiosInstance.delete("investor-feedback/" + id);
  return data;
};

export const deleteContactFeedback = async (id) => {
  const data = await axiosInstance.delete("contact/" + id);
  return data;
};

export const addUpdateBuyBack = async (req, id) => {
  if (id) {
    if (req.type === "General Updates") {
      return await axiosInstance.put("buy-back/update/generalUpdate", req);
    }
    return await axiosInstance.put("buy-back/update/dailyReports", req);
  }
  if (req.type === "General Updates") {
    return await axiosInstance.post("buy-back/create/generalUpdate", req);
  }
  return await axiosInstance.post("buy-back/create/dailyReports", req);
};

export const deleteBuyBack = async (req) => {
  if (!req) {
    return alert("Something went wrong");
  }
  if (req.type === "Daily Updates") {
    return await axiosInstance.delete(
      `buy-back/dailyUpdates/${req._id}/${req.month}/${req.dates[0].date}`
    );
  }
  return await axiosInstance.delete(
    `buy-back/generalUpdates/${req._id}/${req.id}`
  );
};
