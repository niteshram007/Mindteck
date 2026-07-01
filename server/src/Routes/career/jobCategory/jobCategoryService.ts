import { Collection, ObjectId } from "mongodb";
//
import { JobCategoryType } from "./jobCategorySchemas";
import CustomError from "../../../error";

export const jobCategoryService = {
  async createJobCategory(
    jobCategoryCollection: Collection<JobCategoryType>,
    data: JobCategoryType,
  ): Promise<{ message: string }> {
    const jobCategoryData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await jobCategoryCollection.insertOne(jobCategoryData);
    return { message: "created successfully" };
  },

  async updateJobCategory(
    jobCategoryCollection: Collection<JobCategoryType>,
    data: JobCategoryType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await jobCategoryCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Job Category not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getJobCategories(jobCategoryCollection: Collection<JobCategoryType>) {
    return await jobCategoryCollection.find().toArray();
  },

  async deleteJobCategoryById(jobCategoryCollection: Collection<JobCategoryType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await jobCategoryCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Job Category not found with category " + id+ ", please try again.");
    }
    return { message: "Deleted successfully" };
  },
};
