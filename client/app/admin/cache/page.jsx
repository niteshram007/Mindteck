"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";

const SLIDER_CACHE_KEY = "home_slider_cache_v1";

export default function CacheManagementPage() {
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [lastClearedAt, setLastClearedAt] = useState("");

  const clearCache = async () => {
    setIsClearing(true);
    try {
      const { data } = await axiosInstance.post("cache/clear");

      if (typeof window !== "undefined") {
        sessionStorage.removeItem(SLIDER_CACHE_KEY);
      }

      const now = new Date().toLocaleString();
      setLastClearedAt(now);

      toast({
        variant: "success",
        title: data?.message || "Cache cleared successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          "Failed to clear cache. Please try again.",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="py-4">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Cache Management</CardTitle>
          <CardDescription>
            Clear frontend cache and restart the website process safely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Use this after updates to menus, slider assets, or PDF files when old content is still visible.
          </p>
          <LoadingButton type="button" size="lg" loading={isClearing} onClick={clearCache}>
            Clear Cache
          </LoadingButton>
          {lastClearedAt ? (
            <p className="text-xs text-slate-500">Last cleared at: {lastClearedAt}</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
