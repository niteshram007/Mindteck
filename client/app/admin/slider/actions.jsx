import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { addUpdateSlider } from "../api-hook/mutations";
import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Trash, UploadCloud } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";
import Editor from "@/components/Editor/Editor";
import LoadingButton from "@/components/ui/loading-button";

const REDIRECT_OPTIONS = {
  industries: [
    { label: "Medical Device and Healthcare", value: "/medical-device-and-healthcare" },
    { label: "Electronics Semiconductor and Storage", value: "/electronics-semiconductor-and-storage" },
    { label: "Data Storage", value: "/data-storage" },
    { label: "Energy and Utility", value: "/energy-and-utility" },
    { label: "Industrial Automation Solutions", value: "/industrial-automation-solutions" },
    { label: "Life Science IT Solutions", value: "/life-science-it-solutions-and-analytical-instruments" },
  ],
  services: [
    { label: "AI/ML Services", value: "/ai-ml-services" },
    { label: "Digital Transformation", value: "/digital-transformation" },
    { label: "Cloud Service", value: "/cloud-service" },
    { label: "Data Engineering", value: "/data-engineering" },
    { label: "Internet of Things", value: "/internet-of-things" },
    { label: "IT Infrastructure and Data Centre Transformation", value: "/it-infrastructure-and-data-centre-transformation" },
    { label: "Electronic Design Services", value: "/electronic-design-services-embedded-systems-and-applications" },
    { label: "IV&V", value: "/iv-and-v" },
    { label: "BPM Services", value: "/bpm-services" },
  ],
  solutions: [
    { label: "Asset Tracking", value: "/asset-tracking" },
    { label: "Equipment Data Acquisition", value: "/equipment-data-acquisition" },
    { label: "Factory Host", value: "/factory-host" },
    { label: "Fleet Management", value: "/fleet-management" },
    { label: "Productivity Improvement", value: "/productivity-improvement" },
    { label: "Recipe Management System", value: "/recipe-management-system" },
    { label: "Research Collaboration", value: "/research-collaboration" },
    { label: "Smart City Solutions", value: "/smartcity-solutions" },
  ],
};

const getRedirectCategoryFromPath = (path = "") => {
  const normalizedPath = String(path || "").trim();
  if (!normalizedPath) return "";
  const matchingCategory = Object.entries(REDIRECT_OPTIONS).find(([, options]) =>
    options.some((option) => option.value === normalizedPath),
  );
  if (matchingCategory) return matchingCategory[0];
  return "";
};

const defaultItemArray = {
  altText: "",
  content: "",
  description: "",
  redirectCategory: "",
  redirectPath: "",
  image: "", // to display error message
  id: undefined,
};
const defaultValues = {
  title: "",
  items: [defaultItemArray],
};

const itemsSchema = z.object({
  altText: z.string().min(1, { message: "Required" }),
  id: z.string().optional(),
  content: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  redirectCategory: z.enum(["industries", "services", "solutions"], {
    required_error: "Required",
    invalid_type_error: "Required",
  }),
  redirectPath: z.string().min(1, { message: "Required" }),
  image: z.string().min(1, { message: "Required" }),
});

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  items: z.array(itemsSchema),
});

export default function AddSlider({ isEditOrUpdate, onClose, refetch, row }) {
  const { toast } = useToast();
  const inputFileRef = useRef([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateSlider(req, row?._id),
    onSuccess: (data) => {
      refetch();
      onClose();
      toast({
        variant: "success",
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
    console.log(uploadedImage, data, "uploadedImage");
    mutation.mutate({
      ...data,
      items: data?.items?.map((el, index) => ({
        ...el,
        order: index + 1,
        file: { ...uploadedImage[index] },
      })),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
      });
      if (row.items) {
        row.items.forEach((el, index) => {
          setUploadedImage((ps) => ({ ...ps, [index]: el.file }));
          form.setValue(`items.${index}.image`, index + "");
          const derivedCategory = el?.redirectCategory || getRedirectCategoryFromPath(el?.redirectPath);
          if (derivedCategory) {
            form.setValue(`items.${index}.redirectCategory`, derivedCategory);
          }
        });
      }
    }
  }, [row]);


const handleRemoveItem = (indexToRemove) => {
  remove(indexToRemove);

  setUploadedImage((prev) => {
    if (!prev) {
      return prev;
    }

    const next = {};
    Object.keys(prev).forEach((key) => {
      const currentIndex = Number(key);

      if (Number.isNaN(currentIndex)) {
        return;
      }

      if (currentIndex < indexToRemove) {
        next[currentIndex] = prev[key];
      }

      if (currentIndex > indexToRemove) {
        next[currentIndex - 1] = prev[key];
      }
    });

    return next;
  });
};

  const handleFileChange = async (e, index) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post("slider/upload", formData, {
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
      form.setValue(`items.${index}.image`, index + "");
      form.clearErrors(`items.${index}.image`);
      setUploadedImage((ps) => ({ ...ps, [index]: data }));
      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Slider</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slider Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Slider Name"
                        {...field}
                        className="h-8"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.map((el, index) => (
              <Card key={el.id} className="shadow-md rounded-sm p-2 mb-3">
                <div className="grid grid-cols-2 gap-2 ">
                  <div>
                    <FormField
                      control={form.control}
                      name={`items.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <Card
                            className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
                            onClick={() => {
                              inputFileRef.current[index].click();
                            }}
                          >
                            {uploadedImage && uploadedImage[index] ? (
                              <img
                                src={
                                  row?.items[index]?.file?.filePath ===
                                  uploadedImage[index].filePath
                                    ? UPLOADED_IMAGE_PATH +
                                      uploadedImage[index].filePath
                                    : TEMP_IMAGE_PATH +
                                      uploadedImage[index].filePath
                                }
                                alt="temp-image"
                                className="w-[300px] h-[100px] object-contain"
                              />
                            ) : (
                              <div className="text-center">
                                <UploadCloud className="m-auto" />
                                <p className="text-sm font-semibold">
                                  Upload Member Image
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
                            <Input
                              type="file"
                              ref={(el) => (inputFileRef.current[index] = el)}
                              onChange={(e) => {
                                handleFileChange(e, index);
                              }}
                              size="small"
                              className="h-8 hidden"
                            />
                          </Card>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name={`items.${index}.altText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alt Text</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-8"
                              placeholder="image alt text"
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
                      name={`items.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Headline</FormLabel>
                          <FormControl>
                            <Editor
                              defaultValue={field.value}
                              setContent={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 mt-6">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Editor
                              defaultValue={field.value}
                              setContent={field.onChange}
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
                      name={`items.${index}.redirectCategory`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                const pageOptions = REDIRECT_OPTIONS[value] || [];
                                form.setValue(
                                  `items.${index}.redirectPath`,
                                  pageOptions[0]?.value || "",
                                );
                                form.clearErrors(`items.${index}.redirectPath`);
                              }}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="industries">Industries</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="solutions">Solutions</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name={`items.${index}.redirectPath`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Page</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select page" />
                              </SelectTrigger>
                              <SelectContent>
                                {(REDIRECT_OPTIONS[form.watch(`items.${index}.redirectCategory`)] || []).map(
                                  (pageOption) => (
                                    <SelectItem key={pageOption.value} value={pageOption.value}>
                                      {pageOption.label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {fields.length > 1 && (
                  <Trash
                    className="ml-auto cursor-pointer"
                    color="red"
                    onClick={() => {
                      handleRemoveItem(index);
                    }}
                  />
                )}
              </Card>
            ))}
            <Button
              type="button"
              className="mt-2"
              onClick={() => {
                append(defaultItemArray);
              }}
            >
              Add More
            </Button>

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
