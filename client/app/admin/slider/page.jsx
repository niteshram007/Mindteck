"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import AddCountry from "./actions";
import { useGetAllSlider } from "../api-hook";
import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteSlider } from "../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";

export default function Slider() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllSlider();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "title",
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

            {row.original?.items?.[0]?.file?.filePath && (
              <a
                href={UPLOADED_IMAGE_PATH + row.original.items[0].file.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary"
              >
                <Eye size="1.2rem" className="cursor-pointer" />
              </a>
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
      await deleteSlider(selectedRow._id);
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
            title: "Add Slider",
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
