import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { addUpdateAnnualReport } from "../../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { axiosInstance } from "../../../utils/axiosInstance";
import { generateFinancialYears } from "@/app/utils/constant";
import { Trash } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";

const FINANCIAL_YEAR_REGEX = /^\d{4}-\d{4}$/;

const defaultSectionArray = {
  title: "",
  file: "",
};
const defaultValues = {
  financialYear: "",
  sections: [defaultSectionArray],
};

const normalizeAnnualReportFilePath = (filePath = "") => {
  const value = String(filePath || "").trim();
  if (!value) return "";
  if (value.includes("/")) return value;
  return `investor_annual_report/${value}`;
};

const itemsSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});
const formSchema = z.object({
  financialYear: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(FINANCIAL_YEAR_REGEX, { message: "Use format YYYY-YYYY" }),
  sections: z.array(itemsSchema),
});

export default function AddAnnualReport({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });
  const financialYears = generateFinancialYears();
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateAnnualReport(req, row?._id),
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
        title: data.sections[0].title,
        file: {
          filePath: normalizeAnnualReportFilePath(data.sections[0].file),
          mimetype: "application/pdf",
        },
        id: row.id,
      });
      return;
    }
    mutation.mutate({
      ...data,
      sections: filterUploadFiles?.map((el) => ({
        ...el,
        file: {
          filePath: normalizeAnnualReportFilePath(el.file),
          mimetype: "application/pdf",
        },
      })),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        sections: row.sections.map((el) => ({
          title: el.title,
          file: normalizeAnnualReportFilePath(el.file.filePath),
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
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post(
        "annual-report/upload",
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
      form.setValue(
        `sections.${index}.file`,
        normalizeAnnualReportFilePath(data.filePath),
      );
      form.clearErrors(`sections.${index}.file`);
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      setUploading(false);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to upload file. Please try again",
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
            {isEditOrUpdate ? "Update" : "Add"} Annual Report
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
                          list="annual-report-financial-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                        />
                      </FormControl>
                      <datalist id="annual-report-financial-years">
                        {financialYears?.map((el) => (
                          <option value={el} key={el} />
                        ))}
                      </datalist>

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
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              size="small"
                              className="h-8"
                              placeholder="Enter Title"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`sections.${index}.file`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attachment</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              ref={(el) => (inputFileRef.current[index] = el)}
                              onChange={(e) => {
                                handleFileChange(e, index);
                              }}
                              size="small"
                              className="h-8"
                            />
                          </FormControl>
                          {uploading && uploadIndex === index && (
                            <div className="h-2 mt-2">
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
                    {index !== 0 && (
                      <Trash
                        size={20}
                        className="ml-auto cursor-pointer mt-4 text-2xl"
                        color="red"
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    )}
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
            {!isEditOrUpdate && (
              <Button
                onClick={() => {
                  append(defaultSectionArray);
                }}
                type="button"
              >
                Add New Row
              </Button>
            )}
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
