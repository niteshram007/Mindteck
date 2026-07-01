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
import { addUpdatePartnerAndAlliances } from "../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";
import { axiosInstance } from "../../utils/axiosInstance";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  order: "",
};

const formSchema = z.object({
  order: z.coerce
    .number()
    .positive()
    .refine((value) => value > 0, {
      message: "value must be grater than 0",
    }),
});

export default function AddCountry({ isEditOrUpdate, onClose, refetch, row }) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [fileDetail, setFileDetail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdatePartnerAndAlliances(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
        // title: "Scheduled: Catch up",
        title: "Successfully Added Country!",
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
    if (!fileDetail) {
      toast({
        variant: "destructive",
        title: "Please upload an image",
      });
      return;
    }
    mutation.mutate({
      file: { ...fileDetail },
      category: "Partners and Alliance",
      order: Number(data.order),
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
      const { data } = await axiosInstance.post(
        "partner-and-alliance/upload",
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
      setUploading(false);
      setUploadProgress(0);

      setFileDetail(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Uh oh! Something went wrong.",
      });
      setUploading(false);
    }
  };
  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        order: row.order,
      });

      setFileDetail(row.file);
    }
  }, [row]);
  const isSameImage = isEditOrUpdate
    ? row?.file.filePath === fileDetail?.filePath
    : false;
  return (
    <Dialog
      open
      onOpenChange={(e) => {
        onClose();
      }}
      modal
    >
      <DialogContent className="max-w-sm max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Partners and Alliances</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1">
              <div>
                <input
                  id="picture"
                  type="file"
                  ref={inputFileRef}
                  onChange={handleUpload}
                  size="small"
                  className="hidden"
                />
                <Card
                  className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                >
                  {fileDetail?.filePath ? (
                    <img
                      src={
                        isSameImage
                          ? UPLOADED_IMAGE_PATH + fileDetail?.filePath
                          : TEMP_IMAGE_PATH + fileDetail?.filePath
                      }
                      alt="temp-image"
                      className="w-full h-full  w-[300px] h-[100px] object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="m-auto" />
                      <p className="text-sm font-semibold">
                        Upload partners and alliances image
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
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter order number"
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
