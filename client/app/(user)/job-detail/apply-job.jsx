"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { applicationCreate } from "../../admin/api-hook/mutations";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "../../utils/axiosInstance";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import useReCaptcha from "@/app/utils/useReCaptcha";
import { withReCaptcha } from "@/app/utils/withReCaptcha";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
  value: (currentYear - index).toString(),
  label: (currentYear - index).toString(),
}));
const months = Array.from({ length: 12 }, (_, index) => ({
  value: (12 - index).toString(),
  label: (12 - index).toString(),
}));
const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const defaultValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  passportNo: "",
  mobileNo: "",
  panCardNo: "",
  skillsSet: "",
  qualifications: {
    courseName: "",
    university: "",
    yearOfPassing: "",
  },
  employmentDetails: {
    companyName: "",
    role: "",
    duration: {
      years: "",
      months: "",
    },
    salary: "",
    expectedCtc: "",
    totalExperience: "",
  },
};

const stepFormMapping = {
  1: ["firstName", "lastName", "dateOfBirth", "gender", "email", "mobileNo"],
  2: ["skillsSet"],
  3: [
    "qualifications.courseName",
    "qualifications.university",
    "qualifications.yearOfPassing",
  ],
  4: [
    "employmentDetails.companyName",
    "employmentDetails.role",
    "employmentDetails.salary",
    "employmentDetails.expectedCtc",
    "employmentDetails.totalExperience",
    "employmentDetails.duration.years",
    "employmentDetails.duration.months",
  ],
};
const formSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in yyyy-mm-dd format")
    .transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    }),
  gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
  email: z.string().email().min(1, { message: "Required" }),
  passportNo: z.string().optional(),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  panCardNo: z
    .string()
    .refine((value) => value === "" || panCardPattern.test(value), {
      message: "Invalid PAN card format",
    })
    .optional(),
  skillsSet: z.string().min(1, { message: "Required" }),
  employmentDetails: z.object({
    companyName: z.string().min(1, { message: "Required" }),
    role: z.string().min(1, { message: "Required" }),
    duration: z.object({
      years: z
        .string()
        .transform((val) => (val ? Number(val) : NaN))
        .refine((val) => !isNaN(val) && val > 0, {
          message: "Required",
        }),
      months: z
        .string()
        .transform((val) => (val ? Number(val) : NaN))
        .refine((val) => !isNaN(val) && val > 0, {
          message: "Required",
        }),
    }),
    salary: z.coerce
      .number()
      .positive()
      .refine((value) => value % 10000 === 0, {
        message: "The number must be a multiple of 10000",
      }),
    expectedCtc: z.coerce
      .number()
      .positive()
      .refine((value) => value % 10000 === 0, {
        message: "The number must be a multiple of 10000",
      }),
    totalExperience: z.coerce.number().positive().max(100),
  }),
  qualifications: z.object({
    courseName: z.string().min(1, { message: "Required" }),
    university: z.string().min(1, { message: "Required" }),
    yearOfPassing: z
      .string()
      .transform((val) => (val ? Number(val) : NaN))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Required",
      }),
  }),
});

let validCount = 1;
function ApplyJob({ jobId, jobTitle }) {
  const { toast } = useToast();
  const router = useRouter();
  const { ReCaptchaComponent, loading, refreshCaptcha, token, handleVerify } = useReCaptcha();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(1);
  const [fileDetail, setFileDetail] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const getFormElementByStep = useCallback(() => {
    if (steps === 1) {
      return <StepOneForm form={form.control} />;
    }
    if (steps === 2) {
      return <StepTwoForm form={form.control} />;
    }
    if (steps === 3) {
      return <StepThreeForm form={form.control} />;
    }
    if (steps === 4) {
      return (
        <StepFourForm
          form={form.control}
          fileDetail={fileDetail}
          setFileDetail={setFileDetail}
          ReCaptchaComponent={ReCaptchaComponent}
          token={token}
        />
      );
    }
    return null;
  }, [steps, fileDetail, ReCaptchaComponent]);

  const handleNextAndSubmitClick = async () => {
    if (steps !== 4) {
      const isValid = await form.trigger(stepFormMapping[steps]);
      if (isValid) {
        setSteps((ps) => ps + 1);
      }
    } else {
      form.handleSubmit(onSubmit)();
    }
  };
  const handlePerviousClick = () => {
    setSteps((ps) => ps - 1);
  };

  const onSubmit = async (data) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Please verify the captcha",
      });
      return;
    }
    if (!fileDetail) {
      toast({
        variant: "destructive",
        title: "Please upload you resume.",
      });
      return;
    }
    try {
      const req = {
        ...data,
        dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
        jobId: jobId,
        file: { ...fileDetail },
        token: captchaToken,
      };
      await applicationCreate(req);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Something went wrong",
      });
    } finally {
      refreshCaptcha();
    }
  };
  useEffect(() => {
    if (validCount < steps) {
      validCount += 1;
    }
  }, [steps]);

  const currentTabClass =
    "text-blue-700 bg-blue-100 border border-blue-300 dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400";

  const inActiveTabClass =
    " text-gray-900 bg-gray-100 border border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";

  return (
    <>
      <div className="text-right">
        <Button
          className="max-w-[150px] w-full rounded-md h-11 font-inter mb-11"
          onClick={() => {
            setOpen(true);
            setSteps(1);
            form.reset();
            form.clearErrors();
          }}
        >
          Apply Now <ArrowRight />
        </Button>
        <Toaster />
      </div>
      {open && (
        <Dialog open>
          <DialogContent
            className="max-w-5xl max-h-[600px] overflow-auto"
            onClose={() => {
              setOpen(false);
              setIsSubmitted(false);
              setFileDetail(null);
              validCount = 1;
            }}
          >
            <DialogHeader>
              <DialogTitle className="font-inter">
                You are applying for :{" "}
                <span className="font-bold text-primary">{jobTitle}</span>
              </DialogTitle>
            </DialogHeader>

            {isSubmitted ? (
              <div className="text-center space-y-3">
                <h1 className="text-2xl font-semibold text-emerald-700 font-inter">
                  Application Submitted Successfully
                </h1>
                <p className="text-sm text-gray-600 font-inter">
                  Thank you for applying for the <b>{jobTitle}</b> role. Our HR
                  team is reviewing your application and will contact you if you
                  are shortlisted for an interview. We appreciate your interest
                  in joining our team.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    router.push("/job-search");
                  }}
                >
                  <ArrowLeft /> Back to job search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-12 md:gap-10 gap:0">
                <div className="md:col-span-3 lg:col-span-3 sm:col-span-12 col-span-12 md:mb-0 mb-8">
                  <ol className="space-y-4 w-fill ">
                    <li>
                      <div
                        className={`w-full p-4 rounded-lg cursor-pointer ${
                          steps === 1 ? currentTabClass : inActiveTabClass
                        }`}
                        role="alert"
                        onClick={() => {
                          setSteps(1);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="sr-only">Personal Details</span>
                          <h3 className="font-medium text-md">
                            Personal Details
                          </h3>
                          <svg
                            className="rtl:rotate-180 w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`w-full p-4 rounded-lg  ${
                          validCount >= 2
                            ? "opacity-100 cursor-pointer"
                            : "opacity-50"
                        } ${steps === 2 ? currentTabClass : inActiveTabClass}`}
                        role="alert"
                        onClick={
                          validCount >= 2
                            ? () => {
                                setSteps(2);
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="sr-only">Skills Set</span>
                          <h3 className="font-medium text-md">Skills Set</h3>
                          <svg
                            className="rtl:rotate-180 w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`w-full p-4 rounded-lg  ${
                          validCount >= 3
                            ? "opacity-100 cursor-pointer"
                            : "opacity-50"
                        } ${steps === 3 ? currentTabClass : inActiveTabClass}`}
                        role="alert"
                        onClick={
                          validCount >= 3
                            ? () => {
                                setSteps(3);
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="sr-only">Qualification</span>
                          <h3 className="font-medium text-md">Qualification</h3>
                          <svg
                            className="rtl:rotate-180 w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`w-full p-4 rounded-lg ${
                          validCount >= 4
                            ? "opacity-100 cursor-pointer"
                            : "opacity-50"
                        } ${steps === 4 ? currentTabClass : inActiveTabClass}`}
                        role="alert"
                        onClick={
                          validCount >= 4
                            ? () => {
                                setSteps(4);
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="sr-only">Current Employment</span>
                          <h3 className="font-medium text-md">
                            {" "}
                            Current Employment
                          </h3>
                          <svg
                            className="rtl:rotate-180 w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="md:col-span-9 lg:col-span-9 sm:col-span-12 col-span-12">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="h-full"
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>{getFormElementByStep()}</div>
                        <div className="flex justify-between mt-3">
                          <Button
                            type="button"
                            onClick={handlePerviousClick}
                            className="bg-white text-black border-black border"
                            disabled={steps === 1}
                          >
                            <ArrowLeft /> Previous
                          </Button>
                          <LoadingButton
                            type={"button"}
                            className="bg-primary"
                            // disabled={!recaptchaToken}
                            loading={form.formState.isSubmitting}
                            onClick={handleNextAndSubmitClick}
                          >
                            {steps === 4 ? (
                              "Submit"
                            ) : (
                              <>
                                Next
                                <ArrowRight />
                              </>
                            )}
                          </LoadingButton>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

const StepOneForm = ({ form }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-3">
      <div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter First Name"
                  {...field}
                  className="h-8"
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
              <FormLabel>last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter last Name"
                  {...field}
                  className="h-8"
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Enter last Name"
                  {...field}
                  className="h-8"
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
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-2 mt-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Email Address"
                  {...field}
                  className="h-8"
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
          name="mobileNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Mobile No"
                  {...field}
                  className="h-8"
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
          name="passportNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport No</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Passport No"
                  {...field}
                  className="h-8"
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
          name="panCardNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pan Card No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Pan Card number"
                  {...field}
                  className="h-8"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const StepTwoForm = ({ form }) => {
  return (
    <div className="grid grid-cols-1">
      <div>
        <FormField
          control={form.control}
          name="skillsSet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Set</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Skills"
                  {...field}
                  className="min-h-[120px] w-full"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const StepThreeForm = ({ form }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-3">
      <div>
        <FormField
          control={form.control}
          name="qualifications.courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Course Name"
                  {...field}
                  className="h-8"
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
          name="qualifications.university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter University"
                  {...field}
                  className="h-8"
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
          name="qualifications.yearOfPassing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Passing</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((el) => (
                    <SelectItem value={el.value} key={el.label}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
const StepFourForm = ({
  form,
  fileDetail,
  setFileDetail,
  ReCaptchaComponent,
  token,
}) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputFileRef = useRef();
  const handleResumeUpload = async (e) => {
    setFileDetail(null);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axiosInstance.post(
        "public/application/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileDetail(data);
      setUploading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Failed to upload resume. Please try again.",
      });
      setUploading(false);
    }
  };
  const formContext = useFormContext();
  const selectedWorkingYear = formContext.watch(
    "employmentDetails.duration.years"
  );
  const currentMonth = new Date().getMonth() + 1;
  console.log(
    formContext.watch("employmentDetails.duration.months"),
    "formContext"
  );
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-3">
      <div>
        <FormField
          control={form.control}
          name="employmentDetails.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Company Name"
                  {...field}
                  className="h-8"
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
          name="employmentDetails.role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter Role" {...field} className="h-8" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="employmentDetails.duration.years"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    formContext.setValue(
                      "employmentDetails.duration.months",
                      ""
                    );
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {years.map((el) => (
                      <SelectItem value={el.value} key={el.label}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentDetails.duration.months"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Month</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <span>
                        {formContext.watch(
                          "employmentDetails.duration.months"
                        ) || "Select an option"}
                      </span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {months.map((el) => (
                      <SelectItem
                        value={el.value}
                        key={el.label}
                        disabled={
                          +selectedWorkingYear === currentYear
                            ? +el.value > currentMonth
                            : undefined
                        }
                      >
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <FormField
          control={form.control}
          name="employmentDetails.salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current CTC</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Current CTC"
                  {...field}
                  className="h-8"
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
          name="employmentDetails.expectedCtc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected CTC</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Expected CTC"
                  {...field}
                  className="h-8"
                  type="number"
                  step="10000"
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
          name="employmentDetails.totalExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Experience</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Experience"
                  {...field}
                  className="h-8"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>{ReCaptchaComponent}</div>
      {token && (
        <div>
          <input
            ref={inputFileRef}
            type="file"
            className="hidden"
            onChange={handleResumeUpload}
          />
          <LoadingButton
            size="small"
            type="button"
            className="text-white bg-black bg-opacity-70 px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              inputFileRef.current.click();
            }}
            loading={uploading}
          >
            Attach Resume
          </LoadingButton>
          {uploading && <p>Upload in progress...</p>}
          {fileDetail && !uploading && (
            <Label className="italic text-emerald-700 font-inter">
              Successfully uploaded
            </Label>
          )}
          <div className="flex flex-col gap-y-1.5 mt-2">
          <span className="text-sm leading-none">Max Size: 5mb </span><span className="text-sm leading-none">Allowed file type: .pdf, .doc, .docx</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default withReCaptcha(ApplyJob);
