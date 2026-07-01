import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../error";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { CaseStudyType } from "./caseStudySchemas";

const normalizeCategories = (categories: string[] = []) =>
  (Array.isArray(categories) ? categories : []).filter(Boolean);

export const caseStudyService = {
  async createCaseStudy(caseStudy: Collection<CaseStudyType>, data: CaseStudyType): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }
    const caseStudyData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await caseStudy.insertOne(caseStudyData);
    return { message: "created successfully" };
  },

  async updateCaseStudy(
    caseStudy: Collection<CaseStudyType>,
    data: CaseStudyType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await caseStudy.findOne({ _id: objectId });
    const isSameFile = getOldData?.file?.filePath === data.file?.filePath;

    if (!isSameFile) {
      if (getOldData?.file) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.file.filePath));
      }

      if (data.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
      }
    }

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await caseStudy.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Case Studies not found with category " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getCaseStudies(caseStudy: Collection<CaseStudyType>) {
    return await caseStudy.find().toArray();
  },

  async getCaseStudyById(caseStudy: Collection<CaseStudyType>, id: string) {
    return await caseStudy.findOne({ _id: new ObjectId(id) });
  },

  async getCaseStudyByTitle(caseStudy: Collection<CaseStudyType>, title: string) {
    return await caseStudy.findOne({ title: title });
  },

  async getActiveCaseStudyByTitle(caseStudy: Collection<CaseStudyType>, title: string) {
    return await caseStudy.findOne({ title: title, isActive: true });
  },

  async getCaseStudiesByCategories(caseStudy: Collection<CaseStudyType>, categories: string[]) {
    const normalizedCategories = normalizeCategories(categories);

    if (normalizedCategories.length > 0) {
      return await caseStudy.find({ category: { $in: normalizedCategories } }).toArray();
    }
    return await caseStudy.find().toArray();
  },

  async getActiveCaseStudiesByCategories(caseStudy: Collection<CaseStudyType>, categories: string[]) {
    const normalizedCategories = normalizeCategories(categories);

    if (normalizedCategories.length > 0) {
      return await caseStudy.find({ category: { $in: normalizedCategories }, isActive: true }).toArray();
    }
    return await caseStudy.find({ isActive: true }).toArray();
  },

  async deleteCaseStudyById(caseStudy: Collection<CaseStudyType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await caseStudy.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Case Studies not found with category " + id + " please try again.");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
