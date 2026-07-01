"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import "../globals.css";
import { axiosInstance } from "../utils/axiosInstance";
import AuthLayout from "./auth-layout";
import AdminLoginForm from "./admin-login-form";
import { Header } from "./header";

const ADMIN_QUERY_STALE_TIME = 30 * 1000;
const ADMIN_QUERY_GC_TIME = 5 * 60 * 1000;

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: ADMIN_QUERY_GC_TIME,
      staleTime: ADMIN_QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const AuthProvider = createContext(null);

export default function AdminLayout({ children }) {
  const { toast } = useToast();
  const router = useRouter();

  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    try {
      const tokenFromStorage = sessionStorage.getItem("token");
      const userFromStorage = JSON.parse(
        sessionStorage.getItem("user") || "null"
      );

      if (tokenFromStorage && userFromStorage) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${tokenFromStorage}`;
        setUserDetail(userFromStorage);
      } else {
        delete axiosInstance.defaults.headers.common.Authorization;
        setUserDetail(null);
      }
    } catch {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common.Authorization;
      setUserDetail(null);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      document.cookie = "token=; Path=/; Max-Age=0; SameSite=Lax";
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common.Authorization;
      setUserDetail(null);
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Something went wrong",
      });
    }
  }, [router, toast]);

  const contextValue = useMemo(
    () => ({
      user: userDetail,
      logout: handleLogout,
    }),
    [userDetail, handleLogout]
  );

  if (!userDetail) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-white px-4">
        <AdminLoginForm
          onSuccess={({ user }) => {
            setUserDetail(user);
          }}
        />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider.Provider value={contextValue}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full font-inter">
            <Header />
            <AuthLayout>
              <div className="px-4">{children}</div>
            </AuthLayout>
          </main>
          <Toaster />
        </SidebarProvider>
      </AuthProvider.Provider>
    </QueryClientProvider>
  );
}
