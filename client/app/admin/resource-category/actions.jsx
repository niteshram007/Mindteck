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
import { addUpdateResourceCategory } from "../api-hook/mutations";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const defaultValues = {
  title: "",
  subTitle: "",
  order: "",
  isActive: true,
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  subTitle: z.string().optional(),
  order: z.string().optional(),
  isActive: z.boolean().default(true),
});

export default function ResourceCategoryActions({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateResourceCategory(req, row?._id),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: `Successfully ${isEditOrUpdate ? "Updated" : "Added"} Resource`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  function onSubmit(data) {
    const orderValue = Number(data.order);
    const resolvedOrder =
      Number.isFinite(orderValue) && orderValue > 0 ? orderValue : 1;

    mutation.mutate({
      ...data,
      title: (data.title || "").trim(),
      subTitle: (data.subTitle || "").trim(),
      order: resolvedOrder,
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        order: row?.order ? String(row.order) : "",
      });
    }
  }, [row, isEditOrUpdate, form]);

  return (
    <Dialog
      open
      onOpenChange={() => {
        onClose();
      }}
      modal
    >
      <DialogContent className="max-w-xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>{isEditOrUpdate ? "Update" : "Add"} Resource</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title"
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
                  name="subTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter sub title"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter order"
                          {...field}
                          className="h-8"
                          type="number"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
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
                            <FormLabel className="font-normal">Active</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="justify-end mt-3 gap-2">
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
