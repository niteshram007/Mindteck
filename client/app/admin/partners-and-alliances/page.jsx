"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import AddCountry from "./actions";
import { useGetAllPartnerAndAlliances } from "../api-hook";
import { Edit, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import {
  deletePartnerAndAlliances
} from "../api-hook/mutations";
import Image from "next/image";
import { UPLOADED_IMAGE_PATH } from "../../utils/constant";
import { useToast } from "@/hooks/use-toast";

export default function PartnerAndAlliances() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllPartnerAndAlliances();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const columns = [
    {
      accessorKey: "image",
      header: "Name",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Image
            src={UPLOADED_IMAGE_PATH + row?.original?.file?.filePath}
            width={100}
            height={100}
            objectFit="cover"
          />
        );
      },
    },
    {
      accessorKey: "order",
      header: "Order",
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
      await deletePartnerAndAlliances(selectedRow._id);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
      toast({
        variant: "success",
        title: "Deleted Successfully",
      });
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
            title: " Add New",
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
