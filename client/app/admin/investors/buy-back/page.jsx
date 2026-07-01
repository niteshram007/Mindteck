"use client";
import { useState } from "react";
import AddUpdateBuyback from "./actions";
import { useGetAllBuyBack } from "../../api-hook";
import { ChevronDown, Edit, Eye, Trash } from "lucide-react";
import Delete from "@/components/ui/Delete";
import {  deleteBuyBack } from "../../api-hook/mutations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";

export default function BuyBack() {
  const { toast } = useToast();
  const { data, isLoading, refetch } = useGetAllBuyBack();
  const [isEditOrUpdate, setIsEditOrUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openAddUpdateDialog, setOpenAddUpdateDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBuyBack(selectedRow);
      refetch();
      setOpenDelete(false);
      setSelectedRow(null);
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to  delete",
      });
    }
  };

  return (
    <div>
      {openAddUpdateDialog && (
        <AddUpdateBuyback
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

      <Button
        onClick={() => {
          setOpenAddUpdateDialog(true);
        }}
        size="sm"
        disabled={isLoading}
        className="mb-3"
      >
        Add new
      </Button>
      {data?.map((el) => (
        <Collapsible className={`group${el._id}/collapsible`} key={el._id}>
          <CollapsibleTrigger className="bg-primary text-md font-semibold text-white flex justify-between w-full px-3 py-2 mb-2">
            {el.year}
            <ChevronDown
              className={`ml-auto transition-transform group${el._id}-data-[state=open]/collapsible:rotate-180`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-md font-semibold">General Reports</p>
            {el.generalUpdated.length > 0 ? (
              el?.generalUpdated?.map((generalItems) => (
                <div
                  className="flex justify-between items-center border-b border-gray-300 py-1.5 hover:text-primary hover:bg-gray-100"
                  key={generalItems}
                >
                  <p className="text-md  flex items-center  text-[#323030] font-[300] ">
                    {generalItems.title}
                  </p>
                  <div className="flex gap-2 items-center">
                    <Edit
                      size={18}
                      color="green"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedRow({
                          ...el,
                          generalUpdated: [generalItems],
                          id: generalItems.id,
                          currentFile: generalItems.file.filePath,
                          type: "General Updates",
                        });
                        setOpenAddUpdateDialog(true);
                        setIsEditOrUpdate(true);
                      }}
                    />
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={UPLOADED_IMAGE_PATH + generalItems.file.filePath}
                    >
                      <Eye size={18} />
                    </a>
                    <Trash
                      size={18}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenDelete(true);
                        setSelectedRow({
                          ...el,
                          generalUpdated: [generalItems],
                          id: generalItems.id,
                          currentFile: generalItems.file.filePath,
                          type: "General Updates",
                        });
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-md">No Record to display</p>
            )}

            <p className="text-md font-semibold mt-4 mb-2">Daily Reports</p>
            {el?.dailyReports &&
              Object.entries(el?.dailyReports).map(([key, value]) => (
                <Collapsible className={`group${key}/collapsible`} key={key}>
                  <CollapsibleTrigger className="bg-gray-200 text-md font-semibold text-primary flex justify-between w-full px-3 py-2  mb-2">
                    {key}
                    <ChevronDown
                      className={`ml-auto transition-transform group${key}-data-[state=open]/collapsible:rotate-180`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {value.map((dailyReportItem) => (
                      <div
                        className="flex justify-between items-center border-b border-gray-300 py-1.5 hover:text-primary hover:bg-gray-100"
                        key={dailyReportItem}
                      >
                        <p className="text-md  flex items-center  text-[#323030] font-[300] ">
                          {dailyReportItem?.date &&
                            format(
                              new Date(dailyReportItem.date),
                              "MMMM dd yyyy"
                            )}
                        </p>
                        <div className="flex gap-2 items-center">
                          <Edit
                            size={18}
                            color="green"
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedRow({
                                ...el,
                                month: key,
                                dates: [dailyReportItem],
                                currentFile: dailyReportItem.file.filePath,
                                type: "Daily Updates",
                              });
                              setOpenAddUpdateDialog(true);
                              setIsEditOrUpdate(true);
                            }}
                          />
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={
                              UPLOADED_IMAGE_PATH +
                              dailyReportItem.file.filePath
                            }
                          >
                            <Eye size={18} />
                          </a>
                          <Trash
                            size={18}
                            color="red"
                            className="cursor-pointer"
                            onClick={() => {
                              setOpenDelete(true);
                              setSelectedRow({
                                ...el,
                                month: key,
                                dates: [dailyReportItem],
                                currentFile: dailyReportItem.file.filePath,
                                type: "Daily Updates",
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
