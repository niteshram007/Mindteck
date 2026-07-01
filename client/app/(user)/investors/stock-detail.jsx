"use client";
import React, { useEffect, useState } from "react";
import BSE from "../../assets/images/bse.png";
import NSE from "../../assets/images/nse.png";
import Image from "next/image";
import { ArrowDownIcon, ArrowUp } from "lucide-react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { format } from "date-fns";
const interval = 30000;
export default function StockDetail() {
  const [stockPriceDetail, setStockPriceDetail] = useState(null);

  // Function to get the current time in IST
  const getCurrentTimeInIST = () => {
    const localDate = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const timeInIST = localDate.toLocaleString("en-US", options);
    const dateInIST = new Date(timeInIST);

    return dateInIST;
  };

  // Function to check if the current time is within market hours (9:00 AM to 4:45 PM IST)
  const isMarketOpen = () => {
    const now = getCurrentTimeInIST();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Market opens at 9:00 AM and closes at 3:30 PM
    return (
      (hours > 9 || (hours === 9 && minutes >= 0)) &&
      (hours < 15 || (hours === 16 && minutes <= 30))
    );
  };
  const getStockPriceDetail = async () => {
    if (isMarketOpen()) {
      try {
        const { data } = await axiosInstance("public/stock/getPrice");
        setStockPriceDetail(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // Fetch data immediately on mount
    const fetchStockDetailOnMount = async () => {
      try {
        const { data } = await axiosInstance("public/stock/getPrice");
        setStockPriceDetail(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStockDetailOnMount();

    const intervalId = setInterval(getStockPriceDetail, interval);
    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div>
      <div className=" bg-[#D2F1DB] py-3 px-4 font-inter rounded-[20px] text-center max-w-[240px] m-auto">
        <div className="min-h-[64px]">
          <Image
            src={BSE}
            width={103}
            height={64}
            alt="bse"
            className="m-auto"
          />
        </div>
        <p className="text-xl font-semibold mb-3">MINDTECK | 517344</p>
        <p className="text-4xl font-bold mb-4">
          {stockPriceDetail?.bse?.price}
        </p>
        <div className="flex justify-between mb-1">
          <span className="text-[19px] font-[500]">
            {stockPriceDetail?.bse?.change > 0 ? (
              <ArrowUp color="green" className="inline mr-1" size={20} />
            ) : (
              <ArrowDownIcon color="red" className="inline mr-1" size={20} />
            )}
            Rs. {stockPriceDetail?.bse?.change}
          </span>
          <span className="text-[19px] font-[500]">
            {stockPriceDetail?.bse?.changePercentage}
          </span>
        </div>
        <div className="flex justify-between text-md font-[300]">
          <span className="ml-6">{format(new Date(), "MMM dd")}</span>
          <span>{new Date().toLocaleTimeString()} IST</span>
        </div>
      </div>
      <div className=" bg-[#E1DBEB] py-3 px-4 font-inter rounded-[20px] text-center mt-9 max-w-[240px] m-auto">
        <div className="min-h-[64px]">
          <Image
            src={NSE}
            width={98}
            height={64}
            alt="NSE"
            className="m-auto"
          />
        </div>
        <p className="text-xl font-semibold mb-3 ">MINDTECK</p>
        <p className="text-4xl font-bold mb-4">
          {stockPriceDetail?.nse?.price}
        </p>
        <div className="flex justify-between mb-1">
          <span className="text-[19px] font-[500]">
            {stockPriceDetail?.nse?.change > 0 ? (
              <ArrowUp color="green" className="inline mr-1" size={20} />
            ) : (
              <ArrowDownIcon color="red" className="inline mr-1" size={20} />
            )}
            Rs. {stockPriceDetail?.nse?.change}
          </span>
          <span className="text-[19px] font-[500]">
            {stockPriceDetail?.nse?.changePercentage}
          </span>
        </div>
        <div className="flex justify-between text-md font-[300]">
          <span className="ml-6">{format(new Date(), "MMM dd")}</span>
          <span>{new Date().toLocaleTimeString()} IST</span>
        </div>
      </div>
    </div>
  );
}
