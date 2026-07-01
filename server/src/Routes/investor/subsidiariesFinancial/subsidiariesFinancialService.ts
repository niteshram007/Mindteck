import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { SubsidiariesFinancialType, SubsidiariesFinancialUpdateType } from "./subsidiariesFinancialSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const subsidiariesFinancialService = {
  async createSubsidiariesFinancial(
    subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>,
    data: SubsidiariesFinancialType,
  ): Promise<{ message: string }> {
    const SubsidiariesFinancialData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const isExist = await subsidiariesFinancialCollection.findOne({ financialYear: data.financialYear });

    const isSameDoc = isExist?.subsidiaries.find((s) => data.subsidiaries.some((ds) => ds.subsidiary === s.subsidiary));
    if (isSameDoc) {
      throw new CustomError("Duplicate record, this " + isSameDoc.subsidiary + " already exists, please try again");
    }

    for (const sub of data.subsidiaries) {
      if (sub.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, sub.file.filePath), join(UPLOAD_DIR, sub.file.filePath));
      }
    }

    if (!isExist) {
      await subsidiariesFinancialCollection.insertOne(SubsidiariesFinancialData);
      return { message: "Created successfully" };
    } else {
      await subsidiariesFinancialCollection.updateOne(
        {
          financialYear: data.financialYear,
        },
        {
          $push: {
            subsidiaries: {
              $each: SubsidiariesFinancialData.subsidiaries,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateSubsidiariesFinancial(
    subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>,
    updatedSubsidiariesFinancial: SubsidiariesFinancialUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const getOldData = await subsidiariesFinancialCollection.findOne({ _id: objectId });
    if (!getOldData) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }
    const existingQuarter = getOldData.subsidiaries.find(
      (sub) => sub.id === updatedSubsidiariesFinancial.id,
    );
    if (!existingQuarter) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }

    const hasDuplicateName = getOldData.subsidiaries.some(
      (sub) =>
        sub.id !== updatedSubsidiariesFinancial.id &&
        String(sub.subsidiary || "").trim().toLowerCase() ===
          String(updatedSubsidiariesFinancial.subsidiary || "").trim().toLowerCase(),
    );
    if (hasDuplicateName) {
      throw new CustomError(
        `Duplicate record, this ${updatedSubsidiariesFinancial.subsidiary} already exists, please try again`,
      );
    }

    if (existingQuarter && existingQuarter?.file.filePath !== updatedSubsidiariesFinancial.file.filePath) {
      if (existingQuarter.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingQuarter.file.filePath));
      }
      if (updatedSubsidiariesFinancial.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedSubsidiariesFinancial.file.filePath),
          join(UPLOAD_DIR, updatedSubsidiariesFinancial.file.filePath),
        );
      }
    }
    const result = await subsidiariesFinancialCollection.updateOne(
      {
        _id: objectId,
        "subsidiaries.id": updatedSubsidiariesFinancial.id,
      },
      {
        $set: {
          "subsidiaries.$": updatedSubsidiariesFinancial,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }

    return { message: "Updated successfully" };
  },

  async getSubsidiariesFinancial(subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>) {
    return await subsidiariesFinancialCollection.find().toArray();
  },

  async getBySessionSubsidiariesFinancial(
    subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>,
    session: string | undefined,
  ) {
    const filter = session ? { isActive: true, financialYear: session } : { isActive: true };

    return await subsidiariesFinancialCollection.find(filter).toArray();
  },

  async getActiveSubsidiariesFinancial(subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>) {
    return await subsidiariesFinancialCollection.find({ isActive: true }).toArray();
  },

  async deleteSubsidiariesFinancialById(
    subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>,
    id: string,
  ) {
    const objectId = new ObjectId(id);
    const result = await subsidiariesFinancialCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Not found with id " + id + ", please try again");
    }
    for (const subsidiary of result.subsidiaries) {
      if (subsidiary.file) {
        await deleteFile(join(UPLOAD_DIR, subsidiary.file.filePath));
      }
    }
    return { message: "Deleted successfully" };
  },

  async deleteItemSubsidiariesFinancialById(
    subsidiariesFinancialCollection: Collection<SubsidiariesFinancialType>,
    objectId: string,
    subsidiaryId: string,
  ) {
    const result = await subsidiariesFinancialCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { subsidiaries: { id: subsidiaryId } } },
    );

    if (!result) {
      throw new CustomError("No document was updated. Check if the IDs are correct.");
    }

    const subsidiary = result.subsidiaries.find((s) => s.id === subsidiaryId);
    if (subsidiary?.file) {
      await deleteFile(join(UPLOAD_DIR, subsidiary.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
