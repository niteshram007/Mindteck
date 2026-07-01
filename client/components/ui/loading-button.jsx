import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export default function LoadingButton({
  loading,
  disabled,
  children,
  className,
  ...others
}) {
  const classNameForDisableAndLoading = "bg-gray-700 text-white";
  return (
    <Button
      disabled={disabled || loading}
      {...others}
      className={cn(
        (disabled || loading) && classNameForDisableAndLoading,
        className
      )}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
