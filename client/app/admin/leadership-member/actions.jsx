"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addUpdateLeaderShipMember } from "../api-hook/mutations";
import { axiosInstance } from "../../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import LoadingButton from "@/components/ui/loading-button";

const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false, // Disable server-side rendering for this component
});
// Default values and schema definitions

const defaultValues = {
  fullName: "",
  designation: "",
  description: "",
  location: "",
};

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Required" }),
  designation: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
});

export default function AddUpdateLeaderShip({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [content, setContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDetail, setFileDetail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateLeaderShipMember(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added Leadership Member!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to add Member",
      });
    },
  });

  function onSubmit(data) {
    mutation.mutate({
      ...data,
      file: { ...fileDetail },
      content,
    });
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axiosInstance.post("leadership/upload", formData, {
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
  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
      });
      setFileDetail({ ...row.file });
    }
  }, [isEditOrUpdate]);

  const isSameImage = isEditOrUpdate
    ? row?.file?.filePath === fileDetail?.filePath
    : false;
  return (
    <Dialog
      open
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[400px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Full Name"
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
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter designation"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Description"
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
                <Editor
                  defaultValue={isEditOrUpdate ? row?.content : ""}
                  setContent={setContent}
                />
              </div>
            </div>
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

            <Button
              disabled={uploading}
              onClick={() => {
                inputFileRef.current.click();
              }}
            >
              Upload Image
            </Button>
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
  );
}
