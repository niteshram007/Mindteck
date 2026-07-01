"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";

import { axiosInstance } from "../utils/axiosInstance";

const defaultValues = {
  username: "",
  password: "",
  totp: "",
};

const formSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
  totp: z
    .string()
    .regex(/^\d{6}$/, { message: "Enter 6-digit code" }),
});

export default function AdminLoginForm({ onSuccess }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams?.get("next") || "/admin";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}public/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data?.message || "Login failed");
      }
      const { token, user } = data || {};

      if (!token) {
        throw new Error("Login failed");
      }

      document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax`;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user || null));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      onSuccess?.({ token, user });
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      setError(err?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Username
          </label>
          <Input
            placeholder="Enter username"
            {...form.register("username")}
            autoComplete="username"
          />
          {form.formState.errors.username?.message && (
            <p className="text-xs text-red-600">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...form.register("password")}
              autoComplete="current-password"
              className="pr-11"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeClosed className="h-5 w-5" />
              )}
            </button>
          </div>
          {form.formState.errors.password?.message && (
            <p className="text-xs text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Authenticator Code
          </label>
          <Input
            placeholder="Enter 6-digit code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            {...form.register("totp")}
          />
          {form.formState.errors.totp?.message && (
            <p className="text-xs text-red-600">
              {form.formState.errors.totp.message}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <LoadingButton
          type="submit"
          loading={loading}
          className="w-full h-11"
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
}
