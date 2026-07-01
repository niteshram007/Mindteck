import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import { CollectionName } from "../../constants/collection";
import CustomError from "../../error";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { PageType } from "./pageSchemas";
import { TemplateCreateType } from "../template/templateSchemas";

export const pageService = {
  async createPage(pageCollection: Collection<PageType>, data: PageType): Promise<{ message: string }> {
    if (data.file) {
      await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
    }

    const pageData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await pageCollection.insertOne(pageData);
    return { message: "created successfully" };
  },

  async updatePage(pageCollection: Collection<PageType>, data: PageType, id: string): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const getOldData = await pageCollection.findOne({ _id: objectId });
    const isSameFile = getOldData?.file?.filePath === data.file?.filePath;

    if (!isSameFile) {
      if (getOldData?.file) {
        await deleteFile(join(UPLOAD_DIR, getOldData?.file.filePath));
      }

      if (data.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, data.file.filePath), join(UPLOAD_DIR, data.file.filePath));
      }
    }

    const updateFields = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await pageCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("Page not found with category " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getPages(pageCollection: Collection<PageType>) {
    return await pageCollection
      .aggregate([
        {
          $lookup: {
            from: CollectionName.slider,
            localField: "sliderId",
            foreignField: "_id",
            as: "slider",
          },
        },
      ])
      .toArray();
  },

  async getTemplateByUrl(
    pageCollection: Collection<PageType>,
    templateCollection: Collection<TemplateCreateType>,
    url: string,
  ) {
    const existingPage = await pageCollection.findOne({ url });
    if (!existingPage) {
      throw new CustomError("Page Not Found with url " + url + ", please try again.");
    }

    const pageId = new ObjectId(existingPage._id);

    const existingTemplate = await templateCollection.findOne({ pageId: pageId });

    const pageWithTemplate = { page: existingPage, template: existingTemplate };
    return pageWithTemplate;
  },

  async getActiveTemplateByUrl(
    pageCollection: Collection<PageType>,
    templateCollection: Collection<TemplateCreateType>,
    url: string,
  ) {
    const existingPage = await pageCollection.findOne({ url, isActive: true });
    if (!existingPage) {
      throw new CustomError("Page Not Found with url " + url + ", please try again.");
    }

    const pageId = new ObjectId(existingPage._id);

    const existingTemplate = await templateCollection.findOne({ pageId });

    const pageWithTemplate = { page: existingPage, template: existingTemplate };
    return pageWithTemplate;
  },

  async searchPages(
    pageCollection: Collection<PageType>,
    templateCollection: Collection<TemplateCreateType>,
    query: string,
    limit = 10,
  ) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return [];
    }

    const pages = await pageCollection
      .find(
        { isActive: true },
        {
          projection: {
            title: 1,
            url: 1,
            metaTitle: 1,
            metaKeyword: 1,
            metaDescription: 1,
            templateName: 1,
          },
        },
      )
      .toArray();

    if (!pages.length) {
      return [];
    }

    const pageIds = pages.map((page) => page._id);
    const templates = await templateCollection.find({ pageId: { $in: pageIds } }).toArray();
    const templateMap = new Map(templates.map((template) => [String(template.pageId), template]));

    const results: Array<{ title: string; url: string; score: number }> = [];

    for (const page of pages) {
      const title = page.title || "";
      const url = page.url || "";
      const metaTitle = page.metaTitle || "";
      const metaKeyword = page.metaKeyword || "";
      const metaDescription = page.metaDescription || "";
      const templateName = page.templateName || "";

      const template = templateMap.get(String(page._id));
      const templateText = template ? JSON.stringify(template) : "";

      const titleMatch = title.toLowerCase().includes(normalizedQuery);
      const metaMatch =
        metaTitle.toLowerCase().includes(normalizedQuery) ||
        metaKeyword.toLowerCase().includes(normalizedQuery) ||
        metaDescription.toLowerCase().includes(normalizedQuery) ||
        templateName.toLowerCase().includes(normalizedQuery) ||
        url.toLowerCase().includes(normalizedQuery);
      const templateMatch = templateText.toLowerCase().includes(normalizedQuery);

      if (titleMatch || metaMatch || templateMatch) {
        const score = titleMatch ? 3 : metaMatch ? 2 : 1;
        results.push({
          title: title || url,
          url,
          score,
        });
      }
    }

    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.title.localeCompare(b.title);
    });

    return results.slice(0, limit).map(({ title, url }) => ({ title, url }));
  },

  async deletePageById(pageCollection: Collection<PageType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await pageCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
      throw new CustomError("Page not found with category " + id + ", please try again.");
    }
    if (result.file) {
      await deleteFile(join(UPLOAD_DIR, result.file.filePath));
    }
    return { message: "Deleted successfully" };
  },
};
