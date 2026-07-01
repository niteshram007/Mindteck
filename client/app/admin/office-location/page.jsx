"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import AddOffice from "./actions";
import { useGetAllOffice } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import Delete from "@/components/ui/Delete";
import { deleteOffice } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function GlobalOfficeLocation() {
  const {toast}=useToast()
  const { data, isLoading, refetch } = useGetAllOffice();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    {
      accessorKey: "location",
      header: "Country",
      cell: ({ row }) => row.original.location[0].name,
    },

    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "address1",
      header: "Address",
      cell: ({ row }) =>
        `${row.original.address1} ${row.original.address2}  ${row.original.address3} ${row.original.address4} ${row.original.address5}`,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "fax",
      header: "Phone",
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
      await deleteOffice(selectedRow._id);
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

  const handleRefetchData = (data) => {
    refetch(data);
  };

  return (
    <div>
      {openAddUpdateDialog && (
        <AddOffice
          isEditOrUpdate={isEditOrUpdate}
          onClose={() => {
            setOpenAddUpdateDialog(false);
            setSelectedRow(null);
            setIsEditOrUpdate(false);
          }}
          row={selectedRow}
          refetch={handleRefetchData}
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
            title: "Add New Office Location",
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
