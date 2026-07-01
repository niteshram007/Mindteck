"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { memo, useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../utils/axiosInstance";
import { Label } from "@/components/ui/label";
import { MapPin, Search } from "lucide-react";

const JobSearchForm = memo(function JobSearchForm({
  title = "",
  location = "",
  type,
  handleJobSearch,
}) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [allUniqueCities, setAllUniqueCities] = useState([]);

  const getAllUniqueCities = async () => {
    try {
      const { data } = await axiosInstance("public/job/get-unique-cities");
      setAllUniqueCities(data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getAllUniqueCities();
  }, []);

  useMemo(() => {
    setSearchKeyword(title);
    setSearchLocation(location);
  }, [title, location]);

 
  return (
    <div className="flex gap-5 items-center mb-14 mt-3 border-[#b3b2b2]  border-2 rounded-sm justify-between p-2  md:flex-nowrap flex-wrap">
      <div className="search-container relative flex items-center w-full">
        <Search className=" h-8 ml-3 text-gray-400" />
        <Input
          className="w-full h-12 border-transparent focus-visible:ring-0 shadow-none"
          placeholder="Job Title, Keyword"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
      </div>
      <div className="border border-[#b3b2b2] md:w-0 md:h-[40px] w-full h-0"></div>
      <div className="search-container relative flex items-center w-full">
        <MapPin className="h-8 ml-3 text-gray-400" />
        <Select
          onValueChange={(value) => {
            setSearchLocation(value);
          }}
          defaultValue={searchLocation}
        >
          <SelectTrigger className="border-transparent focus-visible:ring-0 focus:ring-0 shadow-none">
            <span>{searchLocation || "Select Location"}</span>
          </SelectTrigger>

          <SelectContent className="max-h-[300px]">
            {allUniqueCities?.map((el) => (
              <SelectItem value={el} key={el}>
                {el}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full items-center whitespace-nowrap gap-2 md:flex-nowrap  flex-wrap">
        {type === "search" && (
          <Label
            className="underline text-blue-700 text-sm font-semibold italic cursor-pointer"
            onClick={() => {
              handleJobSearch();
            }}
          >
            Clear Search
          </Label>
        )}
        <Button
          className="h-12 w-full"
          onClick={() => {
            if (type == "navigate") {
              router.push(
                `job-search?job-title=${searchKeyword}&location=${searchLocation}`,
                { scroll: false }
              );
            } else {
              handleJobSearch(searchKeyword, searchLocation);
            }
          }}
        >
          Find Job
        </Button>
      </div>
    </div>
  );
});

export default JobSearchForm;
