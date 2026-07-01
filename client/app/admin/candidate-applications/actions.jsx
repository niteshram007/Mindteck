import { Button } from "@/components/ui/button";
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
import { useMutation } from "@tanstack/react-query";
import { updateApplicationStatus } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applicationStatusList } from "@/lib/utils";
import { DateTimePickerForm } from "@/components/common-client-component/date-picker";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  applicationStatus: "",
  remarks: "",
  interviewDate: null,
};

const formSchema = z
  .object({
    applicationStatus: z.string().min(1, { message: "Required" }),
    remarks: z.string().min(1, { message: "Required" }),
    interviewDate: z.date().nullable().optional(),
  })
  .refine(
    (data) => {
      // If applicationStatus is "Shortlisted", interviewDate should not be empty
      if (data.applicationStatus === "Shortlisted" && !data.interviewDate) {
        return false; // This will cause validation failure
      }
      return true;
    },
    {
      message: "Interview date is required for shortlisted candidates",
      path: ["interviewDate"], // Specify the path to the field
    }
  );

export default function UpdateStatus({ onClose, refetch, row }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => updateApplicationStatus(req, row?._id),
    onSuccess: () => {
      refetch(undefined);
      onClose();
      toast({
        variant: "success",
        title: `Successfully Updated`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Something went wrong",
      });
    },
  });
  function onSubmit(data) {
    mutation.mutate({
      ...data,
      interviewDate:
        data.applicationStatus === "Shortlisted"
          ? data.interviewDate
          : undefined,
    });
  }

  return (
    <Dialog
      open
      onOpenChange={(e) => {
        onClose();
      }}
      modal
    >
      <DialogContent className="max-w-xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <FormField
                  control={form.control}
                  name="applicationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Status</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          form.setValue("interviewDate", null);
                          field.onChange(e);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose Option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {applicationStatusList.map((el) => (
                            <SelectItem value={el} key={el}>
                              {el}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {form.watch("applicationStatus") === "Shortlisted" && (
                <div>
                  <FormField
                    control={form.control}
                    name="interviewDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interview Date</FormLabel>
                        <FormControl>
                          <DateTimePickerForm
                            value={field.value}
                            onSelect={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div>
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Remarks"
                          {...field}
                          className="min-h-[40]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="justify-end mt-3">
              <Button
                type="button"
                variant="destructive"
                size="lg"
                onClick={onClose}
              >
                Close
              </Button>

              <LoadingButton
                type="submit"
                size="lg"
                loading={mutation.isPending}
              >
                Update
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
