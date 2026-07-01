"use client";
import InvestorDataByType from "@/app/admin/pdfWithTitle/page";

export default function TransferOfEquitySharesToIEPF() {
  return (
    <div>
      <InvestorDataByType
        type={"Transfer of equity shares to IEPF"}
        allowMultipleByYear
        minFinancialYear={2000}
      />
    </div>
  );
}
