"use client";
import { useState } from "react";
import AddJobPost from "./actions";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteJobPost } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { ServerSideDataTable } from "@/components/ui/server-side-data-table";

import { getColorClassNameByStatusName } from "../../utils/constant";
import { axiosInstance } from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function JobPosts() {
  const { toast } = useToast();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
      accessorKey: "reviewStatus",
      header: "Review Status",
      cell: ({ row }) => {
        return (
          <span
            className={`${getColorClassNameByStatusName(
              row.original.reviewStatus
            )} p-1.5 rounded-sm text-xs`}
          >
            {row.original.reviewStatus??'Pending'}
          </span>
        );
      },
    },
    {
      accessorKey: "reviewedBy",
      header: "Reviewed By",
    },
    {
      accessorKey: "review",
      header: "Remarks",
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4">
            <Edit
              size="1.2rem"
              color="green"
              className="cursor-pointer"
              onClick={() => {
                setIsEditOrUpdate(true);
                setSelectedRow(row.original);
                setOpenAddUpdateDialog(true);
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
      await deleteJobPost(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: `Successfully Deleted Job!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Failed to  delete Job",
      });
    }
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "job-lists",

      pagination.pageIndex, 
      pagination.pageSize, 
    ],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("pageSize", pagination.pageSize);
      searchParams.append("page", pagination.pageIndex + 1);
      const { data } = await axiosInstance("job/getall", {
        params: searchParams,
      });
      return data;
    },
    keepPreviousData: true,
  });

  return (
    <div>
      {openAddUpdateDialog && (
        <AddJobPost
          isEditOrUpdate={isEditOrUpdate}
          open={openAddUpdateDialog}
          onClose={() => {
            setOpenAddUpdateDialog(false);
            setSelectedRow(null);
            setIsEditOrUpdate(false);
          }}
          row={selectedRow}
          refetch={refetch}
        />
      )}
      {openDelete && (
        <Delete
          row={{ ...selectedRow, name: selectedRow.title }}
          refetch={refetch}
          handleDelete={handleDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
        />
      )}

      <ServerSideDataTable
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        data={data?.data ?? []}
        totalRows={data?.total ?? 0}
        loading={isLoading}
        freeActions={[
          {
            title: "Create New Job",
            onClick: () => {
              setOpenAddUpdateDialog(true);
            },
            size: "sm",

            disabled: false,
          },
        ]}
      />
    </div>
  );
}
