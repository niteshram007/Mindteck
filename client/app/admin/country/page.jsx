"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import AddCountry from "./actions";
import { useGetAllCountry } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import Delete from "@/components/ui/Delete";
import { deleteCountry } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function GlobalOfficeCountry() {
  const {toast}=useToast()
  const { data, isLoading, refetch } = useGetAllCountry();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
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
      await deleteCountry(selectedRow._id);
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
        <AddCountry
          isEditOrUpdate={isEditOrUpdate}
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
          row={selectedRow}
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
            title: " Add New Country",
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
