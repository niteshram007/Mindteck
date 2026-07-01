import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../error";
import { MainLocationType } from "./mainLocationSchemas";

export const mainLocationService = {
  async createMainLocation(
    mainLocationCollection: Collection<MainLocationType>,
    data: MainLocationType,
  ): Promise<{ message: string }> {
    const mainLocationData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await mainLocationCollection.insertOne(mainLocationData);
    return { message: "Created successfully" };
  },

  async updateMainLocation(
    mainLocationCollection: Collection<MainLocationType>,
    updatedMainLocation: MainLocationType,
    id: string,
  ): Promise<{ message: string }> {
    //   Update mainLocation in MongoDB
    const objectId = new ObjectId(id);
    const result = await mainLocationCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedMainLocation, updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      throw new CustomError("Main Location not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getMainLocations(mainLocationCollection: Collection<MainLocationType>) {
    return await mainLocationCollection.find().toArray();
  },

  async getActiveMainLocations(mainLocationCollection: Collection<MainLocationType>) {
    return await mainLocationCollection.find({isActive:true}).toArray();
  },

  async deleteMainLocationById(mainLocationCollection: Collection<MainLocationType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await mainLocationCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("MainLocation not found with id " + id + ", please try again.");
    }
    return { message: "Deleted successfully" };
  },
};
