"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Import RHF hook
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "./axiosInstance";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";
import useReCaptcha from "./useReCaptcha";
import { withReCaptcha } from "./withReCaptcha";


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

function ContactFormV2() {
  const { toast } = useToast();
  const { ReCaptchaComponent, loading, refreshCaptcha, token, handleVerify, isChecked } = useReCaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  }); // Use RHF hook

  const resolveCaptchaToken = async () => {
    const retryDelays = [0, 700, 1200];

    for (const delay of retryDelays) {
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const nextToken = token || (await handleVerify());
      if (nextToken) {
        return nextToken;
      }
    }

    return null;
  };

  const onSubmit = async (data) => {
    if (!isChecked) {
      toast({
        variant: "destructive",
        title: "Please verify captcha first",
      });
      return;
    }

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
      await axiosInstance.post("public/contact/create", {
        token: captchaToken,
        ...data,
        telephone: normalizedTelephone,
        smsOptIn: data.termsCondition === true && Boolean(normalizedTelephone),
        emailOptIn: false,
        marketingUpdates: false,
        fullname: `${data.firstName} ${data.lastName}`.trim(),
        sourceType: "Industries",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      });
      reset(defaultValues);
      setIsSubmitted(true);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong. Please try again";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      refreshCaptcha();
    }
    // Sending recaptcha token along with form data
  };

  return (
    <div>
      <Toaster />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="form-group">
          <Input
            id="name"
            type="text"
            placeholder="First Name"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("firstName", {
              required: "First name is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("lastName", {
              required: "Last name is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <Input
            type="email"
            placeholder="Work Email"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Enter a valid email address",
              },
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <Input
            type="tel"
            placeholder="Phone Number"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("telephone", {
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.telephone && (
            <span className="text-red-500 text-xs">
              {errors.telephone.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Job Title"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("job", {
              required: "Job Title is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.job && (
            <span className="text-red-500 text-xs">
              {errors.job.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Company"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("company", {
              required: "Company is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.company && (
            <span className="text-red-500 text-xs">
              {errors.company.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Country"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("country", {
              required: "Country is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.country && (
            <span className="text-red-500 text-xs">
              {errors.country.message}
            </span>
          )}
        </div>
        <div className="form-group col-span-2">
          <Textarea
            placeholder="Message"
            className="border-none bg-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-black"
            maxLength={MAX_FEEDBACK_CHARS}
            {...register("message", {
              required: "Message is required",
              maxLength: { value: MAX_FEEDBACK_CHARS, message: "Maximum 1000 characters allowed" },
            })}
          />
          {errors.message && (
            <span className="text-red-500 text-xs">
              {errors.message.message}
            </span>
          )}
        </div>
        <div className="form-group col-span-2">
          <Controller
            control={control}
            name="termsCondition"
            rules={{ validate: (value) => value || "Please accept the consent terms" }}
            render={({ field }) => (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms-condition"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  className={formCheckboxClassName}
                />
                <label
                  htmlFor="terms-condition"
                  className="text-xs font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  By clicking on the submit button, you agree to receive text
                  communications regarding IT related services from Mindteck.
                  Message and data rates may apply, and message frequency may
                  vary. To stop receiving messages, reply &apos;STOP&apos; at
                  any time. For more info, reply &apos;HELP&apos;. Read our{" "}
                  <Link href="/privacypolicy" className="underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-use" className="underline">
                    Terms &amp; Conditions
                  </Link>
                  .
                </label>
              </div>
            )}
          />
          {errors.termsCondition && (
            <span className="text-red-500 text-xs">{errors.termsCondition.message}</span>
          )}
        </div>
        <div className="form-group col-span-2  flex justify-between items-center flex-wrap gap-y-2">
          {ReCaptchaComponent}
          <LoadingButton
            size="lg"
            type="submit"
            disabled={loading || !isChecked}
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </div>
        {isSubmitted && (
          <div className="form-group col-span-2 text-center">
            <p className="text-md font-semibold text-[#0a4a3c]">
              Thank you for reaching out! We've received your message and our
              team will get back to you as soon as possible.
            </p>
          </div>
        )}
        <div className="form-group col-span-2 text-sm">
          <p>
            <Link href="/unsubscribe" className="underline">
              Click here
            </Link>{" "}
            to opt out of Mindteck's mailing lists.
          </p>
        </div>
      </form>
    </div>
  );
}

export default withReCaptcha(ContactFormV2);
