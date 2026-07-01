import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import {
  addUpdateBuyBack
} from "../../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "../../../utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonthYearPicker } from "@/components/ui/month-year-picker";

const YEAR_REGEX = /^\d{4}$/;

const defaultGeneralUpdate = {
  title: "",
  file: "",
};
const defaultDailyUpdate = {
  date: "",
  file: "",
};
const defaultValues = {
  type: "",
  year: "",
  month: null,
  dates: [],
  generalUpdated: [],
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
  value: (currentYear - index).toString(),
  label: (currentYear - index).toString(),
}));
const generalUpdateSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});
const dailyUpdateSchema = z.object({
  date: z.string().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});

const formSchema = z
  .object({
    type: z.string().min(1, { message: "Required" }),
    year: z
      .string()
      .trim()
      .min(1, { message: "Required" })
      .regex(YEAR_REGEX, { message: "Use format YYYY" }),
    dates: z.array(dailyUpdateSchema).optional(),
    month: z.string().nullable().optional(),
    generalUpdated: z.array(generalUpdateSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "Daily Updates") {
        return data.dates && data.dates.length > 0; // Ensure dailyUpdates is required for "daily update"
      } else if (data.type === "General Updates") {
        return data.generalUpdated && data.generalUpdated.length > 0; // Ensure generalUpdated is required for "general update"
      }
      return true; // If type is not "daily update" or "general update", allow form to pass
    },
    {
      message:
        "Either dailyUpdates or generalUpdated is required based on the type.",
      path: ["dates", "generalUpdated"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "Daily Updates") {
        return data.month !== null;
      }
      return true;
    },
    {
      message: "Select Month and year",
      path: ["month"],
    }
  );

export default function AddUpdateBuyback({
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


  const {
    fields: dailyUpdateFields,
    append: appendDailyUpdate,
    remove: removeDailyUpdate,
  } = useFieldArray({
    control: form.control,
    name: "dates",
  });
  const {
    fields: generalUpdateFields,
    append: appendGeneralUpdate,
    remove: removeGeneralUpdate,
  } = useFieldArray({
    control: form.control,
    name: "generalUpdated",
  });
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateBuyBack(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description:
          error.response.data.error || "There was a problem with your request.",
      });
    },
  });
  function onSubmit(data) {
    if (isEditOrUpdate) {
      if (data.type === "Daily Updates") {
        mutation.mutate({
          year: +row.year,
          month: data.month,
          type: data.type,
          date: data.dates[0].date,
          file: {
            filePath: data.dates[0].file,
            mimetype: "application/pdf",
          },
        });
        return;
      }
      if (data.type === "General Updates") {
        mutation.mutate({
          year: row.year,
          title: data.generalUpdated[0].title,
          id: row.id,
          type: data.type,
          file: {
            filePath: data.generalUpdated[0].file,
            mimetype: "application/pdf",
          },
        });
        return;
      }
    }

    let req = {
      year: +data.year,
      month: data.month,
      type: data.type,
    };
    if (data.type === "Daily Updates") {
      req.dates = data.dates.map((el) => ({
        date: el.date,
        file: { filePath: el.file, mimetype: "application/pdf" },
      }));
    }
    if (data.type === "General Updates") {
      req.generalUpdated = data.generalUpdated.map((el) => ({
        title: el.title,
        file: { filePath: el.file, mimetype: "application/pdf" },
      }));
    }
    mutation.mutate(req);
  }

  const typeWatch = useWatch({ control: form.control, name: "type" });
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
      const { data } = await axiosInstance.post("buy-back/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      if (form.watch("type") === "Daily Updates") {
        form.setValue(`dates.${index}.file`, data.filePath);
        form.clearErrors(`dates.${index}.file`);
      } else {
        form.setValue(`generalUpdated.${index}.file`, data.filePath);
        form.clearErrors(`generalUpdated.${index}.file`);
      }

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
  useEffect(() => {
    if (isEditOrUpdate) {
      if (row.type === "General Updates") {
        form.reset({
          year: row.year + "",
          type: row.type,
          month: null,
          generalUpdated: row?.generalUpdated.map((el) => ({
            title: el.title,
            file: el.file.filePath,
          })),
        });
      }
      if (row.type === "Daily Updates") {
        form.reset({
          year: row.year + "",
          type: row.type,
          month: row.month,
          dates: row?.dates.map((el) => ({
            date: el.date,
            file: el.file.filePath,
          })),
        });
      }
    }
  }, [row]);


  return (
    <Dialog open>
      <DialogContent
        className="max-w-4xl max-h-[600px] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditOrUpdate ? "Update" : "Add"} Buy Back
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Year (e.g., 2026)"
                          list="buyback-years"
                          className="h-8"
                          autoComplete="off"
                          disabled={isEditOrUpdate}
                        />
                      </FormControl>
                      <datalist id="buyback-years">
                        {years?.map((el) => (
                          <option value={el.value} key={el.value} />
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isEditOrUpdate}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          <SelectItem value={"Daily Updates"}>
                            Daily Updates
                          </SelectItem>
                          <SelectItem value={"General Updates"}>
                            General Updates
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {typeWatch === "Daily Updates" && (
                <div className="mb-3 relative">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Month Year</FormLabel>
                        <br />
                        <MonthYearPicker
                          control={form.control}
                          name="month"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select year and month"
                          required
                          disabled={isEditOrUpdate}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            {form.watch("type") && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>
                      {typeWatch === "Daily Updates" ? "Dates" : "Title"}
                    </TableCell>
                    <TableCell>Attachment</TableCell>
                    <TableCell>
                      {!isEditOrUpdate && (
                        <Plus
                          size={20}
                          className="ml-auto cursor-pointer text-2xl"
                          color="green"
                          onClick={() => {
                            if (form.watch("type") === "Daily Updates") {
                              appendDailyUpdate(defaultDailyUpdate);
                              return;
                            }
                            appendGeneralUpdate(defaultGeneralUpdate);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableHeader>
                {typeWatch === "Daily Updates" && (
                  <TableBody>
                    {dailyUpdateFields.map((el, index) => (
                      <TableRow key={el.id}>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`dates.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="date"
                                    {...field}
                                    size="small"
                                    className="h-8"
                                    disabled={isEditOrUpdate}
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
                            name={`dates.${index}.file`}
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
                        </TableCell>
                        <TableCell>
                          {index !== 0 && (
                            <Trash
                              size={20}
                              className="ml-auto cursor-pointer mt-4 text-2xl"
                              color="red"
                              onClick={() => {
                                removeDailyUpdate(index);
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
                {typeWatch === "General Updates" && (
                  <TableBody>
                    {generalUpdateFields.map((el, index) => (
                      <TableRow key={el.id}>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`generalUpdated.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    size="small"
                                    className="h-8"
                                    placeholder="Enter Title"
                                    disabled={isEditOrUpdate}
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
                            name={`generalUpdated.${index}.file`}
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
                        </TableCell>
                        <TableCell>
                          {index !== 0 && (
                            <Trash
                              size={20}
                              className="ml-auto cursor-pointer mt-4 text-2xl"
                              color="red"
                              onClick={() => {
                                removeGeneralUpdate(index);
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            )}

            {isEditOrUpdate && (
              <p className="text-sm">Current file: {row.currentFile}</p>
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
