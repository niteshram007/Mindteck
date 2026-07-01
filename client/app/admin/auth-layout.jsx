import { roleWiseAccessiblePath } from "@/components/ui/app-sidebar";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { AuthProvider } from "./layout";
import AccessDenied from "./access-denied";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const { user } = useContext(AuthProvider);
  const hasAccessible = roleWiseAccessiblePath[user?.role]?.includes(
    pathname.split("/admin/")[1]
  );

  if (!user) {
    return <>loading ....</>;
  }
  if (!hasAccessible && pathname !== "/admin") {
    return <AccessDenied />;
  }
  return <>{children}</>;
}
