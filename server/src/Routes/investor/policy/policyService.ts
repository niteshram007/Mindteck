import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { PolicyType } from "./policySchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const policyService = {
  async createPolicy(policyCollection: Collection<PolicyType>, data: PolicyType): Promise<{ message: string }> {
    const policyData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    if (data.image) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.image.filePath), join(UPLOAD_DIR, data.image.filePath));
    }

    await policyCollection.insertOne(policyData);
    return { message: "Created successfully" };
  },

  async updatePolicy(
    policyCollection: Collection<PolicyType>,
    updatedPolicy: PolicyType,
    id: string,
  ): Promise<{ message: string }> {
    //   Update policy in MongoDB
    const objectId = new ObjectId(id);
    const getOldData = await policyCollection.findOne({ _id: objectId });

    const isSameFile = getOldData?.file?.filePath === updatedPolicy.file?.filePath;
    const isSameImage = getOldData?.image?.filePath === updatedPolicy.image?.filePath;

    if (!isSameFile) {
      if (getOldData?.file) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.file.filePath));
      }

      if (updatedPolicy.file) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedPolicy.file.filePath),
          join(UPLOAD_DIR, updatedPolicy.file.filePath),
        );
      }
    }

    if (!isSameImage) {
      if (getOldData?.image) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.image.filePath));
      }

      if (updatedPolicy.image) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedPolicy.image.filePath),
          join(UPLOAD_DIR, updatedPolicy.image.filePath),
        );
      }
    }

    const result = await policyCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedPolicy, updatedAt: new Date() } },
    );

    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + " please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getPolicies(policyCollection: Collection<PolicyType>) {
    return await policyCollection.find().toArray();
  },

  async getActivePolicies(policyCollection: Collection<PolicyType>) {
    return await policyCollection.find({ isActive: true }).toArray();
  },

  async deletePolicyById(policyCollection: Collection<PolicyType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await policyCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Policy not found with id " + id + ", please try again");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }

    if (result.image) {
      await deleteFile(join(UPLOAD_DIR, result.image.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
