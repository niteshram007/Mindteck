import { Collection, ObjectId } from "mongodb";
import {join} from "path";
//
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import CustomError from "../../error";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { BodCategoryType, BodType } from "./bodSchemas";

const getBodSortPipeline = (filter: Record<string, unknown>) => [
  { $match: filter },
  {
    $addFields: {
      displayOrderSort: {
        $ifNull: ["$displayOrder", 999999],
      },
    },
  },
  {
    $sort: {
      displayOrderSort: 1,
      _id: 1,
    },
  },
  {
    $project: {
      displayOrderSort: 0,
    },
  },
];

export const bodService = {
  async createBod(bodCollection: Collection<BodType>, newDoc: BodType): Promise<{ message: string }> {
    if (newDoc.profileImage) {
      await moveFile(
       join(UPLOAD_TEMP_DIR, newDoc.profileImage.filePath),
       join(UPLOAD_DIR, newDoc.profileImage.filePath),
      );
    }

    if (newDoc.passportImage) {
      await moveFile(
       join(UPLOAD_TEMP_DIR, newDoc.passportImage.filePath),
       join(UPLOAD_DIR, newDoc.passportImage.filePath),
      );
    }

    const bodData = {
      ...newDoc,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await bodCollection.insertOne(bodData);
    return { message: "created successfully" };
  },

  async updateBod(bodCollection: Collection<BodType>, updatedDoc: BodType, id: string): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const oldBodDoc = await bodCollection.findOne({ _id: objectId });

    if (!oldBodDoc) {
      throw new CustomError("Not found with category " + id + ", please try again.");
    }

    const isSameProfileImg = oldBodDoc.profileImage?.filePath === updatedDoc.profileImage?.filePath;

    if (!isSameProfileImg) {
      if (oldBodDoc.profileImage) {
        await deleteFile(join(UPLOAD_DIR, oldBodDoc.profileImage.filePath));
      }

      if (updatedDoc.profileImage) {
        await moveFile(
         join(UPLOAD_TEMP_DIR, updatedDoc.profileImage.filePath),
         join(UPLOAD_DIR, updatedDoc.profileImage.filePath),
        );
      }
    }

    const isSamePassportImg = oldBodDoc.passportImage?.filePath === updatedDoc.passportImage?.filePath;

    if (!isSamePassportImg) {
      if (oldBodDoc.passportImage) {
        await deleteFile(join(UPLOAD_DIR, oldBodDoc.passportImage.filePath));
      }

      if (updatedDoc.passportImage) {
        await moveFile(
         join(UPLOAD_TEMP_DIR, updatedDoc.passportImage.filePath),
         join(UPLOAD_DIR, updatedDoc.passportImage.filePath),
        );
      }
    }

    const updateFields = {
      ...updatedDoc,
      updatedAt: new Date(),
    };

    const result = await bodCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Failed to update, please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getBodsByCategory(bodCollection: Collection<BodType>, category: BodCategoryType | undefined) {
    const filter = category ? { category: { $in: [category] } } : {};

    return await bodCollection.aggregate(getBodSortPipeline(filter)).toArray();
  },

  async getActiveBodsByCategory(bodCollection: Collection<BodType>, category: BodCategoryType | undefined) {
    const filter = category ? { category: { $in: [category] }, isActive: true } : { isActive: true };

    return await bodCollection.aggregate(getBodSortPipeline(filter)).toArray();
  },

  async getBodById(bodCollection: Collection<BodType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await bodCollection.findOne({ _id: objectId });

    if (!result) {
      throw new CustomError("Not found with category " + id + ", please try again.");
    }

    return result;
  },

  async deleteBodById(bodCollection: Collection<BodType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await bodCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Not found with category " + id + ", please try again.");
    }

    if (result.passportImage) {
      await deleteFile(join(UPLOAD_DIR, result.passportImage.filePath));
    }

    if (result.profileImage) {
      await deleteFile(join(UPLOAD_DIR, result.profileImage.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
