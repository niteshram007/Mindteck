"use client";
import { useState } from "react";
import AddJobPost from "./actions";
import { Eye } from "lucide-react";
import { ServerSideDataTable } from "@/components/ui/server-side-data-table";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axiosInstance";

export default function JobPostApproval() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const columns = [
    {
      accessorKey: "category",
      header: "Category Name",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "jobType",
      header: "Job Type",
    },
    {
      accessorKey: "experience",
      header: "Experience",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4">
            <Eye
              size="1.2rem"
              color="green"
              className="cursor-pointer"
              onClick={() => {
                setSelectedRow(row.original);
                setOpenAddUpdateDialog(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pending-job-lists", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("pageSize", pagination.pageSize);
      searchParams.append("page", pagination.pageIndex + 1);
      searchParams.append("reviewStatus", "Pending");
      const { data } = await axiosInstance("job/getall", {
        params: searchParams,
      });
      return data;
    },
  });

  return (
    <div>
      {openAddUpdateDialog && (
        <AddJobPost
          open={openAddUpdateDialog}
          onClose={() => {
            setOpenAddUpdateDialog(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
          refetch={refetch}
        />
      )}

      <ServerSideDataTable
        columns={columns}
        pagination={pagination}
        loading={isLoading}
        setPagination={setPagination}
        data={data?.data ?? []}
        totalRows={data?.total ?? 0}
      />
    </div>
  );
}
