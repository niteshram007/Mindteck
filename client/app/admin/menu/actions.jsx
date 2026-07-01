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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { addUpdateMenus } from "../api-hook/mutations";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  position: "",
  label: "",
  parent: "",
  url: "",
  order: "",
};

const formSchema = z.object({
  label: z.string().min(1, { message: "Required" }),
  url: z.string().min(1, { message: "Required" }),
  position: z.string().min(1, { message: "Required" }),
  parent: z.string().optional(),
  order: z.string(),
});

export default function MenuActions({
  isEditOrUpdate,
  onClose,
  refetch,
  allMenus,
  loading,
  row,
}) {
  // const { data } = useGetMenuCategory();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateMenus(req, row?._id),
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
    mutation.mutate({
      ...data,
      order: Number(data.order),
      parent: data.parent ? data.parent : null,
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
        order: row.order + "",
        parent: row.parentId,
      });
    }
  }, [row]);

  return (
    <Dialog
      open
      onOpenChange={(e) => {
        onClose();
      }}
      
    >
      <DialogContent className="max-w-4xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"header"}>Header</SelectItem>
                          <SelectItem value={"main"}>Main</SelectItem>
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
                  name="parent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Parent</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Parent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {allMenus?.map((el) => (
                            <SelectItem value={el._id} key={el._id}>
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

              <div>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter label</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} className="h-8" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter Order"
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

            <DialogFooter className="justify-end gap-2">
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
