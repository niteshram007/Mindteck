"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/app/utils/axiosInstance";
import LoadingButton from "../ui/loading-button";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";
import useReCaptcha from "@/app/utils/useReCaptcha";
import { withReCaptcha } from "@/app/utils/withReCaptcha";
import Link from "next/link";

const MAX_FEEDBACK_CHARS = 1000;
const formCheckboxClassName =
  "mt-0.5 border-[#111111] bg-white data-[state=checked]:border-[#111111] data-[state=checked]:bg-[#111111] data-[state=checked]:text-white";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  job: "",
  company: "",
  country: "",
  message: "",
  termsCondition: false,
};

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  lastName: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  job: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  company: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  country: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  message: z
    .string()
    .min(1, { message: "Required" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Enter a valid email address" })
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  telephone: z
    .string()
    .trim()
    .max(MAX_FEEDBACK_CHARS, { message: "Maximum 1000 characters allowed" }),
  termsCondition: z
    .boolean()
    .refine((value) => value === true, {
      message: "Please accept the consent terms",
    }),
});

function ContactForm({ requireManualCaptcha = true }) {
  const { toast } = useToast();
  const {
    ReCaptchaComponent,
    loading,
    refreshCaptcha,
    handleVerify,
    isChecked,
  } = useReCaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const resolveCaptchaToken = async () => {
    const retryDelays = [0, 700, 1200];

    for (const delay of retryDelays) {
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const nextToken = await handleVerify();
      if (nextToken) {
        return nextToken;
      }
    }

    return null;
  };

  const onSubmit = async (data) => {
    if (requireManualCaptcha && !isChecked) {
      toast({
        variant: "destructive",
        title: "Please verify captcha first",
      });
      return;
    }

    // Always request a fresh token at submit time and retry briefly
    // for slow-loading reCAPTCHA scripts on mobile networks.
    const captchaToken = await resolveCaptchaToken();

    if (!captchaToken) {
      toast({
        variant: "destructive",
        title: "Please verify captcha first",
      });
      return;
    }

    try {
      const normalizedTelephone = String(data.telephone || "").trim();
      const req = {
        token: captchaToken,
        ...data,
        telephone: normalizedTelephone,
        smsOptIn: data.termsCondition === true && Boolean(normalizedTelephone),
        emailOptIn: false,
        marketingUpdates: false,
        fullname: `${data.firstName} ${data.lastName}`.trim(),
        sourceType: "Industries",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      };
      await axiosInstance.post("public/contact/create", req);
      form.reset(defaultValues);
      setIsSubmitted(true);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to submit. Please try again";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      refreshCaptcha();
    }
  };

  return (
    <section
      id="feedback-form-section"
      className="text-black pt-10 pb-20 bg-[#DDDEDE] scroll-mt-[120px] lg:scroll-mt-[190px]"
    >
      <div className="container">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-athelas font-normal text-center text-secondary">
          Get the insights you need
        </h2>
        <p className="text-base text-center mb-10 mt-5 font-normal">
          Access expert knowledge and actionable insights to make
          <br />
          informed decisions and drive your business forward.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Contact form">
            <div className="formContainer md:max-w-[600px] w-full max-w-[100%] m-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            id="feedback-first-name"
                            placeholder="First Name"
                            aria-label="First Name"
                            autoComplete="given-name"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            autoComplete="family-name"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            autoComplete="email"
                            inputMode="email"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            autoComplete="tel"
                            inputMode="tel"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Job Title"
                            aria-label="Job Title"
                            autoComplete="organization-title"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Company"
                            aria-label="Company"
                            autoComplete="organization"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Country"
                            aria-label="Country"
                            autoComplete="country-name"
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group col-span-2">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            type="text"
                            placeholder="Message"
                            aria-label="Message"
                            rows={5}
                            className="bg-white"
                            maxLength={MAX_FEEDBACK_CHARS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group col-span-2">
                  <FormField
                    control={form.control}
                    name="termsCondition"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-2 items-start">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              aria-label="Agree to submit consent terms"
                              className={formCheckboxClassName}
                            />
                          </FormControl>
                          <FormLabel className="text-sm leading-6">
                            By clicking on the submit button, you agree to
                            receive text communications regarding IT related
                            services from Mindteck. Message and data rates may
                            apply, and message frequency may vary. To stop
                            receiving messages, reply &apos;STOP&apos; at any
                            time. For more info, reply &apos;HELP&apos;. Read
                            our{" "}
                            <Link href="/privacypolicy" className="underline">
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms-of-use" className="underline">
                              Terms &amp; Conditions
                            </Link>
                            .
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="form-group col-span-2 flex justify-between items-center flex-wrap gap-y-2">
                  {ReCaptchaComponent}
                  <LoadingButton
                    size="lg"
                    variant="secondary"
                    type="submit"
                    disabled={loading || (requireManualCaptcha && !isChecked)}
                    loading={form.formState.isSubmitting}
                  >
                    Submit
                  </LoadingButton>
                </div>
                {isSubmitted && (
                  <div
                    className="form-group col-span-2 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-md font-semibold text-[#0a4a3c]">
                      Thank you for reaching out! We've received your message
                      and our team will get back to you as soon as possible.
                    </p>
                  </div>
                )}
                <div className="form-group col-span-2 text-sm">
                  <p>
                    <Link href="/unsubscribe" className="underline text-primary">
                      Click here
                    </Link>{" "}
                    to opt out of Mindteck's mailing lists.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </section>
  );
}

export default withReCaptcha(ContactForm);
