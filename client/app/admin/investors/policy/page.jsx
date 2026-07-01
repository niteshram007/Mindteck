"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

import { useGetAllPolicy } from "../../api-hook";
import AddUpdatePolicy from "./actions";
import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deletePolicy } from "../../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";

export default function Policy() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllPolicy();
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
      id: "actions",
      cell: ({ row }) => {
        const filePath = row.original?.file?.filePath;

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

            {filePath ? (
              <a
                rel="noopener noreferrer"
                href={UPLOADED_IMAGE_PATH + filePath}
                target="_blank"
                className="text-secondary"
              >
                <Eye size="1.2rem" className="cursor-pointer" />
              </a>
            ) : (
              <Eye size="1.2rem" className="cursor-not-allowed text-gray-300" />
            )}

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
      await deletePolicy(selectedRow._id);
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
        <AddUpdatePolicy
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
