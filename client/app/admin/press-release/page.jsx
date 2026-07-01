"use client";
import { useState,useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";

import { useGetAllPressRelease } from "../api-hook";
import AddPressRelease from "./actions";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deletePressRelease } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";


export default function PressRelease() {
  const { toast } = useToast();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "publicationYear",
      header: "Publication Year",
    },
    {
      accessorKey: "publicationDate",
      header: "Publication Date",
    },
    {
      accessorKey: "status",
      header: "Status",
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
  const { data, isLoading, refetch } = useGetAllPressRelease();

  const handleDelete = async () => {
    try {
      await deletePressRelease(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: "Deleted Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete.",
      });
    }
  };

  useEffect(() => {
    if (openAddUpdateDialog) {
      document.body.style.overflowY = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflowY = "auto"; // Enable scrolling when closed
    }

    // Cleanup when component is unmounted or closed
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [openAddUpdateDialog]);
  return (
    <div>
      {openAddUpdateDialog && (
        <AddPressRelease
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
        data={data || []}
        columns={columns}
        loading={isLoading}
        freeActions={[
          {
            title: "Add New",
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
