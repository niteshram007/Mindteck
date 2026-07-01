import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog, DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { addUpdateFinancialInformation } from "../../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { axiosInstance } from "../../../utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateFinancialYears } from "@/app/utils/constant";
import LoadingButton from "@/components/ui/loading-button";

const FINANCIAL_YEAR_REGEX = /^\d{4}-\d{4}$/;

const defaultSectionArray = {
  title: "",
  file: "",
};
const defaultValues = {
  financialYear: "",
  quarter: "",
  sections: [defaultSectionArray, defaultSectionArray],
};

const itemsSchema = z
  .object({
    title: z.string(),
    file: z.string(),
  })
  .superRefine((data, ctx) => {
    // If title is filled, file should be required
    if (data.title && !data.file) {
      ctx.addIssue({
        path: ["file"],
        message: "File is required when title is provided",
        code: z.ZodIssueCode.custom,
      });
    }
  });
const formSchema = z.object({
  financialYear: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(FINANCIAL_YEAR_REGEX, { message: "Use format YYYY-YYYY" }),
  quarter: z.string().min(1, { message: "Required" }),
  sections: z.array(itemsSchema),
});

export default function AddFinancialReport({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef([]);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "sections",
  });
  const financialYears = generateFinancialYears();
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateFinancialInformation(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error.response.data.error || "There was a problem with your request.",
      });
    },
  });
  function onSubmit(data) {
    const filterUploadFiles = data?.sections?.filter((el) => el.title !== "");
    if (filterUploadFiles.length === 0) {
      toast({
        variant: "destructive",
        description: "Please select at-least one type",
      });
      return;
    }
    if (isEditOrUpdate) {
      mutation.mutate({
        id: row.id,
        title: data?.sections[0].title,
        file: { filePath: data?.sections[0].file, mimetype: "application/pdf" },
      });
      return;
    }
    mutation.mutate({
      ...data,
      sections: filterUploadFiles?.map((el) => ({
        ...el,
        file: { filePath: el.file, mimetype: "application/pdf" },
      })),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        sections: row?.sections?.map((el) => ({
          file: el.file.filePath,
          title: el.title,
        })),
      });
    }
  }, [row]);

  const handleFileChange = async (e, index) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      setUploadIndex(index);
      setUploading(true);
      setUploadingIndex(index);
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post(
        "financial-info/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
      form.setValue(`sections.${index}.file`, data?.filePath);
      form.clearErrors(`sections.${index}.file`);
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      setUploading(false);
      toast({
        variant: "destructive",
        title: "Failed to upload file. Please try again",
      });
    }
  };

  return (
    <Dialog open>
      <DialogContent
        className="max-w-4xl max-h-[600px] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditOrUpdate ? "Update" : "Add"} Financial Information
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="financialYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Financial Year (e.g., 2026-2027)"
                          list="financial-info-financial-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                        />
                      </FormControl>
                      <datalist id="financial-info-financial-years">
                        {financialYears?.map((el) => (
                          <option value={el} key={el} />
                        ))}
                      </datalist>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="quarter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quarter</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isEditOrUpdate}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Quarter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Q1">Q1</SelectItem>
                          <SelectItem value="Q2">Q2</SelectItem>
                          <SelectItem value="Q3">Q3</SelectItem>
                          <SelectItem value="Q4">Q4</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {fields.map((el, index) => (
              <Card key={el.id} className="shadow-md rounded-sm p-2 mb-3">
                <div className="grid grid-cols-2 gap-2 ">
                  <div>
                    <FormField
                      control={form.control}
                      name={`sections.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select Option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value="Financial Results"
                                disabled={form
                                  .watch("sections")
                                  .some(
                                    (el) => el.title === "Financial Results"
                                  )}
                              >
                                Financial Results
                              </SelectItem>
                              <SelectItem
                                value="Investor Presentation"
                                disabled={form
                                  .watch("sections")
                                  .some(
                                    (el) => el.title === "Investor Presentation"
                                  )}
                              >
                                Investor Presentation
                              </SelectItem>
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
                      name={`sections.${index}.file`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attachment</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              ref={(el) => (inputFileRef.current[index] = el)}
                              onChange={(e) => {
                                handleFileChange(e, index);
                              }}
                              size="small"
                              className="h-8"
                            />
                          </FormControl>
                          {uploading && uploadIndex === index && (
                            <div className="w-full h-2 mt-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          )}

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {isEditOrUpdate &&
                  form.watch("sections") &&
                  form.watch("sections")[0] && (
                    <p className="text-sm">
                      Current File:{" "}
                      <span className="text-xs">
                        {form.watch("sections")[0]?.file || ""}
                      </span>
                    </p>
                  )}
              </Card>
            ))}

            <DialogFooter className="justify-end mt-4 gap-2">
              <LoadingButton
                type="button"
                variant="destructive"
                size="lg"
                onClick={onClose}
                loading={mutation.isPending}
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
