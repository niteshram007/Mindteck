"use client";
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
import { addUpdatePolicy } from "../../api-hook/mutations";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../../utils/constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  title: "",
  isActive: true,
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  isActive: z.boolean(),
});

export default function AddUpdatePolicy({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadImageType, setUploadImageType] = useState("");

  const [fileDetail, setFileDetail] = useState({
    file: null,
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdatePolicy(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added New Policy",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to add",
      });
    },
  });

  function onSubmit(data) {
    if (!fileDetail.file) {
      toast({
        variant: "destructive",
        title: "Please upload policy PDF",
      });
      return;
    }

    mutation.mutate({
      ...data,
      file: fileDetail.file,
      ...(fileDetail.image ? { image: fileDetail.image } : {}),
    });
  }
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let url = "policy/upload";
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axiosInstance.post(url, formData, {
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
      setUploading(false);
      setUploadProgress(0);
      if (uploadImageType === "image") {
        setFileDetail((ps) => ({ ...ps, image: data }));
      } else {
        setFileDetail((ps) => ({ ...ps, file: data }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Failed to upload please try again",
      });
      if (uploadImageType === "image") {
        setFileDetail((ps) => ({ ...ps, image: null }));
      } else {
        setFileDetail((ps) => ({ ...ps, file: null }));
      }
      setUploading(false);
    }
  };
  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        title: row.title,
        isActive: row.isActive,
      });
      setFileDetail({
        file: row?.file ?? null,
        image: row?.image ?? null,
      });
    }
  }, [isEditOrUpdate]);

  const isSameImage = isEditOrUpdate
    ? row?.image?.filePath === fileDetail?.image?.filePath
    : false;
  return (
    <>
      <input
        id="picture"
        type="file"
        ref={inputFileRef}
        onChange={handleUpload}
        size="small"
        className="hidden"
      />
      <Dialog open>
        <DialogContent
          className="max-w-4xl max-h-[400px] overflow-auto"
          onClose={onClose}
        >
          <DialogHeader>
            <DialogTitle>Add Policy</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
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
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
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
                <div>
                  <Card
                    className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                    onClick={() => {
                      setUploadImageType("image");
                      inputFileRef.current.click();
                    }}
                  >
                    {fileDetail.image ? (
                      <img
                        src={
                          isSameImage
                            ? UPLOADED_IMAGE_PATH + fileDetail?.image?.filePath
                            : TEMP_IMAGE_PATH + fileDetail?.image?.filePath
                        }
                        alt="temp-image"
                        className="w-full h-full  w-[300px] h-[100px] object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <UploadCloud className="m-auto" />
                        <p className="text-sm font-semibold">
                          Upload Display image
                        </p>
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

                    {/* using this input type for both upload */}
                  </Card>
                </div>
                <div>
                  <Card
                    className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                    onClick={() => {
                      setUploadImageType("file");
                      inputFileRef.current.click();
                    }}
                  >
                    {fileDetail.file ? (
                      <span className="text-emerald-700">
                        Uploaded Successfully
                      </span>
                    ) : (
                      <div className="text-center">
                        <UploadCloud className="m-auto" />
                        <p className="text-sm font-semibold">Upload file</p>
                        <p className="text-xs font-normal">
                          Click here to upload file
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
                  </Card>
                </div>
              </div>

              <DialogFooter className="sm:justify-end gap-2 mt-5">
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
                  {isEditOrUpdate ? "Update" : "Submit"}
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
