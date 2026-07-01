import { Collection, ObjectId } from "mongodb";
import { existsSync } from "node:fs";
import { join } from "node:path";
//
import CustomError from "../../../error";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { AnnualReportType, AnnualReportUpdateType } from "./annualReportSchemas";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

const normalizeAnnualReportFilePath = (filePath = "") => {
  const value = String(filePath || "").trim();
  if (!value) return "";
  if (value.includes("/")) return value;
  return `investor_annual_report/${value}`;
};

const normalizeSection = (section: AnnualReportType["sections"][number]) => {
  const normalizedPath = normalizeAnnualReportFilePath(section?.file?.filePath);
  return {
    ...section,
    file: {
      ...section.file,
      filePath: normalizedPath,
    },
  };
};

const doesUploadedFileExist = (filePath = "") => {
  const normalizedPath = normalizeAnnualReportFilePath(filePath);
  if (!normalizedPath) {
    return false;
  }
  return existsSync(join(UPLOAD_DIR, normalizedPath));
};

const sanitizeSections = (sections: AnnualReportType["sections"] = []) =>
  sections
    .map((section) => normalizeSection(section))
    .filter((section) => doesUploadedFileExist(section?.file?.filePath));

export const annualReportService = {
  async createAnnualReport(
    annualReportCollection: Collection<AnnualReportType>,
    data: AnnualReportType,
  ): Promise<{ message: string }> {
    for (const section of data.sections) {
      const filePath = normalizeAnnualReportFilePath(section?.file?.filePath);
      if (section.file && filePath) {
        await moveFile(join(UPLOAD_TEMP_DIR, filePath), join(UPLOAD_DIR, filePath));
        section.file.filePath = filePath;
      }
    }

    const annualReportData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const isExist = await annualReportCollection.findOne({ financialYear: data.financialYear });

    if (!isExist) {
      await annualReportCollection.insertOne(annualReportData);
      return { message: "Created successfully" };
    } else {
      await annualReportCollection.updateOne(
        {
          financialYear: data.financialYear,
        },
        {
          $push: {
            sections: {
              $each: annualReportData.sections,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateAnnualReport(
    annualReportCollection: Collection<AnnualReportType>,
    updatedAnnualReport: AnnualReportUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const oldAnnualReport = await annualReportCollection.findOne({ _id: objectId });

    if (!oldAnnualReport) {
      throw new CustomError("No Financial Info Found, please try again.");
    }

    const existingFI = oldAnnualReport.sections.find((s) => s.id === updatedAnnualReport.id);

    // UPDATED Files
    const existingFilePath = normalizeAnnualReportFilePath(existingFI?.file?.filePath);
    const updatedFilePath = normalizeAnnualReportFilePath(updatedAnnualReport?.file?.filePath);

    if (existingFI && existingFilePath !== updatedFilePath) {
      if (existingFilePath) {
        await deleteFile(join(UPLOAD_DIR, existingFilePath));
      }

      if (updatedFilePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedFilePath),
          join(UPLOAD_DIR, updatedFilePath),
        );
      }
    }

    const normalizedUpdatedAnnualReport = {
      ...updatedAnnualReport,
      file: {
        ...updatedAnnualReport.file,
        filePath: updatedFilePath,
      },
    };

    const result = await annualReportCollection.updateOne(
      {
        _id: objectId,
        "sections.id": updatedAnnualReport.id,
      },
      {
        $set: {
          "sections.$": normalizedUpdatedAnnualReport,
          updatedAt: new Date(),
        },
      },
    );
    if (!result.matchedCount) {
      throw new CustomError("Not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getAnnualReports(annualReportCollection: Collection<AnnualReportType>) {
    const result = await annualReportCollection.find().toArray();
    const sanitizedResult = result
      .map((item) => ({
        ...item,
        sections: sanitizeSections(item.sections),
      }))
      .filter((item) => (item.sections || []).length > 0);

    return sanitizedResult.sort((a, b) => {
      const yearA = parseInt(a.financialYear.split("-")[0], 10);
      const yearB = parseInt(b.financialYear.split("-")[0], 10);

      return yearB - yearA;
    });
  },

  async getBySession(annualReportCollection: Collection<AnnualReportType>, financialYear: string | undefined) {
    const filter = financialYear ? { financialYear } : {};
    const result = await annualReportCollection.find(filter).toArray();
    return result
      .map((item) => ({
        ...item,
        sections: sanitizeSections(item.sections),
      }))
      .filter((item) => (item.sections || []).length > 0);
  },

  async deleteAnnualReportById(annualReportCollection: Collection<AnnualReportType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await annualReportCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Annual Report not found with id " + id + ", please try again.");
    }
    for (const section of result.sections) {
      const filePath = normalizeAnnualReportFilePath(section?.file?.filePath);
      if (section?.file && filePath) {
        await deleteFile(join(UPLOAD_DIR, filePath));
      }
    }
    return { message: "Deleted successfully" };
  },

  async deleteItemAnnualReportById(annualReportCollection: Collection<AnnualReportType>, objectId: string, id: string) {
    const result = await annualReportCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { sections: { id } } },
      {returnDocument:"before"}
    );

    const section = result?.sections.find((s) => s.id === id);

    if (!section) {
      throw new CustomError("No document updated. Check if the IDs are correct and try again");
    }

    const filePath = normalizeAnnualReportFilePath(section?.file?.filePath);
    if (section.file && filePath) {
      await deleteFile(join(UPLOAD_DIR, filePath));
    }
    
    return { message: "Deleted successfully" };
  },
};
