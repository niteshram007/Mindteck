import { Collection, ObjectId } from "mongodb";
import CustomError from "../../error";
import { ResourceCategoryType } from "./resourceCategorySchemas";

export const resourceCategoryService = {
  async createResourceCategory(
    resourceCategoryCollection: Collection<ResourceCategoryType>,
    data: ResourceCategoryType,
  ): Promise<{ message: string }> {
    const resourceCategoryData = {
      ...data,
      subTitle: data.subTitle ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await resourceCategoryCollection.insertOne(resourceCategoryData);
    return { message: "created successfully" };
  },

  async updateResourceCategory(
    resourceCategoryCollection: Collection<ResourceCategoryType>,
    data: ResourceCategoryType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      ...data,
      subTitle: data.subTitle ?? "",
      updatedAt: new Date(),
    };

    const result = await resourceCategoryCollection.updateOne(
      { _id: objectId },
      { $set: updateFields },
    );

    if (!result.matchedCount) {
      throw new CustomError(
        "Resource Category not found with id " + id + ", please try again.",
      );
    }

    return { message: "Updated successfully" };
  },

  async getResourceCategories(
    resourceCategoryCollection: Collection<ResourceCategoryType>,
  ) {
    return await resourceCategoryCollection
      .find()
      .sort({ order: 1, title: 1 })
      .toArray();
  },

  async getActiveResourceCategories(
    resourceCategoryCollection: Collection<ResourceCategoryType>,
  ) {
    return await resourceCategoryCollection
      .find({ isActive: true })
      .sort({ order: 1, title: 1 })
      .toArray();
  },

  async deleteResourceCategoryById(
    resourceCategoryCollection: Collection<ResourceCategoryType>,
    id: string,
  ) {
    const objectId = new ObjectId(id);

    const result = await resourceCategoryCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError(
        "Resource Category not found with id " + id + ", please try again.",
      );
    }
    return { message: "Deleted successfully" };
  },
};
