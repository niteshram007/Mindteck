"use client";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/app/utils/axiosInstance";
import LoadingButton from "@/components/ui/loading-button";
import useReCaptcha from "@/app/utils/useReCaptcha";
import { withReCaptcha } from "@/app/utils/withReCaptcha";

const MAX_FEEDBACK_CHARS = 1000;

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  postalAddress: "",
  disclosureOfInformation: "",
  clarityAndTransparency: "",
  responseTime: "",
  timelyInformation: "",
  satisfactionWithShareTransferAgent: "",
  satisfactionWithInvestorRelations: "",
  overallSatisfactionAsInvestor: "",
  comments: "",
  token: "string",
};
const ratingOptions = ["Excellent", "Good", "Satisfactory", "Average", "Poor"];

const investorFeedbackSchema = z.object({
  firstName: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  lastName: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  telephone: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  postalAddress: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  disclosureOfInformation: z.string(),
  clarityAndTransparency: z.string(),
  responseTime: z.string(),
  timelyInformation: z.string(),
  satisfactionWithShareTransferAgent: z.string(),
  satisfactionWithInvestorRelations: z.string(),
  overallSatisfactionAsInvestor: z.string(),
  comments: z.string().max(MAX_FEEDBACK_CHARS, "Maximum 1000 characters allowed"),
  token: z.string(),
});
function FeedbackForm() {
  const {
    ReCaptchaComponent,
    loading,
    refreshCaptcha,
    token,
    handleVerify,
    isChecked,
  } = useReCaptcha();
  const [openInvestorForm, setOpenInvestorForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const form = useForm({
    resolver: zodResolver(investorFeedbackSchema),
    defaultValues,
  });
  const onSubmit = async (data) => {
    if (!isChecked) {
      setCaptchaError("Please verify captcha first");
      setIsSubmitted(false);
      return;
    }

    setCaptchaError("");
    let captchaToken = token;
    if (!captchaToken) {
      captchaToken = await handleVerify();
    }

    if (!captchaToken) {
      setCaptchaError("Please verify captcha first");
      setIsSubmitted(false);
      return;
    }

    try {
      await axiosInstance.post("public/investor-feedback/create", {
        ...data,
        token: captchaToken,
        sourceType: "Investors",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      });
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(false);
    } finally {
      refreshCaptcha();
    }
  };
  return (
    <div>
      <div className="container text-center font-inter mt-10">
        <p className="text-2xl font-[500]"> Help us serve you better</p>
        <p className="text-xl">
          Please take a moment to complete our Investor{" "}
          <button
            className="underline cursor-pointer"
            onClick={() => {
              setCaptchaError("");
              setIsSubmitted(false);
              setOpenInvestorForm(true);
            }}
          >
            Feedback Form.
          </button>
          <br />
          or write to: <span className="underline">info@mindteck.com</span>
        </p>
      </div>

      <Sheet
        open={openInvestorForm}
        onOpenChange={(value) => {
          setOpenInvestorForm(value);
          if (!value) {
            setCaptchaError("");
          }
        }}
      >
        <SheetContent className="max-h-[100vh] overflow-y-auto w-full sm:w-[400px] transition-all">
          <SheetHeader>
            <SheetTitle>Investor Feedback</SheetTitle>
          </SheetHeader>
          {isSubmitted ? (
            <div className="text-center">
              <h1 className="text-2xl font-semibold mt-10 text-[#0a4a3c]">
                Thank you for
                <br /> your valuable feedback.
              </h1>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-1 gap-y-3 font-inter">
                  <div>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              type="email"
                              autoComplete="email"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telephone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="telephone"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="postalAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Postal Address"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="disclosureOfInformation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disclosure of Information</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="clarityAndTransparency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Clarity and transparency of information
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="responseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response time for your queries</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="timelyInformation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timely information</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="satisfactionWithShareTransferAgent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Your satisfaction level for responses by Share
                            Transfer Agent
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="satisfactionWithInvestorRelations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Your satisfaction level for services by Investor
                            Relations team
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="overallSatisfactionAsInvestor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Your satisfaction level as a Mindteck investor
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ratingOptions.map((el) => (
                                <SelectItem value={el} key={el}>
                                  {el}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Comments/Suggestions</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Comments/Suggestions"
                              {...field}
                              className="h-9"
                              maxLength={MAX_FEEDBACK_CHARS}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {ReCaptchaComponent}
                    {captchaError ? (
                      <p className="mt-2 text-sm text-red-500">{captchaError}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-3">
                  <LoadingButton
                    type="button"
                    variant="destructive"
                    className="font-inter"
                    onClick={() => {
                      setOpenInvestorForm(false);
                    }}
                    disabled={loading}
                    loading={form.formState.isSubmitting}
                  >
                    Close
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    className="font-inter"
                    disabled={loading}
                    loading={form.formState.isSubmitting}
                  >
                    Submit
                  </LoadingButton>
                </div>
              </form>
            </Form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default withReCaptcha(FeedbackForm);
