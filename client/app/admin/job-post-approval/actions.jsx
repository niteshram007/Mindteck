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
import { jobPostReview } from "../api-hook/mutations";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/Editor/Editor";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  category: "",
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
  review: "",
};

const formSchema = z.object({
  category: z.string().min(1, { message: "Required" }),
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
  skills: z.string().min(1, { message: "Required" }),
  jobDescription: z.string().min(1, { message: "Required" }),
  status: z.string().default("Active"),
  review: z.string(),
  isRemote: z.boolean().default(false),
});

export default function JobReview({ onClose, refetch, row }) {
  const { toast } = useToast();
  const [responsibilities, setResponsibilities] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [approvalType, setApprovalType] = useState({ open: false, type: "" });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => jobPostReview(row?._id, req),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: `Successfully Updated Status`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Something went wrong",
      });
    },
  });

  const handleApproveReject = (type) => {
    const jobDetail = form.getValues();
    const req = {
      ...jobDetail,
      reviewStatus: type,
    };
    mutation.mutate(req);
  };

  useEffect(() => {
    form.reset({
      ...row,
      experience: row.experience + "",
    });
  }, [row]);

  return (
   
      <Dialog open modal className="rounded-none">
        <DialogContent
          className="max-w-full max-h-full overflow-auto"
          onClose={onClose}
        >
          <DialogHeader>
            <DialogTitle>Job Review</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Job Title"
                            {...field}
                            className="h-8"
                            disabled={!editMode}
                          />
                        </FormControl>
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
                              disabled={!editMode}
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
                              disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                        <FormControl>
                          <Input
                            placeholder="City"
                            {...field}
                            className="h-8"
                            disabled={!editMode}
                          />
                        </FormControl>
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
                          <Input
                            placeholder="City"
                            {...field}
                            className="h-8"
                            disabled={!editMode}
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
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!editMode}
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
                            disabled={!editMode}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
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
                            disabled={!editMode}
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
                    disabled={!editMode}
                    defaultValue={row?.responsibilities ?? ""}
                    setContent={setResponsibilities}
                  />
                </div>
                <div className="col-span-2">
                  <hr />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review Remark</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Remark"
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
                {editMode ? (
                  <>
                    <LoadingButton
                      type="button"
                      size="lg"
                      onClick={() => {
                        handleApproveReject("Approved");
                      }}
                    >
                      Submit & Approve
                    </LoadingButton>
                    <LoadingButton
                      type="button"
                      size="lg"
                      variant="outline"
                      className="border-red-500 text-destructive"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      Cancel Edit
                    </LoadingButton>
                  </>
                ) : (
                  <>
                    <LoadingButton
                      type="button"
                      size="lg"
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      Edit
                    </LoadingButton>
                    <LoadingButton
                      type="button"
                      size="lg"
                      onClick={() => {
                        handleApproveReject("Approved");
                      }}
                    >
                      Approve
                    </LoadingButton>
                    <LoadingButton
                      type="button"
                      variant="destructive"
                      size="lg"
                      onClick={() => {
                        handleApproveReject("Rejected");
                      }}
                    >
                      Reject
                    </LoadingButton>
                  </>
                )}

                <LoadingButton
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Close
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    
  );
}
