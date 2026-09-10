import { axiosInstance } from "@/app/utils/axiosInstance";
import FilterForm from "./filter-form";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const StockExchangeFiling = dynamic(() => import("./StockExchangeFiling"), {
  ssr: true,
});

const getFinancialYearStart = (year = "") => {
  const startYear = Number(String(year || "").split("-")[0]);
  return Number.isFinite(startYear) ? startYear : -1;
};

const resolveStockExchangeYearMeta = async () => {
  try {
    const { data } = await axiosInstance("public/stock-exchange-filing/getBySession", {
      params: {
        session: "",
      },
    });

    const yearList = (Array.isArray(data) ? data : [])
      .filter(
        (item) =>
          item?.financialYear &&
          Array.isArray(item?.stockExchangeFilings) &&
          item.stockExchangeFilings.length > 0,
      )
      .map((item) => item.financialYear);

    const availableYears = [...new Set(yearList)].sort(
      (left, right) => getFinancialYearStart(right) - getFinancialYearStart(left),
    );

    return {
      availableYears,
      latestYear: availableYears[0] || "",
    };
  } catch (error) {
    console.error("Error resolving stock exchange years:", error?.message || error);
    return {
      availableYears: [],
      latestYear: "",
    };
  }
};

export default async function page({ searchParams }) {
  const { availableYears, latestYear } = await resolveStockExchangeYearMeta();
  const requestedSession = searchParams?.session || "";

  const session = availableYears.includes(requestedSession)
    ? requestedSession
    : latestYear;

  return (
    <div className="font-inter">
      <FilterForm defaultSession={session} availableYears={availableYears} />
      <Suspense fallback={<p className="mt-3">Loading stock data...</p>}>
        <StockExchangeFiling session={session} key={session} />
      </Suspense>
    </div>
  );
}
