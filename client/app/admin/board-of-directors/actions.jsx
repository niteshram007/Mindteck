"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { addUpdateBODMember } from "../api-hook/mutations";
import { axiosInstance } from "../../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor/Editor";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";
import MultipleSelector from "@/components/ui/multiselect";
import LoadingButton from "@/components/ui/loading-button";

const category = [
  {
    value: "Board of Director",
    label: "Board of Director",
  },
  {
    value: "Management Team",
    label: "Management Team",
  },
  {
    value: "Practice Team",
    label: "Practice Team",
  },
  {
    value: "Sales Team",
    label: "Sales Team",
  },
];

const defaultValues = {
  fullName: "",
  designation: "",
  description: "",
  displayOrder: 1,
  location: "",
  category: [],
};

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Required" }),
  designation: z.string().min(1, { message: "Required" }),
  description: z.string().optional(),
  displayOrder: z.coerce.number().int().min(1, { message: "Required" }),
  category: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Select at least one option" }),
});

export default function AddUpdateBOD({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [content, setContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadImageType, setUploadImageType] = useState("");
  const [fileDetail, setFileDetail] = useState({
    passportImage: null,
    profileImage: null,
  });
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateBODMember(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added board of directors Member!",
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
    if (!fileDetail.passportImage && !fileDetail.profileImage) {
      toast({
        variant: "destructive",
        title: "Please upload profile and passport size images.",
      });
      return;
    }

    mutation.mutate({
      ...data,
      displayOrder: Number(data.displayOrder),
      passportImage: fileDetail.passportImage,
      profileImage: fileDetail.profileImage,
      content,
      category: data.category.map((el) => el.value),
    });
  }
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let url = "bod/upload/passport";
    if (uploadImageType === "profile") {
      url = "bod/upload/profile";
    }
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
      if (uploadImageType === "profile") {
        setFileDetail((ps) => ({ ...ps, profileImage: data }));
      } else {
        setFileDetail((ps) => ({ ...ps, passportImage: data }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };
  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        displayOrder: row?.displayOrder ?? 1,
        category:
          typeof row?.category === "string"
            ? [{ value: row?.category, label: row?.category }]
            : row?.category.map((el) => ({ value: el, label: el })),
      });
      setFileDetail({
        passportImage: row?.passportImage ?? null,
        profileImage: row?.profileImage ?? null,
      });
    }
  }, [isEditOrUpdate]);

  const isSameImagePassport = isEditOrUpdate
    ? row?.passportImage?.filePath === fileDetail?.passportImage?.filePath
    : false;
  const isSameImageProfileImage = isEditOrUpdate
    ? row?.profileImage?.filePath === fileDetail?.profileImage?.filePath
    : false;
  return (
    <div className="fixed w-full h-full left-0 right-0 top-0 z-40  bg-white p-3 max-h-[100vh] overflow-y-auto transition-all">
      <input
        id="picture"
        type="file"
        ref={inputFileRef}
        onChange={handleUpload}
        size="small"
        className="hidden"
      />
      <div className="">
        <div className="flex justify-between mb-3 items-center">
          <h4 className="text-xl font-semibold">Add Member</h4>
          <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
        </div>

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
              <div>
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Enter display order"
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          commandProps={{
                            label: "Select Category",
                          }}
                          {...field}
                          defaultOptions={category}
                          placeholder="Select Category"
                          hideClearAllButton
                          hidePlaceholderWhenSelected
                          emptyIndicator={
                            <p className="text-center text-sm">
                              No results found
                            </p>
                          }
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
              <div>
                <Card
                  className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                  onClick={() => {
                    setUploadImageType("passport");
                    inputFileRef.current.click();
                  }}
                >
                  {fileDetail.passportImage ? (
                    <img
                      src={
                        isSameImagePassport
                          ? UPLOADED_IMAGE_PATH +
                            fileDetail?.passportImage?.filePath
                          : TEMP_IMAGE_PATH +
                            fileDetail?.passportImage?.filePath
                      }
                      alt="temp-image"
                      className="w-full h-full  w-[300px] h-[100px] object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="m-auto" />
                      <p className="text-sm font-semibold">
                        Upload passport size image
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
                    setUploadImageType("profile");
                    inputFileRef.current.click();
                  }}
                >
                  {fileDetail.profileImage ? (
                    <img
                      src={
                        isSameImageProfileImage
                          ? UPLOADED_IMAGE_PATH +
                            fileDetail?.profileImage?.filePath
                          : TEMP_IMAGE_PATH + fileDetail?.profileImage?.filePath
                      }
                      alt="temp-image"
                      className="w-full h-full  w-[300px] h-[100px] object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="m-auto" />
                      <p className="text-sm font-semibold">
                        Upload profile size image
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
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
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
                {isEditOrUpdate ? "Update" : "Submit"}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
