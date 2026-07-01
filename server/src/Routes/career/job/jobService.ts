import { Collection, ObjectId } from "mongodb";
//
import { jobReviewStatusType, JobStatusType, JobType, jobTypeType, JobUpdateType } from "./jobSchemas";
import CustomError from "../../../error";
import { CollectionName } from "../../../constants/collection";
const mapMinExp = {
  3: 1,
  6: 4,
  10: 7,
  15: 10,
} as const;

export const jobService = {
  async createJob(jobCollection: Collection<JobType>, userId: string, data: JobType): Promise<{ message: string }> {
    const JobData = {
      ...data,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await jobCollection.insertOne(JobData);
    return { message: "created successfully" };
  },

  async updateJob(jobCollection: Collection<JobType>, data: JobUpdateType, id: string): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await jobCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Job not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getJobs(
    jobCollection: Collection<JobType>,
    page: number,
    pageSize: number,
    id: string | undefined,
    reviewStatus: string | undefined,
    searchTerm: string | undefined,
  ) {
    const skip = (page - 1) * pageSize;

    const filter = {
      ...(id && { categoryId: new ObjectId(id) }),
      ...(reviewStatus && { reviewStatus }),
    };

    const searchQuery = searchTerm
      ? {
          $or: [
            { jobType: { $regex: searchTerm, $options: "i" } },
            { experience: { $regex: searchTerm, $options: "i" } },
            { city: { $regex: searchTerm, $options: "i" } },
            { country: { $regex: searchTerm, $options: "i" } },
            { mobileNo: { $regex: searchTerm, $options: "i" } },
            { status: { $regex: searchTerm, $options: "i" } },
            { reviewStatus: { $regex: searchTerm, $options: "i" } },
            { reviewedBy: { $regex: searchTerm, $options: "i" } },
            { createdBy: { $regex: searchTerm, $options: "i" } },
            { jobCode: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const result = await jobCollection
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: CollectionName.user,
            localField: "userId",
            foreignField: "_id",
            as: "createdBy",
          },
        },
        {
          $lookup: {
            from: CollectionName.user,
            localField: "reviewedBy",
            foreignField: "_id",
            as: "reviewedBy",
          },
        },
        {
          $lookup: {
            from: CollectionName.jobCategory,
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $addFields: {
            category: { $arrayElemAt: ["$category.name", 0] },
            categoryId: { $arrayElemAt: ["$category._id", 0] },
            createdBy: { $arrayElemAt: ["$createdBy.fullName", 0] },
            reviewedBy: { $arrayElemAt: ["$reviewedBy.fullName", 0] },
          },
        },
        { $match: searchQuery },
        {
          $sort: { _id: -1 },
        },
        {
          $project: {
            _id: 1,
            category: 1,
            categoryId: 1,
            createdBy: 1,
            reviewedBy: 1,
            reviewStatus: 1,
            review: 1,
            status: 1,
            title: 1,
            experience: 1,
            qualifications: 1,
            skills: 1,
            responsibilities: 1,
            jobDescription: 1,
            country: 1,
            city: 1,
            jobType: 1,
            isRemote: 1,
          },
        },
        {
          $facet: {
            totalCount: [{ $count: "count" }],
            results: [{ $skip: skip }, { $limit: pageSize }],
          },
        },
      ])
      .toArray(); // ✅ removed .sort() after .aggregate()

    const total = result[0]?.totalCount?.[0]?.count ?? 0;
    const data = result[0]?.results || [];

    return { data, total, page, pageSize };
  },

  async getJobActiveJobs(
    jobCollection: Collection<JobType>,
    page: number,
    pageSize: number,
    categoryId: string | undefined,
    jobType: jobTypeType[] | undefined,
    experience: number | undefined,
    city: string | undefined,
    keyword: string | undefined,
  ) {
    const skip = (page - 1) * pageSize;
    const filter = {
      status: "Active",
      reviewStatus: "Approved",
      ...(categoryId && { categoryId: new ObjectId(categoryId) }),
      ...(city && { city }),
      ...(keyword && {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { qualifications: { $regex: keyword, $options: "i" } },
          { responsibilities: { $regex: keyword, $options: "i" } },
          { skills: { $regex: keyword, $options: "i" } },
        ],
      }),
      ...(jobType && jobType.length > 0 && { jobType: { $in: jobType } }),
      ...(experience && {
        experience: {
          $gte: mapMinExp[experience] || 1,
          $lte: experience,
        },
      }),
    };
    const result = await jobCollection
      .aggregate([
        { $match: filter },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            experience: 1,
            qualifications: 1,
            skills: 1,
            responsibilities: 1,
            country: 1,
            city: 1,
            jobType: 1,
            isRemote: 1,
          },
        },
        {
          $facet: {
            totalCount: [{ $count: "count" }], // Count the total number of matching documents
            results: [
              { $skip: skip }, // Skip documents based on the current page
              { $limit: pageSize }, // Limit to the number of documents per page
            ],
          },
        },
      ])
      .toArray();

    const total = result[0]?.totalCount?.[0]?.count ?? 0;
    const data = result[0]?.results || [];

    return { data, total, page, pageSize };
  },

  async getJobsWithApplicationCount(jobCollection: Collection<JobType>) {
    return await jobCollection
      .aggregate([
        {
          $lookup: {
            from: CollectionName.application,
            localField: "_id",
            foreignField: "jobId",
            as: "application",
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            title: 1,
            country: 1,
            responsibilities: 1,
            skills: 1,
            city: 1,
            jobType: 1,
            qualifications: 1,
            experience: 1,
            category: 1,
            review: 1,
            reviewStatus: 1,
            reviewedBy: 1,
            jobDescription: 1,
            applicationCount: {
              $size: { $ifNull: ["$application", []] },
            },
          },
        },
      ])
      .sort({ _id: -1 })
      .toArray();
  },

  async getJobsByUserIdWithApplicationCount(
    jobCollection: Collection<JobType>,
    id: string,
    categoryId: string | undefined,
  ) {
    const userId = new ObjectId(id);
    const filter: any = { userId };

    if (categoryId) {
      filter.categoryId = new ObjectId(categoryId);
    }
    return await jobCollection
      .aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: CollectionName.application,
            localField: "_id",
            foreignField: "jobId",
            as: "application",
          },
        },
        {
          $lookup: {
            from: CollectionName.jobCategory,
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: CollectionName.user,
            localField: "reviewedBy",
            foreignField: "_id",
            as: "reviewedBy",
          },
        },
        {
          $addFields: {
            category: { $arrayElemAt: ["$category.name", 0] },
            categoryId: { $arrayElemAt: ["$category._id", 0] },
            reviewedBy: { $arrayElemAt: ["$reviewedBy.fullName", 0] },
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            title: 1,
            country: 1,
            responsibilities: 1,
            skills: 1,
            city: 1,
            jobType: 1,
            qualifications: 1,
            experience: 1,
            category: 1,
            categoryId: 1,
            review: 1,
            reviewStatus: 1,
            reviewedBy: 1,
            jobDescription: 1,
            applicationCount: {
              $size: { $ifNull: ["$application", []] },
            },
          },
        },
      ])
      .toArray();
  },

  async getJobById(jobCollection: Collection<JobType>, id: string) {
    const objectId = new ObjectId(id);

    const jobObj = await jobCollection.findOne({ _id: objectId });

    if (!jobObj) {
      throw new CustomError("Job not found with id " + id + ",  please try again.");
    }

    return jobObj;
  },

  async getJobByJobCode(jobCollection: Collection<JobType>, code: string) {
    const jobObj = await jobCollection.findOne({ jobCode: code });

    if (!jobObj) {
      throw new CustomError("Job not found with code " + code + ",  please try again.");
    }

    return jobObj;
  },

  async getUniqueCities(jobCollection: Collection<JobType>) {
    return await jobCollection.distinct("city");
  },

  async deleteJobById(jobCollection: Collection<JobType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await jobCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Job not found with category " + id + ",  please try again.");
    }
    return { message: "Deleted successfully" };
  },

  async changeJobStatusById(jobCollection: Collection<JobType>, id: string, status: JobStatusType) {
    const objectId = new ObjectId(id);

    const ack = await jobCollection.updateOne({ _id: objectId }, { $set: { status, updatedAt: new Date() } });

    if (!ack.matchedCount) {
      throw new CustomError("Job not found with Id " + id + ",  please try again.");
    }

    return { message: "Updated status successfully" };
  },

  async updateReviewStatus(jobCollection: Collection<JobType>, id: string, userId: string, body: jobReviewStatusType) {
    const objectId = new ObjectId(id);
    const reviewedBy = new ObjectId(userId);

    const ack = await jobCollection.updateOne(
      { _id: objectId },
      { $set: { ...body, reviewedBy, updatedAt: new Date() } },
    );

    if (!ack.matchedCount) {
      throw new CustomError("Job not found with Id " + id + ",  please try again.");
    }

    return { message: "Updated status successfully" };
  },
};
