"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import JobSearchForm from "../career/job-search-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";

import { axiosInstance } from "../../utils/axiosInstance";

import Paginate from "@/components/common-client-component/Pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LucideBriefcaseBusiness, Send } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";

const jobType = ["Full-time", "Part-time", "Contract", "Internship"];
export default function SearchResultList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputFileRef = useRef();
  const [activeJobs, setActiveJobs] = useState(null);
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [expFilter, setExpFilter] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileDetail, setFileDetail] = useState(null);
  const getAllActiveJob = useCallback(
    async (page) => {
      try {
        const params = new URLSearchParams();
        params.append("page", page ?? 1);
        params.append("pageSize", 6);
        expFilter && params.append("experience", expFilter);
        searchParams.get("job-title") &&
          params.append("keyword", searchParams.get("job-title") ?? "");
        searchParams.get("location") &&
          params.append("city", searchParams.get("location") ?? "");
        jobTypeFilter.forEach((element) => {
          params.append("jobType", element);
        });
        const { data } = await axiosInstance("public/job/getall-active", {
          params: params,
        });
        setActiveJobs(data);
      } catch (error) {}
    },
    [searchParams, expFilter, jobTypeFilter]
  );

  useEffect(() => {
    getAllActiveJob();
  }, [getAllActiveJob]);

  const handleJobSearch = (keyword, location) => {
    const searchParams = new URLSearchParams();
    searchParams.append("job-title", keyword ?? "");
    searchParams.append("location", location ?? "");
    router.push(`/job-search?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  const handleJobType = (item) => {
    if (jobTypeFilter.includes(item)) {
      const filterItem = jobTypeFilter.filter((el) => el !== item);
      setJobTypeFilter(filterItem);
    } else {
      setJobTypeFilter((ps) => [...ps, item]);
    }
  };

  const handleResumeUpload = async (e) => {
    setFileDetail(null);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axiosInstance.post(
        "public/application/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileDetail(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <section className="mt-10 font-inter mb-20">
      <div className="container">
        <JobSearchForm
          title={searchParams.get("job-title")}
          location={searchParams.get("location")}
          type="search"
          handleJobSearch={handleJobSearch}
        />
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 col-span-12">
            <div className="border-[#858484] border rounded-md px-7 pt-4 pb-10">
              <h4 className="mb-3 text-[16px] font-[500]">
                Type of Employment{" "}
              </h4>
              <ul className="flex flex-col gap-3">
                {jobType.map((el) => (
                  <li key={el}>
                    <Checkbox
                      id={el}
                      checked={jobTypeFilter.includes(el)}
                      className="border-[#858484] mr-3"
                      onClick={() => {
                        handleJobType(el);
                      }}
                    />
                    <label htmlFor={el} className="text-md">
                      {el} Jobs
                    </label>
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 mb-3 text-[16px] font-[500]">
                Experience Level
              </h4>

              <RadioGroup
                className="space-y-2 "
                value={expFilter}
                onValueChange={(value) => {
                  // console.log(e);
                  setExpFilter(value);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="r-all" />
                  <Label htmlFor="r-all" className="text-md">
                    All
                  </Label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="3" id="r1" />
                  <Label htmlFor="r1" className="text-md">
                    {" "}
                    1-3 Years
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="r2" />
                  <Label htmlFor="r2" className="text-md">
                    {" "}
                    4-6 Years
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10" id="r3" />
                  <Label htmlFor="r3" className="text-md">
                    {" "}
                    7-10 Years
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15" id="r4" />
                  <Label htmlFor="r4" className="text-md">
                    10-15 Years
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="lg:col-span-9  md:col-span-12 sm:col-span-12 col-span-12">
            {activeJobs?.data?.map((el) => (
              <div
                key={el._id}
                className="grid grid-cols-12 gap-2 items-center rounded-2xl border-[#ECEEEF] border-1 p-5 mb-7"
                style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
              >
                <div className="md:col-span-9 col-span-12">
                  <p className="text-xl font-semibold">{el.title}</p>
                  <p className="text font-normal text-md text-[#858484]">
                    {el.createdAt}
                  </p>
                  <div className="flex sm:justify-between sm:items-center mt-2 flex-wrap sm:flex-row flex-col sm:gap-y-0 gap-y-2">
                    <p className="text-md font-[500] text-[#858484] flex items-center">
                      <Icons.location className="w-[20px] h-[20px] inline" />
                      &nbsp;{el.country},{el.city}
                    </p>
                    <p className="text-md font-[500] text-[#858484] flex items-center">
                      <LucideBriefcaseBusiness className="w-[18px] h-[18px] inline" />
                      &nbsp;{el.jobType} {el.isRemote && "(Remote)"}
                    </p>
                    <p className="text-md font-[500] text-[#858484] flex items-center">
                      Experience: {el.experience} +Years
                    </p>
                  </div>
                </div>
                <div className=" md:col-span-3 col-span-12 sm:text-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      router.push(
                        `job-detail?jobid=${el._id}&title=${el.title}`
                      );
                    }}
                  >
                    View Detail
                  </Button>
                </div>
              </div>
            ))}

            {activeJobs?.total > 0 && (
              <div className="text-center">
                <Paginate
                  totalCount={activeJobs?.total ?? 0}
                  currentPage={activeJobs?.page ?? 0}
                  pageSize={6}
                  onPageChange={(page) => {
                    getAllActiveJob(page);
                  }}
                />
              </div>
            )}
            <div className=" text-center font-inter mt-16">
              <input
                ref={inputFileRef}
                type="file"
                className="hidden"
                onChange={handleResumeUpload}
              />
              <p className="text-2xl font-semibold">
                Can't find the perfect role?
              </p>
              <p className="text-md font-[500]">
                Upload your resume, and we'll connect you with opportunities{" "}
                <br />
                that match your skills and aspirations at Mindteck!
              </p>

              <LoadingButton
                type="button"
                size="lg"
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  inputFileRef.current.click();
                }}
                loading={uploading}
              >
                Attach Resume
              </LoadingButton>
              {uploading && <p>Upload in progress...</p>}
              {fileDetail && !uploading && (
                <div className="flex gap-2 text-center justify-center items-center mt-3">
                  <p className="italic text-emerald-700 font-inter">
                    Successfully uploaded
                  </p>
                  <Button size="sm" variant="outline" className='border border-primary text-primary'>
                    Send <Send/>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
