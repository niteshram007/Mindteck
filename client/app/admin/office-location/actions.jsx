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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUpdateOffice } from "../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCountry } from "../api-hook";
import { axiosInstance } from "../../utils/axiosInstance";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";

const defaultValues = {
  mainLocationId: "",
  name: "",
  address1: "",
  address2: "",
  address3: "",
  address4: "",
  address5: "",
  phone: "",
  fax: "",
  mapLocationAddress: "",
  officeDetailHeading: "",
  officeDetailDescription: "",
};

const formSchema = z.object({
  mainLocationId: z.string().min(1, { message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
  address1: z.string().min(1, { message: "Required" }),
  address2: z.string(),
  address3: z.string(),
  address4: z.string().optional(),
  address5: z.string().optional(),
  phone: z.string(),
  fax: z.string(),
  officeDetailHeading: z.string(),
  officeDetailDescription: z.string(),
  mapLocationAddress: z.string(),
});

export default function AddOffice({ isEditOrUpdate, onClose, refetch, row }) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputFileRef = useRef(null);
  const [fileDetail, setFileDetail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { data } = useGetAllCountry();

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateOffice(req, row?._id),
    onSuccess: (data) => {
      refetch(data);
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added Country!",
      });
    },
  });
  function onSubmit(data) {
    mutation.mutate({
      ...data,
      file: fileDetail ? { ...fileDetail } : undefined,
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
      const { data } = await axiosInstance.post("office/upload", formData, {
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
      if (row?.file) {
        setFileDetail({ ...row.file });
      }
    }
  }, [row]);

  const isSameImage = isEditOrUpdate
    ? row?.file?.filePath === fileDetail?.filePath
    : false;
  return (
    <Dialog
      open
      onOpenChange={(e) => {
        onClose();
      }}
      modal
    >
      <DialogContent className="max-w-screen-lg max-h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Office</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2  gap-3">
              <div>
                <FormField
                  control={form.control}
                  name="mainLocationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data &&
                            data.map((el) => (
                              <SelectItem value={el._id} key={el._id}>
                                {el.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Name i.g, Bangalore, Mumbai"
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
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Address Line 1"
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
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Address Line 2"
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
                  name="address3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 3</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Address Line 3"
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
                  name="address4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 4</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Address Line 4"
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
                  name="address5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 5</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Address Line 5"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Phone No."
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
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Fax Number"
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
                  name="mapLocationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Map</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Google Map link"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
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
                  <p className="text-sm font-semibold">Upload Office Image</p>
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
            <DialogFooter className="justify-end mt-4">
              <DialogClose>
                <Button type="button" variant="destructive" size="lg">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" size="lg">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
