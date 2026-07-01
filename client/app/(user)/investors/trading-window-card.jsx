"use client";

import { useEffect, useMemo, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { axiosInstance } from "@/app/utils/axiosInstance";

const parseDateInput = (value = "") => {
  const parsedDate = parseISO(String(value || "").trim());
  return isValid(parsedDate) ? parsedDate : null;
};

const getRangeContent = (openDateValue, closeDateValue) => {
  const openDate = parseDateInput(openDateValue);
  const closeDate = parseDateInput(closeDateValue);

  if (openDate && closeDate) {
    return {
      line: `From ${format(openDate, "MMMM dd, yyyy")} to ${format(
        closeDate,
        "MMMM dd, yyyy",
      )}`,
      inclusive: true,
    };
  }

  if (openDate) {
    return { line: `From ${format(openDate, "MMMM dd, yyyy")}`, inclusive: false };
  }

  if (closeDate) {
    return { line: `Until ${format(closeDate, "MMMM dd, yyyy")}`, inclusive: false };
  }

  return { line: "", inclusive: false };
};

const formatBoardMeetingDate = (boardMeetingDateValue) => {
  const boardMeetingDate = parseDateInput(boardMeetingDateValue);
  return boardMeetingDate ? format(boardMeetingDate, "EEEE, MMMM dd, yyyy") : "";
};

export default function TradingWindowCard({ className = "" }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTradingWindow = async () => {
      try {
        const response = await axiosInstance("public/trading-window/get");
        if (!isMounted) {
          return;
        }
        setData(response?.data?.data || null);
      } catch (_error) {
        if (isMounted) {
          setData(null);
        }
      }
    };

    loadTradingWindow();
    return () => {
      isMounted = false;
    };
  }, []);

  const rangeContent = useMemo(
    () => getRangeContent(data?.openDate, data?.closeDate),
    [data?.openDate, data?.closeDate],
  );
  const boardMeetingDate = useMemo(
    () => formatBoardMeetingDate(data?.boardMeetingDate),
    [data?.boardMeetingDate],
  );

  const shouldRender = Boolean(
    data?.isVisible && (rangeContent.line || boardMeetingDate),
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`bg-[#F4D96A] text-black rounded-[20px] px-5 py-5 max-w-[250px] ${className}`}>
      {rangeContent.line ? (
        <>
          <p className="text-[20px] leading-6 font-bold">Trading Window Closure</p>
          <p className="text-[15px] mt-1.5 leading-5">
            {rangeContent.line}
            {rangeContent.inclusive ? (
              <span className="block text-[14px]">[both days are inclusive]</span>
            ) : null}
          </p>
        </>
      ) : null}

      {boardMeetingDate ? (
        <>
          <p className="text-[20px] leading-6 font-bold mt-4">Board Meeting Date</p>
          <p className="text-[15px] mt-1.5 leading-5">{boardMeetingDate}</p>
        </>
      ) : null}
    </div>
  );
}
