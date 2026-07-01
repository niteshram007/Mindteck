import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../../error";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { join } from "node:path";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";
import { pdfTitleType, PdfWithTitleType } from "./pdfWithTitleSchemas";

export const PdfWithTitleService = {
  async createPdfWithTitle(
    pdfWithTitleCollection: Collection<PdfWithTitleType>,
    data: PdfWithTitleType,
  ): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const PdfWithTitleData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await pdfWithTitleCollection.insertOne(PdfWithTitleData);
    return { message: "Created successfully" };
  },

  async updatePdfWithTitle(
    pdfWithTitleCollection: Collection<PdfWithTitleType>,
    updatedPdfWithTitle: PdfWithTitleType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await pdfWithTitleCollection.findOne({ _id: objectId });

    const isSameFile = getOldData?.file?.filePath === updatedPdfWithTitle.file?.filePath;

    if (!isSameFile) {
      if (getOldData?.file) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.file.filePath));
      }

      if (updatedPdfWithTitle.file) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedPdfWithTitle.file.filePath),
          join(UPLOAD_DIR, updatedPdfWithTitle.file.filePath),
        );
      }
    }

    const result = await pdfWithTitleCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedPdfWithTitle, updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", please try again");
    }

    return { message: "Updated successfully" };
  },

  async getPdfWithTitle(pdfWithTitleCollection: Collection<PdfWithTitleType>) {
    return await pdfWithTitleCollection.find().sort({ _id: -1 }).toArray();
  },

  async getPdfWithTitleByType(pdfWithTitleCollection: Collection<PdfWithTitleType>, type:pdfTitleType) {
    return await pdfWithTitleCollection.find({type}).sort({ _id: -1 }).toArray();
  },

  async getActivePdfWithTitle(pdfWithTitleCollection: Collection<PdfWithTitleType>) {
    return await pdfWithTitleCollection.find({isActive:true}).sort({ _id: -1 }).toArray();
  },

  async getActivePdfWithTitleByType(pdfWithTitleCollection: Collection<PdfWithTitleType>, type:pdfTitleType) {
    return await pdfWithTitleCollection.find({type, isActive:true}).sort({ _id: -1 }).toArray();
  },

  async deletePdfWithTitleById(pdfWithTitleCollection: Collection<PdfWithTitleType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await pdfWithTitleCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("PdfWithTitle not found with id " + id + ", please try again");
    }
    if(result.file){
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
