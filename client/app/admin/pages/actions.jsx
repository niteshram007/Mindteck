import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { addUpdatePage } from "../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import {
  TEMP_IMAGE_PATH,
  templates,
  UPLOADED_IMAGE_PATH,
} from "../../utils/constant";
import LoadingButton from "@/components/ui/loading-button";
import { useGetAllSlider } from "../api-hook";

const defaultValues = {
  url: "",
  title: "",
  templateName: "",
  bannerOrSlider: "",
  metaTitle: "",
  metaKeyword: "",
  metaDescription: "",
  canonical: "",
  sliderId: "",
};

const formSchema = z
  .object({
    url: z.string().min(1, { message: "Required" }),
    title: z.string().min(1, { message: "Required" }),
    templateName: z.string().min(1, { message: "Required" }),
    bannerOrSlider: z.string().optional(),
    sliderId: z.string().optional(),
    metaTitle: z.string().min(1, { message: "Required" }),
    metaKeyword: z.string().min(1, { message: "Required" }),
    metaDescription: z.string().min(1, { message: "Required" }),
    canonical: z.string().min(1, { message: "Required" }),
  })
  .refine(
    (data) => {
      if (data.bannerOrSlider === "slider" && !data.sliderId) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a slider",
      path: ["sliderId"],
    }
  );

export default function AddPage({ isEditOrUpdate, onClose, refetch, row }) {
  const { data } = useGetAllSlider();
  const inputFileRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDetail, setFileDetail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdatePage(req, row?._id),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added Menu!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction
            altText="Try again"
            onclick={() =>
              mutation.mutate({
                ...form.getValues(),
                order: Number(form.getValues("order")),
              })
            }
          >
            Try again
          </ToastAction>
        ),
      });
    },
  });
  function onSubmit(data) {
    if (data.bannerOrSlider === "banner" && !fileDetail) {
      toast({
        variant: "destructive",
        title: "Please upload banner image",
      });
      return;
    }

    mutation.mutate({
      ...data,
      sliderId:data.bannerOrSlider === "banner"?undefined:data.sliderId,
      file: fileDetail ? { ...fileDetail } : undefined,
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        order: row.order + "",
        parent: row.parentId,
      });
      if (row.bannerOrSlider === "banner") {
        setFileDetail({ ...row.file });
      }
    }
  }, [row]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axiosInstance.post("page/upload", formData, {
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
      setFileDetail(data);
      // Reset state after successful upload
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const isSameImage = isEditOrUpdate
    ? row?.file?.filePath === fileDetail?.filePath
    : false;
  return (
    <Dialog open modal>
      <DialogContent
        className="max-w-4xl max-h-[600px] overflow-auto"
        onClose={onClose}
      >
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter Url"
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter Title"
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
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter metaTitle"
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
                  name="metaKeyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Keyword</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter metaKeyword"
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
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter metaDescription"
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
                  name="canonical"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canonical</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter canonical"
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
                  name="templateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Template</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const bannerSlider = templates?.find(
                            (el) => el.value === value
                          )?.bannerOrSlider;
                          form.setValue("bannerOrSlider", bannerSlider);
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {templates.map((el) => (
                            <SelectItem value={el.value} key={el.value}>
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
              {form.watch("bannerOrSlider") === "slider" && (
                <FormField
                  control={form.control}
                  name="sliderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Slider</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a slider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {data?.map((el) => (
                            <SelectItem value={el._id} key={el._id}>
                              {el.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {form.watch("bannerOrSlider") === "banner" && (
              <Card
                className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                onClick={() => {
                  inputFileRef.current.click();
                }}
              >
                {fileDetail ? (
                  <img
                    src={
                      isSameImage
                        ? UPLOADED_IMAGE_PATH + fileDetail.filePath
                        : TEMP_IMAGE_PATH + fileDetail.filePath
                    }
                    alt="temp-image"
                    className="w-full h-full  w-[300px] h-[100px] object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <UploadCloud className="m-auto" />
                    <p className="text-sm font-semibold">Upload Member Image</p>
                    <p className="text-xs font-normal">
                      Click here to upload image
                    </p>
                  </div>
                )}
                {uploading && (
                  <div className="flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <Input
                  id="picture"
                  type="file"
                  ref={inputFileRef}
                  onChange={handleUpload}
                  size="small"
                  className="hidden"
                />
              </Card>
            )}
            <DialogFooter className="justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                size="lg"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Close
              </Button>

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
