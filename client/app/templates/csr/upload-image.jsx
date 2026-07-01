import { axiosInstance } from "@/app/utils/axiosInstance";
import { TEMP_IMAGE_PATH, UPLOADED_IMAGE_PATH } from "@/app/utils/constant";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function UploadImage({
  onClose,
  imageType,
  setFirstImageList,
  setSecondImageList,
  isEdit,
  selectedImage,
}) {
  const { toast } = useToast();
  const inputFileRef = useRef();
  const [fileDetail, setFileDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axiosInstance.post("page/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      setUploading(false);
      setUploadProgress(0);
      setFileDetail(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Uh oh! Something went wrong.",
      });
      setUploading(false);
    }
  };

  const handleAddImage = () => {
    if (imageType === "first") {
      if (isEdit) {
        setFirstImageList((ps) =>
          ps.map((item) => {
            if (item.path === selectedImage.path) {
              if (selectedImage.path !== fileDetail.filePath) {
                return { path: fileDetail.filePath, title, isExist: false };
              }
              if (selectedImage.title !== title) {
                return { path: fileDetail.filePath, title, isExist: selectedImage.isExist };
              }
            }
            return item;
          })
        );
        return;
      }
      setFirstImageList((ps) => [
        ...ps,
        {
          path: fileDetail.filePath,
          title,
          isExist: isEdit ? selectedImage.path === fileDetail.filePath : false,
        },
      ]);
    }
    if (imageType === "second") {
      if (isEdit) {
        setSecondImageList((ps) =>
          ps.map((item) => {
            if (item.path === selectedImage.path) {
              if (selectedImage.path !== fileDetail.filePath) {
                return { path: fileDetail.filePath, title, isExist: false };
              }
              if (selectedImage.title !== title) {
                return { path: fileDetail.filePath, title, isExist: selectedImage.isExist };
              }
            }
            return item;
          })
        );
        return;
      }
      setSecondImageList((ps) => [
        ...ps,
        {
          path: fileDetail.filePath,
          title,
          isExist: isEdit ? selectedImage.path === fileDetail.filePath : false,
        },
      ]);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setFileDetail({ filePath: selectedImage.path });
      setTitle(selectedImage.title);
    }
  }, [isEdit]);

  const isSameImage =
    selectedImage.isExist && isEdit
      ? selectedImage.path === fileDetail?.filePath
      : false;

  console.log(selectedImage, "selectedImage");
  return (
    <Dialog
      open
      onOpenChange={(e) => {
        onClose();
      }}
      modal
    >
      <DialogContent className="max-w-sm max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1">
          <div>
            <input
              id="picture"
              type="file"
              ref={inputFileRef}
              onChange={handleUpload}
              size="small"
              className="hidden"
            />
            <Card
              className="w-full h-[120px]  mt-5 mb-3 p-2 text-center border-gray-400 border-dashed  border-2 flex justify-center items-center bg-gray-100 cursor-pointer relative"
              onClick={() => {
                inputFileRef.current.click();
              }}
            >
              {fileDetail?.filePath ? (
                <img
                  src={
                    (isSameImage ? UPLOADED_IMAGE_PATH : TEMP_IMAGE_PATH) +
                    fileDetail?.filePath
                  }
                  alt="temp-image"
                  className="w-full h-full  w-[300px] h-[100px] object-contain"
                />
              ) : (
                <div className="text-center">
                  <UploadCloud className="m-auto" />
                  <p className="text-sm font-semibold">
                    Upload partners and alliances image
                  </p>
                  <p className="text-xs font-normal">
                    Click here to upload image
                  </p>
                </div>
              )}

              {uploading && (
                <div className="flex flex-col items-center justify-center absolute w-full h-full bg-white/80 px-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* using this input type for both upload */}
            </Card>
          </div>
          {fileDetail && (
            <Input
              className="h8"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          )}
        </div>

        <DialogFooter className="justify-end mt-4">
          <DialogClose>
            <Button type="button" variant="destructive" size="lg">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            size="lg"
            onClick={() => {
              handleAddImage();
              onClose();
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
