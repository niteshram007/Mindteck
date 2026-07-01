import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import CustomError from "../../error";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { PartnerAndAllianceType } from "./partnerAndAllianceSchemas";

export const partnerAndAllianceService = {
  async createPartnerAndAlliance(
    partnerAndAllianceCollection: Collection<PartnerAndAllianceType>,
    data: PartnerAndAllianceType,
  ): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const partnerAndAllianceData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await partnerAndAllianceCollection.insertOne(partnerAndAllianceData);
    return { message: "created successfully" };
  },

  async updatePartnerAndAlliance(
    partnerAndAllianceCollection: Collection<PartnerAndAllianceType>,
    data: PartnerAndAllianceType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await partnerAndAllianceCollection.findOne({ _id: objectId });

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

    const result = await partnerAndAllianceCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("PartnerAndAlliance not found with category " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getPartnerAndAlliances(partnerAndAllianceCollection: Collection<PartnerAndAllianceType>) {
    return await partnerAndAllianceCollection.find().toArray();
  },

  async getActivePartnerAndAlliances(partnerAndAllianceCollection: Collection<PartnerAndAllianceType>) {
    return await partnerAndAllianceCollection.find({ isActive: true }).toArray();
  },

  async deletePartnerAndAllianceById(partnerAndAlliance: Collection<PartnerAndAllianceType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await partnerAndAlliance.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("PartnerAndAlliance not found with category " + id + ", please try again.");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
