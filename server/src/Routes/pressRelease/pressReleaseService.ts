import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../error";
import { PressReleaseType } from "./pressReleaseSchemas";

export const pressReleaseService = {
  async createPressRelease(
    pressReleaseCollection: Collection<PressReleaseType>,
    data: PressReleaseType,
  ): Promise<{ message: string }> {
    const pressReleaseData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await pressReleaseCollection.insertOne(pressReleaseData);
    return { message: "created successfully" };
  },

  async updatePressRelease(
    pressReleaseCollection: Collection<PressReleaseType>,
    data: PressReleaseType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await pressReleaseCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Press Release not found with category " + id+", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getPressReleases(pressReleaseCollection: Collection<PressReleaseType>) {
    return await pressReleaseCollection.find().toArray();
  },

  async getPublishedPressRelease(pressReleaseCollection: Collection<PressReleaseType>) {
    const result = await pressReleaseCollection
      .aggregate([
        { $match: { status: "Published" } }, // Filter only published press releases
        {
          $group: {
            _id: "$publicationYear",
            pressReleases: { $push: "$$ROOT" }, // Group by year and collect docs
          },
        },
        { $sort: { _id: 1 } }, // Optional: Sort by year
      ])
      .toArray();

    // Convert _id to key in a record
    return result.reduce<Record<string, PressReleaseType[]>>((acc, { _id, pressReleases }) => {
      acc[_id.toString()] = pressReleases;
      return acc;
    }, {});
  },

  async deletePressReleaseById(pressRelease: Collection<PressReleaseType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await pressRelease.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Press Release not found with category " + id+", please try again.");
    }
    return { message: "Deleted successfully" };
  },

  async getPressReleaseById(pressRelease: Collection<PressReleaseType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await pressRelease.findOne({ _id: objectId });
    if (!result) {
      throw new CustomError("Press Release not found with category " + id+", please try again.");
    }
    return result;
  },

  async getPressReleaseByTitle(pressRelease: Collection<PressReleaseType>, title: string) {
    const result = await pressRelease.findOne({ title });
    if (!result) {
      throw new CustomError("Press Release not found with title " + title+", please try again.");
    }
    return result;
  },
};
