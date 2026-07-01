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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { addUpdateUser } from "../api-hook/mutations";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loading-button";

const defaultValues = {
  username: "",
  password: "",
  fullName: "",
  email: "",
  role: "",
  isActive: true,
};

const formSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
  fullName: z.string().min(1, { message: "Required" }),
  email: z.string().min(1, { message: "Required" }),
  role: z.string().min(1, { message: "Required" }),
  isActive: z.boolean().default(true),
});

export default function UserManagementAction({
  isEditOrUpdate,
  onClose,
  refetch,
  row,
}) {
  // const { data } = useGetMenuCategory();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (req) => addUpdateUser(req, row?._id),
    onSuccess: () => {
      refetch();
      onClose();
      toast({
        variant: "success",
        title: `Successfully ${isEditOrUpdate ? "Updated" : "Added"} User!`,
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
    mutation.mutate(data);
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
      <DialogContent className="max-w-4xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
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
                          placeholder="Enter full name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email"
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter username"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter password"
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
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
                          <SelectItem value={"SuperAdmin"}>
                            Super Admin
                          </SelectItem>
                          <SelectItem value={"Admin"}>
                            Recruiter Admin
                          </SelectItem>
                          <SelectItem value={"Recruiter"}>Recruiter</SelectItem>
                        </SelectContent>
                      </Select>

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
                loading={mutation.isPending}
                onClick={onClose}
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
