"use client";
import { useContext, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import UserManagementAction from "./actions";
import { useGetAllUser } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import Delete from "@/components/ui/Delete";
import { deleteUser } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { AuthProvider } from "../layout";

export default function UserManagement() {
  const { toast } = useToast();
  const { user } = useContext(AuthProvider);
  const { data, isLoading, refetch } = useGetAllUser();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      accessorKey: "username",
      header: "User Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
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
      await deleteUser(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: `Successfully Deleted User!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message || "Failed to  delete user",
      });
    }
  };
  const filterLoggedInUserDetail = data?.filter((el) => el.email !== user.email);
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
        data={filterLoggedInUserDetail || []}
        columns={columns}
        loading={isLoading}
        freeActions={[
          {
            title: "Add New User",
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
