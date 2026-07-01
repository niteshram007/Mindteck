"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import UserManagementAction from "./actions";
import { useGetAllJobCategory } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteCategory } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function JobCategory() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllJobCategory();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "name",
      header: "Category Name",
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
      await deleteCategory(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: `Successfully Deleted Category!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message || "Failed to  delete category",
      });
    }
  };
  return (
    <div>
      {openAddUpdateDialog && (
        <UserManagementAction
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
          row={{ ...selectedRow, name: selectedRow.fullName }}
          refetch={refetch}
          handleDelete={handleDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
        />
      )}

      <DataTable
        data={data || []}
        columns={columns}
        loading={isLoading}
        freeActions={[
          {
            title: "Add New Category",
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
