"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import UploadInvestorPdf from "./actions";

import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { useToast } from "@/hooks/use-toast";
import { useGetInvestorStaticPdf } from "@/app/admin/api-hook";
import { deleteInvestorStaticPdf } from "@/app/admin/api-hook/mutations";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";

export default function InvestorStaticPdfUploads() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetInvestorStaticPdf();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    {
      accessorKey: "type",
      header: "Page",
    },
    {
      id: "title",
      header: "Display Name",
      cell: ({ row }) => row.original?.title || row.original?.type,
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
            <a
              rel="noopener noreferrer"
              href={UPLOADED_IMAGE_PATH + row.original.file.filePath}
              target="_blank"
              className="text-secondary"
            >
              <Eye size="1.2rem" className="cursor-pointer" />
            </a>

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
      await deleteInvestorStaticPdf(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response?.data?.message || "Failed to delete",
      });
    }
  };

  return (
    <div>
      {openAddUpdateDialog && (
        <UploadInvestorPdf
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
          row={{
            ...selectedRow,
            name: selectedRow?.title || selectedRow?.type,
          }}
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
