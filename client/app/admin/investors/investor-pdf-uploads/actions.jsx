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
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addUpdateInvestorStaticPdf } from "@/app/admin/api-hook/mutations";
import { axiosInstance } from "@/app/utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staticPdfMenuitems } from "@/app/utils/constant";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  type: "",
  title: "",
  file: "",
};

const formSchema = z.object({
  type: z.string().min(1, { message: "Required" }),
  title: z.string().trim().min(1, { message: "Required" }),
  file: z.string().min(1, { message: "Required" }),
});

export default function UploadInvestorPdf({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateInvestorStaticPdf(req, row?._id),
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
          error.response?.data?.error ||
          "There was a problem with your request.",
      });
    },
  });

  function onSubmit(data) {
    mutation.mutate({
      ...data,
      title: data.title.trim(),
      file: fileData,
    });
  }

  useEffect(() => {
    if (isEditOrUpdate && row) {
      form.reset({
        ...row,
        title: row?.title || row?.type || "",
      });
      if (row.file) {
        setFileData(row.file);
        form.setValue("file", "uploaded");
      }
    }
  }, [isEditOrUpdate, row, form]);

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post("pdf/upload", formData, {
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

      form.setValue("file", "uploaded");
      form.clearErrors("file");
      setFileData(data);
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
          <DialogTitle>{isEditOrUpdate ? "Update" : "Add"} Pdf</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (!form.getValues("title")) {
                          form.setValue("title", value);
                        }
                      }}
                      value={field.value}
                      disabled={isEditOrUpdate}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {staticPdfMenuitems?.map((el) => (
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

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        size="small"
                        className="h-8"
                        placeholder="Enter display name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attachment</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          ref={inputFileRef}
                          onChange={handleFileChange}
                          size="small"
                          className="h-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {uploading && (
                  <div className="bg-gray-200 rounded-full h-2 mb-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>

            {isEditOrUpdate && fileData && (
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
                loading={mutation.isPending}
              >
                Close
              </LoadingButton>

              <LoadingButton type="submit" size="lg" loading={mutation.isPending}>
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
