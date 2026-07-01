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
import { addUpdateStockExchangeFiling } from "../../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "../../../utils/axiosInstance";
import { generateFinancialYears } from "@/app/utils/constant";
import { Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingButton from "@/components/ui/loading-button";

const FINANCIAL_YEAR_REGEX = /^\d{4}-\d{4}$/;

const defaultSectionArray = {
  title: "",
  file: "",
};
const defaultValues = {
  financialYear: "",
  stockExchangeFilings: [defaultSectionArray],
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
  stockExchangeFilings: z.array(itemsSchema),
});

export default function AddStockExchangeFilingDocument({
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
    name: "stockExchangeFilings",
  });
  const financialYears = generateFinancialYears();
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateStockExchangeFiling(req, row?._id),
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
          error.response.data.error || "There was a problem with your request.",
      });
    },
  });
  function onSubmit(data) {
    const filterUploadFiles = data?.stockExchangeFilings?.filter(
      (el) => el.title !== ""
    );
    if (filterUploadFiles.length === 0) {
      toast({
        variant: "destructive",
        description: "Please select at-least one type",
      });
      return;
    }

    if (isEditOrUpdate) {
      mutation.mutate({
        file: {
          filePath: data.stockExchangeFilings[0].file,
          mimetype: "application/pdf",
        },
        title: data.stockExchangeFilings[0].title,
        id: row.id,
      });
      return;
    }
    mutation.mutate({
      ...data,
      stockExchangeFilings: filterUploadFiles?.map((el, index) => ({
        ...el,
        file: {
          filePath: el.file,
          mimetype: "application/pdf",
        },
      })),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        stockExchangeFilings: row?.stockExchangeFilings?.map((el) => ({
          title: el.title,
          file: el.file.filePath,
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
        "stock-exchange-filing/upload",
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
      form.setValue(`stockExchangeFilings.${index}.file`, data.filePath);
      form.clearErrors(`stockExchangeFilings.${index}.file`);
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
            {isEditOrUpdate ? "Update" : "Add"} Stock Exchange Filings
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
                          list="stock-exchange-financial-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                        />
                      </FormControl>
                      <datalist id="stock-exchange-financial-years">
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
            <div className="w-full max-h-[300px] overflow-auto">
              <Table className="">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Attachment</TableHead>
                    <TableHead>
                      <Button
                        size="icon"
                        type="button"
                        onClick={() => {
                          append(defaultSectionArray);
                        }}
                      >
                        <Plus />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((el, index) => (
                    <TableRow key={el.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`stockExchangeFilings.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
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
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`stockExchangeFilings.${index}.file`}
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
                        {isEditOrUpdate &&
                          form.watch("stockExchangeFilings") &&
                          form.watch("stockExchangeFilings")[0] && (
                            <p className="text-sm">
                              Current File:{" "}
                              <span className="text-xs">
                                {form.watch("stockExchangeFilings")[0]?.file ||
                                  ""}
                              </span>
                            </p>
                          )}
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
