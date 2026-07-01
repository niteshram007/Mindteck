"use client";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import AddBrochure from "./actions";
import { useGetAllBrochure, useGetAllResourceCategories } from "../api-hook";
import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteBrochure } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function Brochure() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllBrochure();
  const { data: resourceCategories } = useGetAllResourceCategories();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [dialogMode, setDialogMode] = useState("default");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const categoryMap = useMemo(() => {
    return new Map(
      (resourceCategories || []).map((item) => [item._id, item.title]),
    );
  }, [resourceCategories]);

  const tableData = useMemo(() => {
    return (data || []).map((row) => ({
      ...row,
      resourceCategoryTitle: categoryMap.get(row.resourceCategoryId) || "-",
    }));
  }, [data, categoryMap]);

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "subTitle",
      header: "Sub Title",
    },
    {
      accessorKey: "resourceCategoryTitle",
      header: "Brochures",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const activeClass = "bg-emerald-400/20 text-emerald-700";
        const inActiveClass = "bg-rose-400/20 text-rose-700";
        return (
          <span
            className={`${
              row.original.isActive ? activeClass : inActiveClass
            } p-1.5 rounded-sm text-xs`}
          >
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

  const handleDelete = async () => {
    try {
      await deleteBrochure(selectedRow._id);
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
        <AddBrochure
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
        data={tableData}
        columns={columns}
        loading={isLoading}
        freeActions={[
          {
            title: "Add New Brochure",
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
