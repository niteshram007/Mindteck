"use client";

import { useEffect, useMemo, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const defaultFormState = {
  isVisible: false,
  openDate: "",
  closeDate: "",
  boardMeetingDate: "",
};

const parseDateInput = (value = "") => {
  const parsedDate = parseISO(String(value || "").trim());
  return isValid(parsedDate) ? parsedDate : null;
};

const formatTradingWindowRange = (openDateValue, closeDateValue) => {
  const openDate = parseDateInput(openDateValue);
  const closeDate = parseDateInput(closeDateValue);

  if (openDate && closeDate) {
    return `From ${format(openDate, "MMMM dd, yyyy")} to ${format(
      closeDate,
      "MMMM dd, yyyy",
    )} [both days are inclusive]`;
  }

  if (openDate) {
    return `From ${format(openDate, "MMMM dd, yyyy")}`;
  }

  if (closeDate) {
    return `Until ${format(closeDate, "MMMM dd, yyyy")}`;
  }

  return "";
};

const formatBoardMeetingDate = (boardMeetingDateValue) => {
  const boardMeetingDate = parseDateInput(boardMeetingDateValue);
  return boardMeetingDate ? format(boardMeetingDate, "EEEE, MMMM dd, yyyy") : "";
};

export default function TradingWindowPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);

  const tradingWindowRange = useMemo(
    () => formatTradingWindowRange(formState.openDate, formState.closeDate),
    [formState.openDate, formState.closeDate],
  );

  const boardMeetingDate = useMemo(
    () => formatBoardMeetingDate(formState.boardMeetingDate),
    [formState.boardMeetingDate],
  );

  const loadTradingWindow = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance("trading-window/get");
      const payload = data?.data || defaultFormState;
      setFormState({
        isVisible: Boolean(payload?.isVisible),
        openDate: payload?.openDate || "",
        closeDate: payload?.closeDate || "",
        boardMeetingDate: payload?.boardMeetingDate || "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          "Failed to load trading window details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTradingWindow();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();

    if (formState.openDate && formState.closeDate) {
      const openDate = parseDateInput(formState.openDate);
      const closeDate = parseDateInput(formState.closeDate);

      if (openDate && closeDate && openDate > closeDate) {
        toast({
          variant: "destructive",
          title: "Open date cannot be later than closure date.",
        });
        return;
      }
    }

    setIsSaving(true);
    try {
      await axiosInstance.put("trading-window/upsert", formState);
      toast({
        variant: "success",
        title: "Trading window updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          "Failed to update trading window details.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-4">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Trading Window</CardTitle>
          <CardDescription>
            Update the investors Trading Window card with show/hide and date values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-600">Loading trading window details...</p>
          ) : (
            <form className="space-y-5" onSubmit={handleSave}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-trading-window"
                  checked={formState.isVisible}
                  onCheckedChange={(checked) =>
                    setFormState((prev) => ({
                      ...prev,
                      isVisible: Boolean(checked),
                    }))
                  }
                  className="border-slate-500"
                />
                <Label htmlFor="show-trading-window">Show Trading Window Card</Label>
              </div>

              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="open-date">Trading Window Open Date</Label>
                  <Input
                    id="open-date"
                    type="date"
                    value={formState.openDate}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        openDate: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="close-date">Trading Window Closure Date</Label>
                  <Input
                    id="close-date"
                    type="date"
                    value={formState.closeDate}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        closeDate: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="board-date">Board Meeting Date</Label>
                  <Input
                    id="board-date"
                    type="date"
                    value={formState.boardMeetingDate}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        boardMeetingDate: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="rounded-[20px] bg-[#F4D96A] px-5 py-5 max-w-[250px] text-black">
                {tradingWindowRange ? (
                  <>
                    <p className="text-[20px] leading-6 font-bold">Trading Window Closure</p>
                    <p className="text-[15px] mt-1.5 leading-5">{tradingWindowRange}</p>
                  </>
                ) : null}
                {boardMeetingDate ? (
                  <>
                    <p className="text-[20px] leading-6 font-bold mt-4">Board Meeting Date</p>
                    <p className="text-[15px] mt-1.5 leading-5">{boardMeetingDate}</p>
                  </>
                ) : null}
                {!tradingWindowRange && !boardMeetingDate ? (
                  <p className="text-base">Add dates to preview the card.</p>
                ) : null}
              </div>

              <LoadingButton type="submit" loading={isSaving}>
                Save Trading Window
              </LoadingButton>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
