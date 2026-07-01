"use client";
import { useState,useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";

import { useGetAllBOD } from "../api-hook";
import AddUpdateBOD from "./actions";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteBOD } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function BoardOFDirectors() {
  const {toast}=useToast()
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "displayOrder",
      header: "Order",
      cell: ({ row }) => row.original?.displayOrder ?? "-",
    },
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "description",
      header: "Description",
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
                setOpenAddUpdateDialog(true);
                setSelectedRow(row.original);
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
  const { data, isLoading, refetch } = useGetAllBOD();

  const handleDelete = async () => {
    try {
      await deleteBOD(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete.",
      });
    }
  };

  useEffect(() => {
    if (openAddUpdateDialog) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Enable scrolling when closed
    }

    // Cleanup when component is unmounted or closed
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [openAddUpdateDialog]);
  return (
    <div>
      {openAddUpdateDialog && (
        <AddUpdateBOD
          isEditOrUpdate={isEditOrUpdate}
          open={openAddUpdateDialog}
          row={selectedRow}
          onClose={() => {
            setIsEditOrUpdate(false);
            setSelectedRow(null);
            setOpenAddUpdateDialog(false);
          }}
          refetch={refetch}
        />
      )}

      {openDelete && (
        <Delete
          className="bg-primary/55"
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
            title: "Add New Member",
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
