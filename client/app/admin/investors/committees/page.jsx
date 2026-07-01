"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import AddStockExchangeFilingDocument from "./actions";
import { useGetAllCommittees } from "../../api-hook";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteCommittees } from "../../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function Committees() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllCommittees();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    {
      accessorKey: "committeeType",
      header: "Committee Type",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "isActive",
      header: "isActive",
      cell: ({ row }) => {
        const activeClass='bg-emerald-400/20 text-emerald-700'
        const inActiveClass='bg-rose-400/20 text-rose-700'
        return (
          <span
            className={`${row.original.isActive?activeClass:inActiveClass} p-1.5 rounded-sm text-xs`}
          >
            {" "}
            {row.original.isActive ? "Active" : "In-Active"}
          </span>
        );
      },
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
      await deleteCommittees(selectedRow._id);
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
        <AddStockExchangeFilingDocument
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
