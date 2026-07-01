import { HOST_API } from "./axiosInstance";

export const TEMP_IMAGE_PATH = HOST_API + "/temp-images/";
export const UPLOADED_IMAGE_PATH = HOST_API + "/images/";

export const getColorClassNameByStatusName = (status) => {
  if (status === "Approved") {
    return "bg-emerald-400/20 text-emerald-700";
  }
  if (status === "Rejected") {
    return "bg-rose-400/20 text-rose-700";
  }
  if (status === "Pending") {
    return "bg-amber-400/20 text-amber-700";
  }
  return "bg-amber-400/20 text-amber-700";
};

export function generateFinancialYears(startYear = 2004, maxFutureStartYear = 2032) {
  const currentYear = new Date().getFullYear();
  const upperYear = Math.max(currentYear, maxFutureStartYear);
  const financialYears = [];

  for (let year = upperYear; year >= startYear; year--) {
    const startYear = year;
    const endYear = year + 1;
    const financialYear = `${startYear}-${endYear}`;
    financialYears.push(financialYear);
  }

  return financialYears;
}

export const formatString = (value) => {
  if (!value) {
    return "";
  }
  const splitWord = value.split("-");
  let newString = "";
  for (let i = 0; i < splitWord.length; i++) {
    const word = splitWord[i];
    const firstChar = word[0].toUpperCase();
    const remainingWord = word.slice(1, word.length);
    newString += firstChar + remainingWord + " ";
  }
  const formattedValue = newString
    .trim()
    .replace(/\bIepf\b/g, "IEPF")
    .replace(/\bAiml\b/g, "AI/ML")
    .replace(/\bAi\/ml\b/g, "AI/ML")
    .replace(/\bIot\b/g, "IoT")
    .replace(/\bSubsidiaries Financials\b/g, "Subsidiary Financials")
    .replace(/\bCsr\b/g, "CSR")
    .replace(/\bFaqs\b/g, "FAQs")
    .replace(/\bTds\b/g, "TDS")
    .replace(/\bId\b/g, "ID")
    .replace(/\bOdr\b/g, "ODR")
    .replace(/\bMoa\b/g, "MOA")
    .replace(/\bAoa\b/g, "AOA")
    .replace(/\bAgm\b/g, "AGM")
    .replace(/\bRpt\b/g, "RPT");

  const displayOverrides = {
    "Disclosures Pursuant To Sebi Sbeb Regulations 2021":
      "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021.",
    "ID Familiarisation Programme": "ID Familiarisation Programme",
    "Redressal Through Common ODR Portal": "Redressal Through Common ODR Portal",
    "Transfer Of Equity Shares To IEPF": "Transfer of Equity Shares to IEPF",
  };

  return displayOverrides[formattedValue] || formattedValue;
};

export const investorTitleWithPdfMenu = {
  "csr-projects": "CSR Projects",
  'saksham-niveshak': 'Saksham Niveshak',
  "annual-secretarial-compliance-report": "Annual Secretarial Compliance Report",
  "investor-downloads": "Investor Downloads",
  "disclosures-of-related-party-transactions": "Disclosures of Related Party Transactions",
  "agm-transcript": "AGM Transcript",
  "unclaimed-unpaid-dividend": "Unclaimed-Unpaid Dividend",
  "voting-results": "Voting Results",
  "annual-return": "Annual Return",
  "transfer-of-equity-shares-to-iepf": "Transfer of equity shares to IEPF",
};

export const investorTitleWithPdfMenuLabels = {
  "csr-projects": "CSR Projects",
  "saksham-niveshak": "Saksham Niveshak",
  "annual-secretarial-compliance-report": "Annual Secretarial Compliance Report",
  "investor-downloads": "Investor Downloads",
  "disclosures-of-related-party-transactions":
    "Disclosures of Related Party Transactions",
  "agm-transcript": "AGM Transcript",
  "unclaimed-unpaid-dividend": "Unclaimed-Unpaid Dividend",
  "voting-results": "Voting Results",
  "annual-return": "Annual Return",
  "transfer-of-equity-shares-to-iepf": "Transfer of Equity Shares to IEPF",
};

export const staticPdfMenuitems = [
  "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021.",
  "ID Familiarisation Programme",
  "Letter of Appointment for Independent Directors",
  "Procedure for Dematerialisation of Shares",
  "Ind AS Convergence",
  "FAQs on TDS",
];

export const investorStaticPdfPages = {
  "letter-of-appointment-for-independent-directors": {
    label: "Letter of Appointment for Independent Directors",
    types: ["Letter of Appointment for Independent Directors"],
  },
  "id-familiarisation-programme": {
    label: "ID Familiarisation Programme",
    types: [
      "ID familiarisation programme",
      "ID Familiarisation Programme",
      "Independent Directors Familiarisation Programme",
    ],
  },
  "disclosures-pursuant-to-sebi-sbeb-regulations-2021": {
    label: "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021.",
    types: [
      "Disclosures pursuant to sebi (sbeb) regulations 2021",
      "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021",
      "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021.",
      "Disclosures pursuant to SEBI (Share Based Employee Benefits and Sweat Equity) Regulations, 2021",
    ],
  },
  "procedure-for-dematerialisation-of-shares": {
    label: "Procedure for Dematerialisation of Shares",
    types: ["Procedure for Dematerialisation of Shares"],
  },
  "redressal-through-common-odr-portal": {
    label: "Redressal Through Common ODR Portal",
    types: [
      "Redressal through common ODR portal",
      "Redressal Through Common ODR Portal",
    ],
  },
  "faqs-on-tds": {
    label: "FAQs on TDS",
    types: ["FAQs on TDS"],
  },
};

export const quarters = ["First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter"];

export const templates = [
  {
    label: "Smart city",
    value: "smart-city",
    bannerOrSlider: "banner",
  },
  {
    label: "CSR",
    value: "CSR",
    bannerOrSlider: "banner",
  },
  {
    label: "Who We Are",
    value: "WHO_WE_ARE",
    bannerOrSlider: "banner",
  },
];

export const defaultInvestorMenus = [
  {
    label: "Press Room",
    path: "press-room",
    type: "link",
  },
  {
    label: "Committees",
    path: "committees",
    type: "link",
  },
  {
    label: "Annual Report",
    path: "annual-report",
    type: "link",
  },
  {
    label: "Notices",
    path: "notices",
    type: "link",
  },
  {
    label: "Financial Information",
    path: "financial-information",
    type: "link",
  },
  {
    label: "Policies",
    path: "policies",
    type: "link",
  },
  {
    label: "Stock Exchange Filings",
    path: "stock-exchange-filings",
    type: "link",
  },
  {
    label: "Investor Services",
    type: "dropdown",
    children: [
      { label: "FAQs on TDS", path: "faqs-on-tds" },
      { label: "Investor Downloads", path: "investor-downloads" },
      {
        label: "Transfer of Equity Shares to IEPF",
        path: "transfer-of-equity-shares-to-iepf",
      },
      {
        label: "Procedure for Dematerialisation of Shares",
        path: "procedure-for-dematerialisation-of-shares",
      },
      { label: "Unclaimed/Unpaid Dividend", path: "unclaimed-unpaid-dividend" },
      {
        label: "Redressal Through Common ODR Portal",
        path: "redressal-through-common-odr-portal",
      },
    ],
  },
  {
    label: "Other Information",
    type: "dropdown",
    children: [
      {
        label: "Saksham Niveshak",
        path: 'saksham-niveshak',
      },
      {
        label: "Company's MOA and AOA",
        path: "https://www.mindteck.com/assets/investor_pdf/Mindtecks_MOA_AOA.pdf",
        target: "_blank",
      },
      {
        label: "Ind AS Convergence",
        path: "https://www.mindteck.com/assets/investor_pdf/IND-AS-%20Convergence_INR_101818.pdf",
        target: "_blank",
      },
      { label: "CSR Projects", path: "csr-projects" },
      { label: "Buy Back", path: "buy-back" },
      {
        label: "Annual Secretarial Compliance Report",
        path: "annual-secretarial-compliance-report",
      },
      {
        label: "Disclosure of RPT",
        path: "disclosures-of-related-party-transactions",
      },
      {
        label: "Annual Return",
        path: "annual-return",
      },
      { label: "AGM Transcript", path: "agm-transcript" },
      { label: "Postal Ballot", path: "postal-ballot" },
      { label: "Subsidiary Financials", path: "subsidiaries-financials" },
      { label: "Shareholding Pattern", path: "shareholding-pattern" },
      { label: "Voting Results", path: "voting-results" },
      {
        label: "Letter of Appointment for Independent Directors",
        path: "letter-of-appointment-for-independent-directors",
      },
      {
        label: "ID Familiarisation Programme",
        path: "id-familiarisation-programme",
      },
      {
        label: "Disclosures Pursuant to SEBI (SBEB & SE) Regulations, 2021.",
        path: "disclosures-pursuant-to-sebi-sbeb-regulations-2021",
      },
    ],
  },
];
