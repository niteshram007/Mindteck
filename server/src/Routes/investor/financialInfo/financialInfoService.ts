import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { FinancialInfoType, FinancialInfoUpdateType } from "./financialInfoSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const financialInfoService = {
  async createFinancialInfo(
    financialInfoCollection: Collection<FinancialInfoType>,
    data: FinancialInfoType,
  ): Promise<{ message: string }> {
    const financialInfoData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const isExist = await financialInfoCollection.findOne({
      $and: [{ financialYear: data.financialYear }, { quarter: data.quarter }],
    });

    const isSameDoc = isExist?.sections.find((s) => data.sections.some((ds) => ds.title === s.title));
    if (isSameDoc) {
      throw new CustomError("Duplicate record, this " + isSameDoc.title + " already exists, please try again.");
    }

    for (const section of data.sections) {
      if (section.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, section.file.filePath), join(UPLOAD_DIR, section.file.filePath));
      }
    }

    if (!isExist) {
      await financialInfoCollection.insertOne(financialInfoData);
      return { message: "Created successfully" };
    } else {
      await financialInfoCollection.updateOne(
        {
          $and: [{ financialYear: data.financialYear }, { quarter: data.quarter }],
        },
        {
          $push: {
            sections: {
              $each: financialInfoData.sections,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateFinancialInfo(
    financialInfoCollection: Collection<FinancialInfoType>,
    updatedFinancialInfo: FinancialInfoUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const oldFinancialInfo = await financialInfoCollection.findOne({ _id: objectId });

    if (!oldFinancialInfo) {
      throw new CustomError("No Financial Info found, please try again.");
    }

    const existingFI = oldFinancialInfo.sections.find((q) => q.id === updatedFinancialInfo.id);

    // UPDATED Files
    if (existingFI && existingFI.file.filePath !== updatedFinancialInfo.file.filePath) {
      if (existingFI.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingFI.file.filePath));
      }

      if (updatedFinancialInfo.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedFinancialInfo.file.filePath),
          join(UPLOAD_DIR, updatedFinancialInfo.file.filePath),
        );
      }
    }

    const result = await financialInfoCollection.updateOne(
      {
        _id: objectId,
        "sections.id": updatedFinancialInfo.id,
      },
      {
        $set: {
          "sections.$": updatedFinancialInfo,
          updatedAt: new Date(),
        },
      },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getFinancialInfos(financialInfoCollection: Collection<FinancialInfoType>) {
    return await financialInfoCollection.find().toArray();
  },

  async getBySession(financialInfoCollection: Collection<FinancialInfoType>, financialYear: string | undefined) {
    const filter = financialYear ? { financialYear } : {};
    return await financialInfoCollection.find(filter).toArray();
  },

  async deleteFinancialInfoById(financialInfoCollection: Collection<FinancialInfoType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await financialInfoCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Financial Info not found with id " + id + ", please try again.");
    }
    for (const section of result.sections) {
      if (section?.file) {
        await deleteFile(join(UPLOAD_DIR, section.file.filePath));
      }
    }

    return { message: "Deleted successfully" };
  },

  async deleteItemFinancialInfoById(
    financialInfoCollection: Collection<FinancialInfoType>,
    objectId: string,
    id: string,
  ) {
    const result = await financialInfoCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { sections: { id } } },
      {returnDocument:"before"}
    );

    const section = result?.sections.find((s) => s.id === id);
    if (!section) {
      throw new CustomError("No document was updated. Check if the IDs are correct and try again");
    }
    if (section.file) {
      await deleteFile(join(UPLOAD_DIR, section.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
