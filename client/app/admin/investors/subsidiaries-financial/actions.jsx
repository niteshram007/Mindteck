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
import { addUpdateSubsidiariesFinancial } from "../../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { axiosInstance } from "../../../utils/axiosInstance";
import { generateFinancialYears } from "@/app/utils/constant";
import { Plus, Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";

const FINANCIAL_YEAR_REGEX = /^\d{4}-\d{4}$/;

const defaultQuarterArray = {
  subsidiary: "",
  file: "",
};
const defaultValues = {
  financialYear: "",
  subsidiaries: [defaultQuarterArray],
  isActive: true,
};

const itemsSchema = z.object({
  subsidiary: z.string().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});
const formSchema = z.object({
  financialYear: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(FINANCIAL_YEAR_REGEX, { message: "Use format YYYY-YYYY" }),
  subsidiaries: z.array(itemsSchema),
  isActive: z.boolean(),
});

export default function AddSubsidiariesFinancial({
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
    name: "subsidiaries",
  });
  const financialYears = generateFinancialYears();
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateSubsidiariesFinancial(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: `Successfully ${isEditOrUpdate ? "Updated" : "Added"}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "There was a problem with your request.",
      });
    },
  });
  function onSubmit(data) {
    if (isEditOrUpdate) {
      mutation.mutate({
        file: {
          filePath: data.subsidiaries[0].file,
          mimetype: "application/pdf",
        },
        id: row.id,
        subsidiary: data.subsidiaries[0].subsidiary,
      });
      return;
    }
    mutation.mutate({
      ...data,
      subsidiaries: data.subsidiaries?.map((el, index) => ({
        ...el,
        file: { filePath: el.file, mimetype: "application/pdf" },
      })),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        subsidiaries: row?.subsidiaries?.map((el) => ({
          subsidiary: el.subsidiary,
          file: el.file.filePath,
        })),
      });
    }
  }, [form, row]);

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
        "subsidiaries-financial/upload",
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
      form.setValue(`subsidiaries.${index}.file`, data.filePath);
      form.clearErrors(`subsidiaries.${index}.file`);
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
        className="max-w-4xl max-h-[500px] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditOrUpdate ? "Update" : "Add"} Subsidiaries Financial
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
                          list="subsidiaries-financial-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                        />
                      </FormControl>
                      <datalist id="subsidiaries-financial-years">
                        {financialYears?.map((el) => (
                          <option value={el} key={el} />
                        ))}
                      </datalist>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="isActive"
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
                              <RadioGroupItem value={false} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              In-Active
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={true} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Active
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full max-h-[250px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Attachment</TableCell>
                    <TableCell>
                      {!isEditOrUpdate && (
                        <Plus
                          size={20}
                          className="ml-auto cursor-pointer text-2xl"
                          color="green"
                          onClick={() => {
                            append(defaultQuarterArray);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((el, index) => (
                    <TableRow key={el.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`subsidiaries.${index}.subsidiary`}
                          render={({ field }) => (
                            <FormItem>
                              <Input
                                className="h-8"
                                placeholder="Enter title"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`subsidiaries.${index}.file`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="file"
                                  ref={(el) =>
                                    (inputFileRef.current[index] = el)
                                  }
                                  onChange={(e) => {
                                    handleFileChange(e, index);
                                  }}
                                  size="small"
                                  className="h-8"
                                />
                              </FormControl>
                              {uploading && uploadIndex === index && (
                                <div className=" h-2 mt-2">
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {isEditOrUpdate &&
              form.watch("subsidiaries")[0] &&
              form.watch("subsidiaries")[0] && (
                <p className="text-sm">
                  Current File:{" "}
                  <span className="text-xs">
                    {form.watch("subsidiaries")[0]?.file || ""}
                  </span>
                </p>
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
