"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { makePressReleaseSlug } from "@/app/utils/slug";
import React, { useState } from "react";
function findYearById(id, data) {
  for (let year in data) {
    // Loop through the array for the current year
    for (let index = 0; index < data[year].length; index++) {
      if (data[year][index]._id === id) {
        return year;
      }
    }
  }
  return null;
}
export default function NewsFilter({ id, data }) {
  const years = Object.keys(data || {}).sort((a, b) => Number(b) - Number(a));
  const defaultYear = findYearById(id, data);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  return (
    <div className="bg-gray-100 rounded-sm px-3 py-3">
      <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-3">
        Press Release
      </h3>
      <Select
        onValueChange={(value) => {
          setSelectedYear(value);
        }}
        value={selectedYear}
        defaultValue={defaultYear}
      >
        <SelectTrigger className="bg-white w-full">
          <SelectValue placeholder="Select a Year" />
        </SelectTrigger>

        <SelectContent className="max-h-[60vh]">
          {years.map((el) => (
            <SelectItem value={el} key={el}>
              {el}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4">
        {[...(data[selectedYear] || [])].reverse().map((el) => (
          <div
            key={el._id}
            className="mb-3 border-b border-secondary bg-white"
          >
            <Link
              href={`/press-room/${el._id}/${makePressReleaseSlug(el?.title)}`}
              className="text-xs sm:text-sm leading-snug font-normal font-inter px-2.5 py-2.5 block break-words"
              prefetch={false}
            >
              {el.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
