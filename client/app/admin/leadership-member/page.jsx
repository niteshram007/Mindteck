"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { useGetAllLeaders } from "../api-hook";
import AddUpdateLeaderShip from "./actions";
import { Icons } from "@/components/icons";
import { Edit, Edit2, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import Delete from "@/components/ui/Delete";
import { deleteMember } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function LeaderShipMember() {
  const { toast } = useToast();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
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
          <div className="flex gap-2">
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
  const { data, isLoading, refetch } = useGetAllLeaders();

  const handleDelete = async () => {
    try {
      await deleteMember(selectedRow._id);
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
        <AddUpdateLeaderShip
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
