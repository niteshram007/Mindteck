"use client";

import { useRef, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { MainNavBar } from "@/app/navbar";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import Breadcrumbs from "../Breadcrumbs";
import BannerImage from "../../assets/images/banners-and-bg/contact-us.jpg";
import { varFade } from "@/lib/animate";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import useReCaptcha from "@/app/utils/useReCaptcha";
import { withReCaptcha } from "@/app/utils/withReCaptcha";

const SUCCESS_MESSAGE =
  "You have successfully unsubscribed from further marketing emails from Mindteck.";

function UnsubscribeFormCard() {
  const { toast } = useToast();
  const emailRef = useRef(null);
  const { ReCaptchaComponent, loading, token, handleVerify, refreshCaptcha, isChecked } =
    useReCaptcha();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

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

  const onSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = String(emailRef.current?.value || "").trim().toLowerCase();

    if (!normalizedEmail) {
      toast({
        variant: "destructive",
        title: "Please enter your email address.",
      });
      return;
    }

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

    setIsSubmitting(true);
    try {
      await axiosInstance.post("public/unsubscribe/create", {
        email: normalizedEmail,
        token: captchaToken,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "/unsubscribe",
      });
      setIsUnsubscribed(true);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Unable to process unsubscribe request.";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
      refreshCaptcha();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <p className="text-[16px] leading-7 text-black mb-6">
        Enter your email address to opt out of Mindteck&apos;s mailing lists.
      </p>
      <form onSubmit={onSubmit} className="space-y-4" aria-label="Unsubscribe form">
        <Input
          ref={emailRef}
          type="email"
          defaultValue=""
          placeholder="Email address"
          aria-label="Email address"
          required
          disabled={isSubmitting || isUnsubscribed}
        />

        {ReCaptchaComponent}

        <LoadingButton
          type="submit"
          variant="secondary"
          size="lg"
          loading={isSubmitting}
          disabled={isUnsubscribed || loading || !isChecked}
        >
          Unsubscribe
        </LoadingButton>
      </form>
      {isUnsubscribed ? (
        <p className="text-[#0a4a3c] font-semibold mt-5">{SUCCESS_MESSAGE}</p>
      ) : null}
    </div>
  );
}

function UnsubscribePage() {
  return (
    <div className="font-inter">
      <div className="bg-gray-100 font-inter pt-2">
        <div className="container relative">
          <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <Image
              src={BannerImage}
              alt="Unsubscribe"
              className="h-full w-full max-h-[360px] object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <Breadcrumbs paths={["Unsubscribe"]} />
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varFade().inLeft}
              className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3"
            >
              Unsubscribe
            </motion.h1>
          </div>
        </section>
      </div>

      <section className="py-16 bg-[#DDDEDE]">
        <div className="container max-w-[640px]">
          <UnsubscribeFormCard />
        </div>
      </section>
      <Toaster />
    </div>
  );
}

export default withReCaptcha(UnsubscribePage);
