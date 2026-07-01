"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

import { useGetAllInvestorFeedBack } from "../../api-hook";
import { Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteContactFeedback, deleteInvestorFeedBack } from "../../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";

export default function InvestorFeedback() {
  const { toast } = useToast();
  const { data, refetch, isLoading } = useGetAllInvestorFeedBack();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    {
      accessorKey: "source",
      header: "Form Type",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "page",
      header: "Page",
      Cell: ({ row }) => <span>{row.original.page || "-"}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "smsOptIn",
      header: "SMS Opt-In",
      size: 110,
      cell: ({ row }) => {
        if (typeof row.original.smsOptIn !== "boolean") {
          return <span>-</span>;
        }

        return <span>{row.original.smsOptIn ? "Yes" : "No"}</span>;
      },
    },
    {
      id: "emailOptIn",
      header: "Email Opt-In",
      size: 110,
      cell: ({ row }) => {
        if (typeof row.original.emailOptIn !== "boolean") {
          return <span>-</span>;
        }

        return <span>{row.original.emailOptIn ? "Yes" : "No"}</span>;
      },
    },
    {
      id: "unsubscribed",
      header: "Unsubscribed",
      size: 110,
      cell: ({ row }) => {
        if (typeof row.original.unsubscribed !== "boolean") {
          return <span>-</span>;
        }

        return <span>{row.original.unsubscribed ? "Yes" : "No"}</span>;
      },
    },
    {
      accessorKey: "telephone",
      header: "Telephone",
    },
    {
      accessorKey: "company",
      header: "Company",
      Cell: ({ row }) => <span>{row.original.company || "-"}</span>,
    },
    {
      accessorKey: "country",
      header: "Country",
      Cell: ({ row }) => <span>{row.original.country || "-"}</span>,
    },
    {
      accessorKey: "message",
      header: "Message / Comments",
    },
    {
      accessorKey: "createdAt",
      header: "Submitted At",
      Cell: ({ row }) => (
        <span>
          {row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleString()
            : "-"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-4">
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
      enableHiding: false,
    },
  ];

  const handleDelete = async () => {
    try {
      if (selectedRow?.source === "Industries") {
        await deleteContactFeedback(selectedRow._id);
      } else {
        await deleteInvestorFeedBack(selectedRow._id);
      }
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
      {openDelete && (
        <Delete
          row={{ ...selectedRow, name: selectedRow?.name || "item from records" }}
          refetch={refetch}
          handleDelete={handleDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
        />
      )}

      <DataTable loading={isLoading} data={data || []} columns={columns} />
    </div>
  );
}
