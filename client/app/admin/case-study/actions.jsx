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
import { addUpdateCaseStudy } from "../api-hook/mutations";
import { axiosInstance } from "../../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor/Editor";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "../../utils/constant";
import MultipleSelector from "@/components/ui/multiselect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingButton from "@/components/ui/loading-button";

const EXCLUDED_CASE_STUDY_MENUS = new Set(["About Us"]);
const CASE_STUDY_CATEGORY_FALLBACKS = [
  {
    label: "IOT",
    value: "internet-of-things",
  },
];

const defaultValues = {
  title: "",
  description: "",
  content: "",
  isActive: false,
  category: [],
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  content: z.string().optional(),
  isActive: z.boolean(),
  category: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Select at least one option" }),
});

const normalizeCategoryPath = (value = "") =>
  String(value || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

const getLeafMenuItems = (items = []) => {
  const leafItems = [];

  const walk = (nodes = []) => {
    nodes.forEach((node) => {
      const nodeUrl = normalizeCategoryPath(node?.url);
      const nodeLabel = String(node?.label || "").trim();

      if (nodeUrl && nodeUrl !== "#" && nodeLabel) {
        leafItems.push({
          value: nodeUrl,
          label: nodeLabel,
          url: nodeUrl,
        });
      }

      if (Array.isArray(node?.children) && node.children.length > 0) {
        walk(node.children);
      }
    });
  };

  walk(items);

  const uniqueItemsByUrl = new Map();
  leafItems.forEach((item) => {
    if (!uniqueItemsByUrl.has(item.value)) {
      uniqueItemsByUrl.set(item.value, item);
    }
  });

  return [...uniqueItemsByUrl.values()];
};

const buildCaseStudyCategoryOptions = (menus = []) => {
  const menuOptions = (Array.isArray(menus) ? menus : [])
    .filter((menu) => !EXCLUDED_CASE_STUDY_MENUS.has(menu?.label))
    .flatMap((menu) => getLeafMenuItems(menu?.children || []));

  const mergedOptions = [...menuOptions, ...CASE_STUDY_CATEGORY_FALLBACKS]
    .map((item) => {
      const normalizedValue = normalizeCategoryPath(item?.value || item?.url);
      const normalizedLabel = String(item?.label || "").trim();

      if (!normalizedValue || !normalizedLabel) {
        return null;
      }

      return {
        ...item,
        value: normalizedValue,
        url: normalizedValue,
        label: normalizedLabel,
      };
    })
    .filter(Boolean);

  const uniqueOptionsByValue = new Map();
  mergedOptions.forEach((item) => {
    if (!uniqueOptionsByValue.has(item.value)) {
      uniqueOptionsByValue.set(item.value, item);
    }
  });

  return [...uniqueOptionsByValue.values()].sort((left, right) =>
    left.label.localeCompare(right.label),
  );
};

export default function AddUpdateCaseStudy({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
  mode = "default",
}) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDetail, setFileDetail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState([]);
  const isInlineEditorMode = mode === "inline";
  const [compactSpacing, setCompactSpacing] = useState(isInlineEditorMode);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const getAllMenu = async () => {
    try {
      const { data } = await axiosInstance(
        "public/menu/getallHierarchically/main",
      );
      setCategory(buildCaseStudyCategoryOptions(data));
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation({
    mutationFn: async (req) => addUpdateCaseStudy(req, row?._id),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: "Successfully Added Case Study",
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
    const filePayload = fileDetail || row?.file;
    if (!filePayload && !isEditOrUpdate && !isInlineEditorMode) {
      toast({
        variant: "destructive",
        title: "Please upload an images.",
      });
      return;
    }

    const selectedCategories = Array.isArray(data.category)
      ? data.category
          .map((el) => (typeof el === "string" ? el : el?.value))
          .map((value) => normalizeCategoryPath(value))
          .filter(Boolean)
      : [];

    mutation.mutate({
      ...data,
      file: filePayload ? { ...filePayload } : undefined,
      content: data.content ?? row?.content ?? "",
      category: selectedCategories,
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
      const { data } = await axiosInstance.post("case-study/upload", formData, {
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
      setUploading(false);
      setUploadProgress(0);
      setFileDetail(data);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };
  useEffect(() => {
    if (isEditOrUpdate) {
      const selectedCategoryValues = new Set(
        (Array.isArray(row?.category) ? row.category : [])
          .map((value) => normalizeCategoryPath(value))
          .filter(Boolean),
      );
      const filterSelectItems = category?.filter((el) =>
        selectedCategoryValues.has(normalizeCategoryPath(el.value)),
      );
      form.reset({
        ...row,
        content: row?.content ?? "",
        category: filterSelectItems?.map((el) => ({
          value: el.value,
          label: el.label,
        })),
      });
      setFileDetail(row?.file);
    }
  }, [isEditOrUpdate, category, row, form]);
  useEffect(() => {
    getAllMenu();
  }, []);

  useEffect(() => {
    setCompactSpacing(isInlineEditorMode);
  }, [isInlineEditorMode]);

  const isSameImage = isEditOrUpdate
    ? row?.file?.filePath === fileDetail?.filePath
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
          className="max-w-4xl max-h-[85vh] overflow-auto"
          onClose={onClose}
        >
          <DialogHeader>
            <DialogTitle>
              {isInlineEditorMode
                ? "Inline Case Study Editor"
                : `${isEditOrUpdate ? "Update" : "Add"} Case Study`}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                {!isInlineEditorMode && (
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
                )}
                {!isInlineEditorMode && (
                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter description"
                              {...field}
                              className="h-8"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                {isInlineEditorMode && (
                  <div className="col-span-2 space-y-3">
                    <div className="rounded-md bg-slate-100 p-3 text-sm text-slate-700">
                      Editing content for: <span className="font-semibold">{row?.title}</span>
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={compactSpacing}
                        onChange={(event) => setCompactSpacing(event.target.checked)}
                      />
                      Minimize heading/paragraph spacing
                    </label>
                  </div>
                )}
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Editor
                            defaultValue={field.value || ""}
                            setContent={field.onChange}
                            dense={compactSpacing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!isInlineEditorMode && (
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
                              options={category}
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
                )}
                {isEditOrUpdate && (
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            value={field.value ? "true" : "false"}
                            className="flex flex-row gap-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                In-Active
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
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
                )}
                {!isInlineEditorMode && (
                  <div>
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
                )}
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

                <LoadingButton
                  type="submit"
                  size="lg"
                  loading={mutation.isPending}
                >
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
