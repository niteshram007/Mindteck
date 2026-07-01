"use client";
import React, { useState } from "react";

import AddShareHoldingPattern from "./actions";
import { useGetAllShareHoldingPattern } from "../../api-hook";
import { Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import { deleteShareHoldingPattern } from "../../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Paginate from "@/components/common-client-component/Pagination";

export default function ShareHoldingPattern() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllShareHoldingPattern();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleDelete = async () => {
    try {
      const checkIsLastItem =
        data.find((el) => el._id === selectedRow._id).quarters.length > 1;
      await deleteShareHoldingPattern(
        selectedRow._id,
        checkIsLastItem ? selectedRow?.quarterName : undefined
      );
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
        title: error.response.data.message || "Failed to  delete",
      });
    }
  };
  return (
    <div>
      {openAddUpdateDialog && (
        <AddShareHoldingPattern
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
          row={{ ...selectedRow, name: selectedRow.quarterName }}
          refetch={refetch}
          handleDelete={handleDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
            setIsEditOrUpdate(false);
          }}
        />
      )}
      <Button
        onClick={() => {
          setOpenAddUpdateDialog(true);
        }}
        size="sm"
        disabled={isLoading}
      >
        Add new
      </Button>
      <div className="overflow-auto rounded-lg border border-border bg-background mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-11 bg-gray-100">Year</TableHead>
              <TableHead className="h-11 bg-gray-100">Quarter Name</TableHead>
              <TableHead className="h-11 bg-gray-100">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ?.slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              )
              ?.map((el) => (
                <React.Fragment key={el?._id}>
                  <TableRow>
                    <TableCell rowSpan={el.quarters.length + 1}>
                      {el.financialYear}
                    </TableCell>
                  </TableRow>
                  {el?.quarters?.map((quarter) => (
                    <TableRow key={quarter.quarterName}>
                      <TableCell>{quarter.quarterName}</TableCell>
                      <TableCell>
                        <div className="flex gap-4">
                          <Edit
                            size="1.2rem"
                            color="green"
                            className="cursor-pointer"
                            onClick={() => {
                              setIsEditOrUpdate(true);
                              setSelectedRow({
                                ...el,
                                quarters: [quarter],
                              });
                              setOpenAddUpdateDialog(true);
                            }}
                          />

                          <a rel="noopener noreferrer"
                            href={UPLOADED_IMAGE_PATH + quarter.file.filePath}
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
                              setSelectedRow({
                                ...el,
                                quarterName: quarter.quarterName,
                                quarters: [quarter],
                              });
                              setOpenDelete(true);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-3">
          <Label className="max-sm:sr-only">Rows per page</Label>
          <Select
            value={rowsPerPage}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {data?.length > 0 && (
          <div className="flex gap-6 items-center">
            <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
              <p
                className="whitespace-nowrap text-sm text-muted-foreground"
                aria-live="polite"
              >
                <span className="text-foreground">
                  {(page - 1) * rowsPerPage + 1}-
                  {Math.min(
                    Math.max((page - 1) * rowsPerPage + rowsPerPage, 0),
                    data.length
                  )}
                </span>{" "}
                of <span className="text-foreground">{data.length}</span>
              </p>
            </div>
            <Paginate
              totalCount={data?.length ?? 0}
              currentPage={page}
              pageSize={rowsPerPage}
              onPageChange={(page) => {
                setPage(page);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
