import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { addUpdateJobPost } from "../api-hook/mutations";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllCountry, useGetAllJobCategory } from "../api-hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthProvider } from "../layout";
import Editor from "@/components/Editor/Editor";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  categoryId: "",
  title: "",
  experience: "",
  qualifications: "",
  country: "",
  city: "",
  jobType: "",
  isRemote: false,
  status: "Active",
  jobDescription: "",
  skills: "",
};

const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Required" }),
  jobType: z.string().min(1, { message: "Required" }),
  title: z.string().min(1, { message: "Required" }),
  experience: z
    .string() // Start with string input
    .transform((val) => (val ? Number(val) : NaN)) // Convert string to number
    .refine((val) => !isNaN(val) && val > 0, {
      // Check if the value is a valid positive number
      message: "Please enter a valid positive number", // Custom error message
    }),
  qualifications: z.string().min(1, { message: "Required" }),
  country: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  skills: z.string(),
  jobDescription: z.string().min(1, { message: "Required" }),
  status: z.string().default("Active"),
  isRemote: z.boolean().default(false),
});

export default function AddJobPost({ isEditOrUpdate, onClose, refetch, row }) {
  const { data: countryList } = useGetAllCountry();
  const { toast } = useToast();
  const { user } = useContext(AuthProvider);
  const [responsibilities, setResponsibilities] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { data: CategoryList } = useGetAllJobCategory();

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateJobPost(req, row?._id),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: `Successfully ${isEditOrUpdate ? "Updated" : "Added"} Job Post!`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Something went wrong",
      });
    },
  });
  function onSubmit(data) {
    if (!responsibilities) {
      toast({
        variant: "destructive",
        title: "Please Enter Responsibilities",
      });
      return;
    }
    const req = {
      ...data,
      userId: user?._id,
      experience: +data.experience,
      qualifications: data.qualifications,
      responsibilities: responsibilities,
    };
    mutation.mutate(req);
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        experience: row.experience + "",
      });
    }
  }, [row]);

  return (
    <Dialog open modal className="rounded-none">
      <DialogContent
        className="max-w-full max-h-full overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>Create Job Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Job Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {CategoryList?.map((el) => (
                            <SelectItem value={el._id} key={el._id}>
                              {el.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div></div>
              <div className="flex items-center gap-10">
                <div className="w-[80%]">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Job Title"
                            {...field}
                            className="h-8"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[20%] mt-5 flex gap-2">
                  <FormField
                    control={form.control}
                    name="isRemote"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormControl>
                          <Checkbox
                            id="job-type"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 border"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Label
                    htmlFor="job-type"
                    className="text-sm font-semibold mt-[0px !important]"
                  >
                    Remote
                  </Label>
                </div>
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualifications</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Qualifications"
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
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Experience"
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {countryList?.map((el) => (
                            <SelectItem value={el.name} key={el._id}>
                              {el.name}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} className="h-8" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {[
                            "Full-time",
                            "Part-time",
                            "Contract",
                            "Internship",
                          ].map((el) => (
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
              {isEditOrUpdate && (
                <div>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row gap-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Active" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Active
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Expired" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Expired
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skill</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter skills e.g; skill-1 , skill-2"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <Label>Responsibilities</Label>
                <Editor
                  defaultValue={row?.responsibilities ?? ""}
                  setContent={setResponsibilities}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Job Description"
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

            <DialogFooter className="justify-end mt-3">
              <LoadingButton
                type="button"
                variant="destructive"
                size="lg"
                loading={mutation.isPending}
                onClick={onClose}
              >
                Close
              </LoadingButton>

              <LoadingButton
                type="submit"
                size="lg"
                loading={mutation.isPending}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
