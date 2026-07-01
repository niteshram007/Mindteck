"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import AddUpdateInvestorByType from "./actions";

import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { useToast } from "@/hooks/use-toast";
import { useGetInvestorByType } from "@/app/admin/api-hook";
import { deleteInvestorByType } from "@/app/admin/api-hook/mutations";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";

const typesRequiringFinancialYear = new Set([
  "Annual Return",
  "Transfer of equity shares to IEPF",
]);

export default function InvestorDataByType({
  type,
  allowMultipleByYear = false,
  minFinancialYear = 2004,
}) {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetInvestorByType({ type });
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const requiresFinancialYear = typesRequiringFinancialYear.has(type);

  const columns = [
    ...(requiresFinancialYear
      ? [
          {
            accessorKey: "financialYear",
            header: "Year",
            cell: ({ row }) => row.original?.financialYear || "-",
          },
        ]
      : []),
    {
      accessorKey: "title",
      header: requiresFinancialYear ? "Name" : "Title",
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
      await deleteInvestorByType(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to delete",
      });
    }
  };

  return (
    <div>
      {openAddUpdateDialog && (
        <AddUpdateInvestorByType
          isEditOrUpdate={isEditOrUpdate}
          onClose={() => {
            setOpenAddUpdateDialog(false);
            setSelectedRow(null);
            setIsEditOrUpdate(false);
          }}
          type={type}
          row={selectedRow}
          refetch={refetch}
          allowMultipleByYear={allowMultipleByYear}
          minFinancialYear={minFinancialYear}
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
