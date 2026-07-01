import { Collection,  ObjectId } from "mongodb";
import { join } from "path";
//
import {
  ApplicationCreateType,
  ApplicationQueryType,
  ApplicationStatusType,
  ApplicationType,
} from "./applicationSchemas";
import CustomError from "../../../error";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";
import { reCAPTCHA } from "../../../utils/service";

export const applicationService = {
  async createApplication(
    applicationCollection: Collection<ApplicationType>,
    newData: ApplicationCreateType,
  ): Promise<{ message: string }> {
    const { token, ...data } = newData;

    const googleCaptchaData = await reCAPTCHA(token);

    if (!googleCaptchaData.success || googleCaptchaData.score < 0.8) {
      throw new CustomError("reCAPTCHA verification  please try again.");
    }

    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const ApplicationData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await applicationCollection.insertOne(ApplicationData);
    return { message: "created successfully" };
  },

  async updateApplication(
    applicationCollection: Collection<ApplicationType>,
    data: ApplicationType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await applicationCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Application not found with id " + id + ",  please try again.");
    }

    return { message: "Updated successfully" };
  },

  async updateStatusApplication(
    applicationCollection: Collection<ApplicationStatusType>,
    data: ApplicationStatusType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const updateFields = {
      applicationStatus: data.applicationStatus,
      remarks: data.remarks,
      interviewDate: data.interviewDate,
      updatedAt: new Date(),
    };

    const result = await applicationCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Application not found with id " + id + ",  please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getApplications(
    applicationCollection: Collection<ApplicationType>,
    page: number,
    pageSize: number,
    searchTerm: string | undefined,
  ) {
    const skip = (page - 1) * pageSize;

    const searchQuery = searchTerm
      ? {
          $or: [
            { firstName: { $regex: searchTerm, $options: "i" } },
            { lastName: { $regex: searchTerm, $options: "i" } },
            { gender: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { mobileNo: { $regex: searchTerm, $options: "i" } },
            { skillsSet: { $regex: searchTerm, $options: "i" } },
            { applicationStatus: { $regex: searchTerm, $options: "i" } },
            { "employmentDetailsSchema.salary": { $regex: searchTerm, $options: "i" } },
            { "employmentDetailsSchema.expectedCtc": { $regex: searchTerm, $options: "i" } },
            { "employmentDetailsSchema.totalExperience": { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      applicationCollection.find(searchQuery).skip(skip).limit(pageSize).toArray(),
      applicationCollection.countDocuments(),
    ]);

    return { data, total, page, pageSize };
  },

  async getApplicationsFiltered(
    applicationCollection: Collection<ApplicationType>,
    filterOption: ApplicationQueryType,
  ) {
    const mongoQuery: any = {};

    if (filterOption.jobId) mongoQuery.jobId = new ObjectId(filterOption.jobId);
    if (filterOption.firstName) mongoQuery.firstName = { $regex: filterOption.firstName, $options: "i" };
    if (filterOption.lastName) mongoQuery.lastName = { $regex: filterOption.lastName, $options: "i" };
    if (filterOption.dateOfBirth) mongoQuery.dateOfBirth = new Date(filterOption.dateOfBirth);
    if (filterOption.gender) mongoQuery.gender = filterOption.gender;
    if (filterOption.email) mongoQuery.email = { $regex: filterOption.email, $options: "i" };
    if (filterOption.mobileNo) mongoQuery.mobileNo = filterOption.mobileNo;
    if (filterOption.skillsSet) mongoQuery.skillsSet = { $regex: filterOption.skillsSet, $options: "i" };
    if (filterOption.applicationStatus) mongoQuery.applicationStatus = filterOption.applicationStatus;

    if (filterOption.salaryMin && filterOption.salaryMax) {
      mongoQuery["employmentDetails.salary"] = { $gte: filterOption.salaryMin, $lte: filterOption.salaryMax };
    }

    if (filterOption.expectedCtcMin && filterOption.expectedCtcMax) {
      mongoQuery["employmentDetails.expectedCtc"] = {
        $gte: filterOption.expectedCtcMin,
        $lte: filterOption.expectedCtcMax,
      };
    }

    if (filterOption.totalExperienceMin && filterOption.totalExperienceMax) {
      mongoQuery["employmentDetails.totalExperience"] = {
        $gte: filterOption.totalExperienceMin,
        $lte: filterOption.totalExperienceMax,
      };
    }

    const startIndex = (filterOption.page - 1) * filterOption.pageSize;
    const limit = filterOption.pageSize;

    const [data, total] = await Promise.all([
      applicationCollection.find(mongoQuery).skip(startIndex).limit(limit).toArray(),
      applicationCollection.countDocuments(mongoQuery),
    ]);

    return { data, total, page: filterOption.page, pageSize: filterOption.pageSize };
  },

  async getApplicationsByJobId(
    applicationCollection: Collection<ApplicationType>,
    id: string,
    page: number,
    pageSize: number,
  ) {
    const skip = (page - 1) * pageSize;
    const jobId = new ObjectId(id);
    const [data, total] = await Promise.all([
      applicationCollection.find({ jobId }).skip(skip).limit(pageSize).toArray(),
      applicationCollection.countDocuments({ jobId }),
    ]);
    return { data, total, page, pageSize };
  },

  async deleteApplicationById(applicationCollection: Collection<ApplicationType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await applicationCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Application not found with category " + id);
    }
    return { message: "Deleted successfully" };
  },

  async deleteBulkApplication(applicationCollection: Collection<ApplicationType>, ids: string[]) {
    const idsToDelete = ids.map((id) => new ObjectId(id));
    const query = { _id: { $in: idsToDelete } };

    const applications = await applicationCollection.find(query).toArray();
    const result = await applicationCollection.deleteMany(query);

    if (result.deletedCount === 0) {
      throw new CustomError("failed to delete applications, please try again");
    }

    for (const doc of applications) {
      if (doc.file) {
        await deleteFile(join(UPLOAD_DIR, doc.file.filePath));
      }
    }
    return { message: "Deleted successfully" };
  },
};
