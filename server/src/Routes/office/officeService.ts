import { Collection, ObjectId } from "mongodb";
import { join } from "path";
//
import CustomError from "../../error";
import { OfficeType } from "./officeSchemas";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import { CollectionName } from "../../constants/collection";
import { deleteFile, moveFile } from "../../utils/fileHandler";

export const officeService = {
  async createOffice(officeCOllection: Collection<OfficeType>, data: OfficeType): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const officeData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await officeCOllection.insertOne(officeData);
    return { message: "created successfully" };
  },

  async updateOffice(
    officeCollection: Collection<OfficeType>,
    data: OfficeType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await officeCollection.findOne({ _id: objectId });

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

    const result = await officeCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Office not found with category " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getOffices(officeCollection: Collection<OfficeType>) {
    return await officeCollection
      .aggregate([
        {
          $lookup: {
            from: CollectionName.main_location,
            localField: "mainLocationId",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      .toArray();
  },

  async getOfficesByMainLocation(officeCollection: Collection<OfficeType>, locationId: string) {
    const officeId = new ObjectId(locationId);

    const allOffices = await officeCollection
      .aggregate([
        {
          $match: { mainLocationId: officeId },
        },
        {
          $lookup: {
            from: CollectionName.main_location,
            localField: "mainLocationId",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      .toArray();
    if (!allOffices.length) {
      throw new CustomError("Office not found with id " + locationId + ", please try again.");
    }

    return allOffices;
  },

  async getActiveOfficesByMainLocation(officeCollection: Collection<OfficeType>, locationId: string) {
    const officeId = new ObjectId(locationId);

    const allOffices = await officeCollection
      .aggregate([
        {
          $match: { mainLocationId: officeId, isActive: true },
        },
        {
          $lookup: {
            from: CollectionName.main_location,
            localField: "mainLocationId",
            foreignField: "_id",
            as: "location",
          },
        },
      ])
      .toArray();
    if (!allOffices.length) {
      throw new CustomError("Office not found with id " + locationId + ", please try again.");
    }

    return allOffices;
  },

  async deleteOfficeById(officeCollection: Collection<OfficeType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await officeCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Office not found with category " + id + ", please try again.");
    }

    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
