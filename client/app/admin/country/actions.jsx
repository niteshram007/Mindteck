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
import { addUpdateCountry } from "../api-hook/mutations";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  name: "",
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
});

export default function AddCountry({ isEditOrUpdate, onClose, refetch, row }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateCountry(req, row?._id),
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
    mutation.mutate({
      ...data,
      order: Number(data.order),
    });
  }

  useEffect(() => {
    if (isEditOrUpdate) {
      form.reset({
        ...row,
      });
    }
  }, [row]);

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
          <DialogTitle>Add Country</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Country Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Country Name"
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
                onclick={onClose}
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
