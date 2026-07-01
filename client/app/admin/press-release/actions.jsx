"use client";
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
import { useMutation } from "@tanstack/react-query";
import { addUpdatePressRelease } from "../api-hook/mutations";
import { useEffect, useState } from "react";
import Editor from "@/components/Editor/Editor";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingButton from "@/components/ui/loading-button";
import { X } from "lucide-react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2015 }, (_, index) => ({
  value: (currentYear - index).toString(),
  label: (currentYear - index).toString(),
}));

// Default values and schema definitions
const defaultValues = {
  title: "",
  content: "",
  status: "Draft",
  seoTitle: "",
  seoDescription: "",
  publicationYear: String(currentYear),
  publicationDate: new Date().toISOString().slice(0, 10),
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  status: z.enum(["Draft", "Published"]).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  publicationDate: z.string().optional(),
  publicationYear: z.string().optional(),
});

export default function AddPressRelease({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdatePressRelease(req, row?._id),
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
        title: "Uh oh! Something went wrong.",
        description: "Failed to add Member",
      });
    },
  });

  function onSubmit(data) {
    const resolvedContent = (content || row?.content || "").trim();
    if (!resolvedContent) {
      toast({
        variant: "destructive",
        title: "Please add Content",
      });
      return;
    }

    const normalizedYear = Number(
      data.publicationYear || row?.publicationYear || currentYear,
    );
    if (
      Number.isNaN(normalizedYear) ||
      normalizedYear < 2000 ||
      normalizedYear > 2999
    ) {
      toast({
        variant: "destructive",
        title: "Please select a valid publication year",
      });
      return;
    }

    const normalizedDate =
      data.publicationDate ||
      row?.publicationDate ||
      new Date().toISOString().slice(0, 10);

    mutation.mutate({
      ...data,
      title: (data.title || "").trim(),
      seoTitle: (data.seoTitle || "").trim(),
      seoDescription: (data.seoDescription || "").trim(),
      status: data.status || row?.status || "Draft",
      publicationDate: normalizedDate,
      publicationYear: normalizedYear,
      content: resolvedContent,
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        publicationYear: row?.publicationYear
          ? String(row.publicationYear)
          : String(currentYear),
        publicationDate:
          row?.publicationDate?.slice?.(0, 10) ||
          new Date().toISOString().slice(0, 10),
      });
      setContent(row?.content || "");
    }
  }, [isEditOrUpdate, row, form]);

  return (
    <div className="fixed w-full h-full left-0 right-0 top-0 z-40  bg-black/35  transition-all flex items-center ">
        <div className="sm:max-w-[850px] w-full m-auto max-h-[400px] overflow-y-auto bg-white  p-5 rounded-md">
        <div className="flex justify-between mb-3 items-center">
          <h4 className="text-xl font-semibold">Add Press Release</h4>
          <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
        </div>
        <div className="">
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
              <div>
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Sub Title"
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
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seo Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Seo Description"
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
                  name="publicationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Year</FormLabel>
                      <FormControl>
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          className="block border border-gray-200 w-full rounded-md h-8"
                        >
                          <option value={""}>Select Year</option>
                          {years.map((el) => (
                            <option value={el.value} key={el.label}>
                              {el.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="publicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || "Draft"}
                          className="flex flex-row gap-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Draft" />
                            </FormControl>
                            <FormLabel className="font-normal">Draft</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Published" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Published
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <Editor
                  defaultValue={isEditOrUpdate ? row?.content || "" : ""}
                  setContent={setContent}
                />
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
      </div>
      </div>
    </div>
  );
}
