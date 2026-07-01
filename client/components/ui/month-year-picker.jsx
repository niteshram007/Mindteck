"use client";

import * as React from "react";
import { useController } from "react-hook-form";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function MonthYearPicker({
  control,
  name,
  label,
  placeholder = "Select month and year",
  disabled = false,
  required = false,
  className,
}) {
  // Get the current date for default values
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // State for the year being viewed in the picker
  const [viewYear, setViewYear] = React.useState(currentYear);

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Use React Hook Form controller
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? "This field is required" : false },
    defaultValue: "",
  });

  // Parse the value if it exists
  const selectedDate = value ? new Date(value) : null;
  const selectedMonth = selectedDate?.getMonth();
  const selectedYear = selectedDate?.getFullYear();

    // Format the selected date for display
    const formattedSelection = selectedDate
    ? format(selectedDate, "MMMM yyyy")
    : placeholder;
  // Handle month selection
  const handleSelectMonth = (monthIndex) => {
    const newDate = new Date(viewYear, monthIndex, 1);
    onChange(format(newDate, "MMMM yyyy"));
  };

  // Navigate to previous year
  const prevYear = () => {
    setViewYear(viewYear - 1);
  };

  // Navigate to next year
  const nextYear = () => {
    setViewYear(viewYear + 1);
  };


  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {formattedSelection}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2 ">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={prevYear}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Year</span>
            </Button>
            <div className="font-medium">{viewYear}</div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={nextYear}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Year</span>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                selectedMonth === index && selectedYear === viewYear;

              return (
                <Button
                  key={month}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "h-9",
                    isSelected && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleSelectMonth(index)}
                >
                  {month.substring(0, 3)}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
