"use client";
import { useState } from "react";
import MenuActions from "./actions";
import { useGetAllMenus } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteMenu } from "../api-hook/mutations";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/hooks/use-toast";

export default function Menus() {
  const {toast}=useToast()
  const { data, isLoading, refetch } = useGetAllMenus();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "label",
      header: "Label",
    },
    {
      accessorKey: "parent",
      header: "Parent",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "order",
      header: "Order",
    },
    {
      id: "actions",
      size: 70,
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
      await deleteMenu(selectedRow._id);
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
        <MenuActions
          isEditOrUpdate={isEditOrUpdate}
          open={openAddUpdateDialog}
          onClose={() => {
            setOpenAddUpdateDialog(false);
            setSelectedRow(null);
            setIsEditOrUpdate(false);
          }}
          row={selectedRow}
          loading={isLoading}
          allMenus={data}
          refetch={refetch}
        />
      )}
      {openDelete && (
        <Delete
          row={{ ...selectedRow, name: selectedRow.label }}
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
            title: "Add New Menu",
            onClick: () => {
              setOpenAddUpdateDialog(true);
            },
            size:'sm', 
            disabled:isLoading
          },
        ]}
      />
    </div>
  );
}
