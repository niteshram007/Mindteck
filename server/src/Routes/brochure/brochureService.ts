import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../error";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { BrochureType } from "./brochureSchemas";

const TEMP_IMAGE_MARKER = "/temp-images/";
const UPLOADED_IMAGE_MARKER = "/images/";
const TEMP_IMAGE_URL_PATTERN = /(?:https?:\/\/[^"'\s<>]+)?\/temp-images\/([^"'\s<>?#]+)/gi;

const extractRelativeTempImagePath = (assetUrl: string) => {
  const normalizedUrl = String(assetUrl || "");
  const markerIndex = normalizedUrl.indexOf(TEMP_IMAGE_MARKER);

  if (markerIndex === -1) {
    return "";
  }

  const relativePath = normalizedUrl
    .slice(markerIndex + TEMP_IMAGE_MARKER.length)
    .split(/[?#]/, 1)[0];

  try {
    return decodeURIComponent(relativePath);
  } catch {
    return relativePath;
  }
};

const buildUploadedImageUrl = (relativePath: string) =>
  encodeURI(`${UPLOADED_IMAGE_MARKER}${relativePath.replace(/^\/+/, "")}`);

const promoteInlineBrochureImages = async (content = "") => {
  if (!content) {
    return content;
  }

  TEMP_IMAGE_URL_PATTERN.lastIndex = 0;
  const tempImageUrls = [
    ...new Set(Array.from(content.matchAll(TEMP_IMAGE_URL_PATTERN), (match) => match[0])),
  ];

  let nextContent = content;

  for (const tempImageUrl of tempImageUrls) {
    const relativePath = extractRelativeTempImagePath(tempImageUrl);

    if (!relativePath) {
      continue;
    }

    await moveFile(join(UPLOAD_TEMP_DIR, relativePath), join(UPLOAD_DIR, relativePath));
    nextContent = nextContent.split(tempImageUrl).join(buildUploadedImageUrl(relativePath));
  }

  return nextContent;
};

export const brochureService = {
  async createBrochure(
    brochureCollection: Collection<BrochureType>,
    data: BrochureType,
  ): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(
        join(UPLOAD_TEMP_DIR, data.file.filePath),
        join(UPLOAD_DIR, data.file.filePath),
      );
    }
    const content = await promoteInlineBrochureImages(data.content ?? "");
    const brochureData = {
      ...data,
      content,
      subTitle: data.subTitle ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await brochureCollection.insertOne(brochureData);
    return { message: "created successfully" };
  },

  async updateBrochure(
    brochureCollection: Collection<BrochureType>,
    data: BrochureType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await brochureCollection.findOne({ _id: objectId });

    if (getOldData?.file?.filePath && getOldData.file.filePath !== data.file?.filePath) {
      await deleteFile(join(UPLOAD_DIR, getOldData.file.filePath));
    }

    if (data.file?.filePath) {
      await moveFile(
        join(UPLOAD_TEMP_DIR, data.file.filePath),
        join(UPLOAD_DIR, data.file.filePath),
      );
    }

    const content = await promoteInlineBrochureImages(data.content ?? "");
    const updateFields = {
      ...data,
      content,
      subTitle: data.subTitle ?? "",
      updatedAt: new Date(),
    };

    const result = await brochureCollection.updateOne(
      { _id: objectId },
      { $set: updateFields },
    );

    if (!result.matchedCount) {
      throw new CustomError("Brochure not found with id " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getBrochures(brochureCollection: Collection<BrochureType>) {
    return await brochureCollection.find().toArray();
  },

  async getBrochureById(brochureCollection: Collection<BrochureType>, id: string) {
    return await brochureCollection.findOne({ _id: new ObjectId(id) });
  },

  async getBrochureByTitle(
    brochureCollection: Collection<BrochureType>,
    title: string,
  ) {
    return await brochureCollection.findOne({ title: title });
  },

  async getActiveBrochureByTitle(
    brochureCollection: Collection<BrochureType>,
    title: string,
  ) {
    return await brochureCollection.findOne({ title: title, isActive: true });
  },

  async getActiveBrochuresByResourceCategory(
    brochureCollection: Collection<BrochureType>,
    resourceCategoryId: string,
  ) {
    if (resourceCategoryId) {
      return await brochureCollection
        .find({ resourceCategoryId, isActive: true })
        .toArray();
    }
    return await brochureCollection.find({ isActive: true }).toArray();
  },

  async deleteBrochureById(
    brochureCollection: Collection<BrochureType>,
    id: string,
  ) {
    const objectId = new ObjectId(id);

    const result = await brochureCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Brochure not found with id " + id + ", please try again.");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
