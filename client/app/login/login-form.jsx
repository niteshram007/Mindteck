"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { AlertCircle, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "../utils/axiosInstance";
import useReCaptcha from "../utils/useReCaptcha";
import { loginUser } from "@/lib/actions/login";

const defaultValues = {
  username: "",
  password: "",
};

const formSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
});

export default function LoginForm() {
  // const {
  //   ReCaptchaComponent,
  //   loading: loadingCaptcha,
  //   refreshCaptcha,
  //   token: googleCaptchaToken,
  // } = useReCaptcha();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (formData) => {
    try {
      // if (!googleCaptchaToken) {
      //   setError("Please verify captcha first");
      //   return;
      // }
      setLoading(true);
      const req = {
        // token: googleCaptchaToken,
        ...formData,
      };
      const data = await loginUser(req);
      const { token, user } = data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      router.push("/");
      setError("");
    } catch (error) {
      setError(error?.message || "Failed to login");
    } finally {
      setLoading(false);
      // refreshCaptcha();
    }
  };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     router.push("/admin");
  //   }
  // }, []);

  return (
    <div className="max-w-[500px] w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-5 space-y-4">
            {error && (
              <Alert variant="bgLightRed" className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="mb-0 font-inter">{error}</AlertTitle>
              </Alert>
            )}
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        className="h-8 "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...field}
                        className="h-8"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute right-2 top-8 bg-white">
                {showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    color="green"
                    onClick={() => {
                      setShowPassword((ps) => !ps);
                    }}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword((ps) => !ps);
                    }}
                  />
                )}
              </div>
            </div>
            {/* <div>{ReCaptchaComponent}</div> */}
            <div>
              <LoadingButton
                size="lg"
                className="w-full"
                // disabled={loadingCaptcha}
                loading={loading}
              >
                Login
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
