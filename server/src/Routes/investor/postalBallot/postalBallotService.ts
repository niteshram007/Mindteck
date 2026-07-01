import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { PostalBallotType, PostalBallotUpdateType } from "./postalBallotSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

export const postalBallotService = {
  async createPostalBallot(
    postalBallotCollection: Collection<PostalBallotType>,
    data: PostalBallotType,
  ): Promise<{ message: string }> {
    for (const quarter of data.postals) {
      if (quarter.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, quarter.file.filePath), join(UPLOAD_DIR, quarter.file.filePath));
      }
    }

    const PostalBallotData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const isExist = await postalBallotCollection.findOne({ financialYear: data.financialYear });

    if (!isExist) {
      await postalBallotCollection.insertOne(PostalBallotData);
      return { message: "Created successfully" };
    } else {
      await postalBallotCollection.updateOne(
        {
          financialYear: data.financialYear,
        },
        {
          $push: {
            postals: {
              $each: PostalBallotData.postals,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updatePostalBallot(
    postalBallotCollection: Collection<PostalBallotType>,
    updatedPostalBallot: PostalBallotUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const getOldData = await postalBallotCollection.findOne({ _id: objectId });
    if (!getOldData) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }
    const existingQuarter = getOldData.postals.find((postal) => postal.id === updatedPostalBallot.id);

    if (existingQuarter && existingQuarter?.file.filePath !== updatedPostalBallot.file.filePath) {
      if (existingQuarter.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingQuarter.file.filePath));
      }
      if (updatedPostalBallot.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedPostalBallot.file.filePath),
          join(UPLOAD_DIR, updatedPostalBallot.file.filePath),
        );
      }
    }

    const result = await postalBallotCollection.updateOne(
      {
        _id: objectId, // Match the document by _id
        "postals.id": updatedPostalBallot.id,
      },
      {
        $set: {
          "postals.$": updatedPostalBallot,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      throw new CustomError(`Not found with id ${id} , please try again`);
    }

    return { message: "Updated successfully" };
  },

  async getPostalBallot(postalBallotCollection: Collection<PostalBallotType>) {
    return await postalBallotCollection.find().toArray();
  },

  async getActivePostalBallot(postalBallotCollection: Collection<PostalBallotType>) {
    return await postalBallotCollection.find({ isActive: true }).toArray();
  },

  async deletePostalBallotById(postalBallotCollection: Collection<PostalBallotType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await postalBallotCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Not found with id " + id + ", please try again");
    }
    for (const postal of result.postals) {
      if (postal?.file) {
        await deleteFile(join(UPLOAD_DIR, postal.file.filePath));
      }
    }
    return { message: "Deleted successfully" };
  },

  async deleteItemPostalBallotById(postalBallotCollection: Collection<PostalBallotType>, objectId: string, id: string) {
    const result = await postalBallotCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { postals: { id } } },
      {returnDocument:"before"}
    );

    const postal = result?.postals.find((p) => p.id === id);
    if (!postal) {
      throw new CustomError("No document was updated check if the IDs are correct and try again");
    }
    if (postal.file) {
      await deleteFile(join(UPLOAD_DIR, postal.file.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
