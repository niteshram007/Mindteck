"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

import { useGetAllCaseStudy } from "../api-hook";
import AddCaseStudy from "./actions";
import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteCaseStudy } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function CaseStudy() {
  const { toast } = useToast();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [dialogMode, setDialogMode] = useState("default");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Sub Title",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "isActive",
      header: "isActive",
      cell: ({ row }) => {
        const activeClass = "bg-emerald-400/20 text-emerald-700";
        const inActiveClass = "bg-rose-400/20 text-rose-700";
        return (
          <span
            className={`${
              row.original.isActive ? activeClass : inActiveClass
            } p-1.5 rounded-sm text-xs`}
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
                setDialogMode("default");
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
            <Eye
              size="1.2rem"
              color="red"
              className="cursor-pointer"
              onClick={() => {
                setIsEditOrUpdate(true);
                setDialogMode("inline");
                setOpenAddUpdateDialog(true);
                setSelectedRow(row.original);
              }}
            />
          </div>
        );
      },
    },
  ];
  const { data, isLoading, refetch } = useGetAllCaseStudy();

  const handleDelete = async () => {
    try {
      await deleteCaseStudy(selectedRow._id);
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

  return (
    <div>
      {openAddUpdateDialog && (
        <AddCaseStudy
          isEditOrUpdate={isEditOrUpdate}
          mode={dialogMode}
          open={openAddUpdateDialog}
          row={{ ...selectedRow }}
          onClose={() => {
            setIsEditOrUpdate(false);
            setDialogMode("default");
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
            title: "Add New Case Study",
            onClick: () => {
              setDialogMode("default");
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
