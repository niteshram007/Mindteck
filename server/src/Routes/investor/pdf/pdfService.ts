import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../../error";
import { PdfType } from "./pdfSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { join } from "node:path";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const pdfService = {
  async createPdf(pdfCollection: Collection<PdfType>, data: PdfType): Promise<{ message: string }> {
    
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const PdfData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await pdfCollection.insertOne(PdfData);
    return { message: "Created successfully" };
  },

  async updatePdf(pdfCollection: Collection<PdfType>, updatedPdf: PdfType, id: string): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await pdfCollection.findOne({ _id: objectId });

    const isSameFile = getOldData?.file?.filePath === updatedPdf.file?.filePath;

    if (!isSameFile) {
      if (getOldData?.file) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.file.filePath));
      }

      if (updatedPdf.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, updatedPdf.file.filePath), join(UPLOAD_DIR, updatedPdf.file.filePath));
      }
    }


    const result = await pdfCollection.updateOne({ _id: objectId }, { $set: { ...updatedPdf, updatedAt: new Date() } });
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", please try again");
    }

    return { message: "Updated successfully" };
  },

  async getPdf(pdfCollection: Collection<PdfType>) {
    return await pdfCollection.find().toArray();
  },

  async getActivePdf(pdfCollection: Collection<PdfType>) {
    return await pdfCollection.find({isActive:true}).toArray();
  },

  async deletePdfById(pdfCollection: Collection<PdfType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await pdfCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Pdf not found with id " + id + "please try again");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
