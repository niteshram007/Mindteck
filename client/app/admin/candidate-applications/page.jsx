"use client";
import { useState } from "react";
import { Eye, Filter, RefreshCcwDot, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteApplication } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { ServerSideDataTable } from "@/components/ui/server-side-data-table";
import { useGetAllApplicationByFilter } from "../api-hook";
import { useSearchParams } from "next/navigation";
import { applicationStatusList, formatDate } from "@/lib/utils";
import { UPLOADED_IMAGE_PATH } from "../../utils/constant";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UpdateStatus from "./actions";
import RangeSlider from "@/components/common-client-component/range-slider";
const defaultValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  mobileNo: "",
  skillsSet: "",
  applicationStatus: "",
  salaryMin: 0,
  salaryMax: 50_00_000,
  expectedCtcMin: 0,
  expectedCtcMax: 50_00_000,
  totalExperienceMin: 0,
  totalExperienceMax: 15,
};

const formSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    // dateOfBirth: z.string().nullable(),
    gender: z.string(),
    email: z.string(),
    mobileNo: z.string(),
    skillsSet: z.string(),
    applicationStatus: z.string(),
    salaryMin: z.number(),
    salaryMax: z.number(),
    expectedCtcMin: z.number(),
    expectedCtcMax: z.number(),
    totalExperienceMin: z.number(),
    totalExperienceMax: z.number(),
  })
  .optional();

export default function CandidateApplication() {
  const { toast } = useToast();
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data, isLoading, refreshWithParams, refetch } =
    useGetAllApplicationByFilter({
      jobId: jobId,
      pageSize: pagination.pageSize,
      page: pagination.pageIndex,
    });
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const columns = [
    {
      accessorKey: "firstName",
      header: "Candidate Full Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile",
    },
    {
      accessorKey: "panCardNo",
      header: "Pan No.",
    },

    {
      accessorKey: "employmentDetails.totalExperience",
      header: "Experience",
    },
    {
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "interviewDate",
      header: "Interview Date",
      cell: ({ row }) =>
        row.original.interviewDate
          ? new Date(row.original.interviewDate).toLocaleString()
          : "N/A",
    },
    {
      accessorKey: "applicationStatus",
      header: "Status",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4">
            <a rel="noopener noreferrer"
              href={`${UPLOADED_IMAGE_PATH}${row.original.file.filePath}`}
              target="_blank"
              title="view resume"
            >
              <Eye size="1.2rem" color="green" />
            </a>

            <RefreshCcwDot
              size="1.2rem"
              className="text-primary cursor-pointer"
              onClick={() => {
                setSelectedRow(row.original);
                setOpenUpdateStatus(true);
              }}
            />
            <Trash
              size="1.2rem"
              color="red"
              className="cursor-pointer"
              onClick={() => {
                setOpenDelete(true);
                setSelectedRow(row.original);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteApplication(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: `Successfully Deleted Candidate!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message || "Failed to  delete Candidate",
      });
    }
  };

  const onSubmit = (data) => {
   
    refreshWithParams(data);
  };

  function handleSliderChange(values, fieldName) {
    if (fieldName === "salary") {
      form.setValue("salaryMin", values[0]);
      form.setValue("salaryMax", values[1]);
    }

    if (fieldName === "expectedCtc") {
      form.setValue("expectedCtcMin", values[0]);
      form.setValue("expectedCtcMax", values[1]);
    }

    if (fieldName === "totalExperience") {
      form.setValue("totalExperienceMin", values[0]);
      form.setValue("totalExperienceMax", values[1]);
    }
  }

  console.log(form.getValues(), pagination, "values");

  return (
    <div>
      {openDelete && (
        <Delete
          row={{ ...selectedRow, name: selectedRow.fullName }}
          refetch={refetch}
          handleDelete={handleDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
        />
      )}
      {openUpdateStatus && (
        <UpdateStatus
          refetch={refetch}
          onClose={() => {
            setOpenUpdateStatus(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
        />
      )}
      <div className="text-right">
        <Button
          className="bg-white border-black/50 border text-black mb-2"
          onClick={() => {
            setOpenFilter((ps) => !ps);
          }}
        >
          {openFilter ? "Hide Advance Filter" : "Advance Filter"} <Filter />
        </Button>
      </div>

      {openFilter && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-3 my-4">
              <div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>dob</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-8" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row gap-2 mt-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Female" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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
                        <Input placeholder="Email" {...field} className="h-8" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mobile No"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="skillsSet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills Set</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Skills Set"
                          {...field}
                          className="h-8"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="applicationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
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
              <div>
                <RangeSlider
                  values={[form.watch("salaryMin"), form.watch("salaryMax")]}
                  minValue={0}
                  label="Current Salary"
                  maxValue={50_00_000}
                  step={5_000}
                  onChange={(value) => {
                    handleSliderChange(value, "salary");
                  }}
                />
              </div>
              <div>
                <RangeSlider
                  values={[
                    form.watch("expectedCtcMin"),
                    form.watch("expectedCtcMax"),
                  ]}
                  minValue={0}
                  step={5_000}
                  maxValue={50_00_000}
                  label="Expected Salary"
                  onChange={(value) => {
                    handleSliderChange(value, "expectedCtc");
                  }}
                />
              </div>
              <div>
                <RangeSlider
                  values={[
                    form.watch("totalExperienceMin"),
                    form.watch("totalExperienceMax"),
                  ]}
                  minValue={0}
                  maxValue={15}
                  label="Total Exp."
                  onChange={(value) => {
                    handleSliderChange(value, "totalExperience");
                  }}
                />
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => {
                    form.reset(defaultValues);
                    handleSliderChange();
                    // refresh(defaultValues)
                  }}
                  className="bg-gray-300 text-black"
                >
                  Reset
                </Button>
                <Button type="submit">Filter</Button>
              </div>
            </div>
          </form>
        </Form>
      )}

      <ServerSideDataTable
        columns={columns}
        disableGlobalSearch
        pagination={pagination}
        loading={isLoading}
        setPagination={setPagination}
        data={data?.data ?? []}
        totalRows={data?.total ?? 0}
      />
    </div>
  );
}
