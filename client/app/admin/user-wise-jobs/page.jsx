"use client";
import { DataTable } from "@/components/ui/data-table";
import { useContext, useState } from "react";
import { useGetAllJobsByUserId } from "../api-hook";
import { AuthProvider } from "../layout";
import AddJobPost from "../all-jobs-listing/actions";
import { Ellipsis } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteJobPost } from "../api-hook/mutations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getColorClassNameByStatusName } from "../../utils/constant";
import { useToast } from "@/hooks/use-toast";

export default function JobPosts() {
  const { toast } = useToast();
  const {user} = useContext(AuthProvider);
  const { data, isLoading, refetch } = useGetAllJobsByUserId({
    userId: user?._id,
  });
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
      accessorKey: "applicationCount",
      header: "Total Applications",
    },
    {
      accessorKey: "status",
      header: "Application Status",
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
            {" "}
            {row.original.reviewStatus ?? "Pending"}
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
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <RowActions
          row={row}
          setIsEditOrUpdate={setIsEditOrUpdate}
          setSelectedRow={setSelectedRow}
          setOpenAddUpdateDialog={setOpenAddUpdateDialog}
          setOpenDelete={setOpenDelete}
        />
      ),
      size: 60,
      enableHiding: false,
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteJobPost(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message || "Failed to  delete",
      });
    }
  };
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
      <DataTable
        columns={columns}
        data={data || []}
        loading={isLoading}
        freeActions={[
          {
            title: "Create New Job",
            onClick: () => {
              setOpenAddUpdateDialog(true);
            },
            size: "sm",

            disabled: isLoading,
          },
        ]}
      />
    </div>
  );
}

function RowActions({
  row,
  setIsEditOrUpdate,
  setSelectedRow,
  setOpenAddUpdateDialog,
  setOpenDelete,
}) {
  const router = useRouter();
  return (
    <DropdownMenu className="font-inter">
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push(`candidate-applications?jobId=${row.original._id}`);
            }}
            className="cursor-pointer font-inter text-black text-sm"
          >
            <span>View Applications</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsEditOrUpdate(true);
              setSelectedRow(row.original);
              setOpenAddUpdateDialog(true);
            }}
            className="cursor-pointer font-inter text-black text-sm "
          >
            <span>Edit Post</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenDelete(true);
              setSelectedRow(row.original);
            }}
            className="cursor-pointer font-inter text-sm text-destructive focus:text-destructive"
          >
            <span>Delete Post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
