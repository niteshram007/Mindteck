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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addUpdateInvestorByType } from "@/app/admin/api-hook/mutations";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { generateFinancialYears } from "@/app/utils/constant";
import LoadingButton from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const FINANCIAL_YEAR_REGEX = /^\d{4}-\d{4}$/;

const typesRequiringFinancialYear = new Set([
  "Annual Return",
  "Transfer of equity shares to IEPF",
]);

const singleFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  financialYear: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || FINANCIAL_YEAR_REGEX.test(value), {
      message: "Use format YYYY-YYYY",
    }),
  file: z.string().min(1, { message: "Required" }),
});

const multiItemSchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});

const multiFormSchema = z.object({
  financialYear: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(FINANCIAL_YEAR_REGEX, { message: "Use format YYYY-YYYY" }),
  items: z.array(multiItemSchema).min(1),
});

const defaultValues = {
  title: "",
  financialYear: "",
  file: "",
  items: [{ title: "", file: "" }],
};

const defaultMultiRow = {
  title: "",
  file: "",
};

export default function AddUpdateInvestorByType({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
  type,
  allowMultipleByYear = false,
  minFinancialYear = 2004,
}) {
  const { toast } = useToast();
  const [fileData, setFileData] = useState(null);
  const [multiFileData, setMultiFileData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [isMultiSubmitting, setIsMultiSubmitting] = useState(false);

  const requiresFinancialYear = typesRequiringFinancialYear.has(type);
  const isMultipleMode = allowMultipleByYear && requiresFinancialYear && !isEditOrUpdate;
  const financialYears = generateFinancialYears(minFinancialYear);

  const form = useForm({
    resolver: zodResolver(isMultipleMode ? multiFormSchema : singleFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateInvestorByType(req, row?._id),
    onSuccess: () => {
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
          error?.response?.data?.error ||
          "There was a problem with your request.",
      });
    },
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosInstance.post("pdf-with-title/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    });

    return data;
  };

  const handleFileChange = async (e, itemIndex = null) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const key = itemIndex === null ? "single" : itemIndex;
      setUploadingKey(key);

      const uploadedData = await uploadFile(file);

      if (isMultipleMode && itemIndex !== null) {
        setMultiFileData((prev) => ({
          ...prev,
          [itemIndex]: uploadedData,
        }));
        form.setValue(`items.${itemIndex}.file`, uploadedData?.filePath || "uploaded");
        form.clearErrors(`items.${itemIndex}.file`);
      } else {
        setFileData(uploadedData);
        form.setValue("file", "uploaded");
        form.clearErrors("file");
      }

      setUploadProgress(0);
      setUploadingKey(null);
    } catch (error) {
      setUploadProgress(0);
      setUploadingKey(null);
      toast({
        variant: "destructive",
        title: "Failed to upload file. Please try again",
      });
    }
  };

  const handleMultiCreate = async (data) => {
    const year = (data.financialYear || "").trim();
    if (!year) {
      form.setError("financialYear", { type: "manual", message: "Required" });
      return;
    }

    const preparedItems = (data.items || [])
      .map((item, index) => ({
        index,
        title: (item?.title || "").trim(),
        file: multiFileData[index],
      }))
      .filter((item) => item.title || item.file);

    if (!preparedItems.length) {
      toast({
        variant: "destructive",
        title: "Please add at least one file",
      });
      return;
    }

    let hasError = false;
    preparedItems.forEach((item) => {
      if (!item.title) {
        hasError = true;
        form.setError(`items.${item.index}.title`, { type: "manual", message: "Required" });
      }
      if (!item.file) {
        hasError = true;
        form.setError(`items.${item.index}.file`, { type: "manual", message: "Required" });
      }
    });

    if (hasError) {
      return;
    }

    setIsMultiSubmitting(true);
    try {
      for (const item of preparedItems) {
        await addUpdateInvestorByType({
          type,
          financialYear: year,
          title: item.title,
          file: item.file,
        });
      }

      refetch();
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.error ||
          "There was a problem with your request.",
      });
    } finally {
      setIsMultiSubmitting(false);
    }
  };

  function onSubmit(data) {
    if (isMultipleMode) {
      handleMultiCreate(data);
      return;
    }

    const payload = {
      ...data,
      title: data.title.trim(),
      type,
      file: fileData,
    };

    if (requiresFinancialYear) {
      const year = (data.financialYear || "").trim();
      if (!year) {
        form.setError("financialYear", {
          type: "manual",
          message: "Required",
        });
        return;
      }
      payload.financialYear = year;
    } else {
      delete payload.financialYear;
    }

    mutation.mutate(payload);
  }

  useEffect(() => {
    if (isEditOrUpdate && row) {
      form.reset({
        ...defaultValues,
        ...row,
        title: row?.title || "",
        financialYear: row?.financialYear || "",
      });
      if (row.file) {
        setFileData(row.file);
        form.setValue("file", "uploaded");
      }
    }
  }, [isEditOrUpdate, row, form]);

  const isSubmitting = mutation.isPending || isMultiSubmitting;

  return (
    <Dialog open>
      <DialogContent
        className="max-w-4xl max-h-[600px] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditOrUpdate ? "Update" : "Add"} {type}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {requiresFinancialYear && (
                <FormField
                  control={form.control}
                  name="financialYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Financial Year (e.g., 2026-2027)"
                          list="investor-by-type-financial-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                          onChange={(event) => {
                            field.onChange(event.target.value);
                            form.clearErrors("financialYear");
                          }}
                        />
                      </FormControl>
                      <datalist id="investor-by-type-financial-years">
                        {financialYears.map((el) => (
                          <option value={el} key={el} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {isMultipleMode ? (
              <div className="mt-4 space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name={`items.${index}.title`}
                        render={({ field: titleField }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...titleField}
                                size="small"
                                className="h-8"
                                placeholder="Enter Name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-6">
                      <FormField
                        control={form.control}
                        name={`items.${index}.file`}
                        render={() => (
                          <FormItem>
                            <FormLabel>Attachment</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                                size="small"
                                className="h-8"
                              />
                            </FormControl>
                            {uploadingKey === index && (
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
                    </div>

                    <div className="col-span-1 pb-2 flex justify-end">
                      {index > 0 && (
                        <Trash
                          size={18}
                          className="cursor-pointer text-red-600"
                          onClick={() => {
                            remove(index);
                            setMultiFileData((prev) => {
                              const next = {};
                              Object.entries(prev).forEach(([key, value]) => {
                                const keyIndex = Number(key);
                                if (keyIndex < index) {
                                  next[keyIndex] = value;
                                } else if (keyIndex > index) {
                                  next[keyIndex - 1] = value;
                                }
                              });
                              return next;
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  size="sm"
                  onClick={() => append(defaultMultiRow)}
                >
                  Add New File
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{requiresFinancialYear ? "Name" : "Title"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          size="small"
                          className="h-8"
                          placeholder={
                            requiresFinancialYear ? "Enter Name" : "Enter Title"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attachment</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange(e)}
                          size="small"
                          className="h-8"
                        />
                      </FormControl>
                      {uploadingKey === "single" && (
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
              </div>
            )}

            {!isMultipleMode && isEditOrUpdate && fileData && (
              <p className="text-sm mt-2">
                Current File: <span className="text-xs">{fileData?.filePath || ""}</span>
              </p>
            )}

            <DialogFooter className="justify-end mt-4 gap-2">
              <LoadingButton
                type="button"
                variant="destructive"
                size="lg"
                onClick={onClose}
                loading={isSubmitting}
              >
                Close
              </LoadingButton>

              <LoadingButton type="submit" size="lg" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
