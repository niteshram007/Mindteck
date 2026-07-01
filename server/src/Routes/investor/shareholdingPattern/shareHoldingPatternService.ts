import { Collection, ObjectId } from "mongodb";
import { join } from "node:path";
//
import CustomError from "../../../error";
import {
  ShareHoldingPatternQuarterEnumType,
  ShareHoldingPatternQuarterType,
  ShareHoldingPatternType,
} from "./shareHoldingPatternSchemas";
import { deleteFile, moveFile } from "../../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../../constants";

// Define the order of quarters to sort by
const quarterOrder = {
  "Fourth Quarter": 4,
  "Third Quarter": 3,
  "Second Quarter": 2,
  "First Quarter": 1,
};

export const shareHoldingPatternService = {
  async createShareHoldingPattern(
    shareHoldingPatternCollection: Collection<ShareHoldingPatternType>,
    data: ShareHoldingPatternType,
  ): Promise<{ message: string }> {
    const ShareHoldingPatternData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const isExist = await shareHoldingPatternCollection.findOne({
      financialYear: data.financialYear,
    });

    const isSameDoc = isExist?.quarters.find((s) => data.quarters.some((ds) => ds.quarterName === s.quarterName));
    if (isSameDoc) {
      throw new CustomError("Duplicate record, this " + isSameDoc.quarterName + " already exists.");
    }

    for (const quarter of data.quarters) {
      if (quarter.file) {
        await moveFile(join(UPLOAD_TEMP_DIR, quarter.file.filePath), join(UPLOAD_DIR, quarter.file.filePath));
      }
    }

    if (!isExist) {
      await shareHoldingPatternCollection.insertOne(ShareHoldingPatternData);
      return { message: "Created successfully" };
    } else {
      await shareHoldingPatternCollection.updateOne(
        {
          financialYear: data.financialYear,
        },
        {
          $push: {
            quarters: {
              $each: ShareHoldingPatternData.quarters,
              $position: 0,
            },
          },
        },
      );
      return { message: "Created successfully" };
    }
  },

  async updateShareHoldingPattern(
    shareHoldingPatternCollection: Collection<ShareHoldingPatternType>,
    updatedShareHoldingPattern: ShareHoldingPatternQuarterType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);

    const getOldData = await shareHoldingPatternCollection.findOne({ _id: objectId });
    if (!getOldData) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }
    const existingQuarter = getOldData.quarters.find(
      (quarter) => quarter.quarterName === updatedShareHoldingPattern.quarterName,
    );

    if (existingQuarter && existingQuarter?.file.filePath !== updatedShareHoldingPattern.file.filePath) {
      if (existingQuarter.file.filePath) {
        await deleteFile(join(UPLOAD_DIR, existingQuarter.file.filePath));
      }
      if (updatedShareHoldingPattern.file.filePath) {
        await moveFile(
          join(UPLOAD_TEMP_DIR, updatedShareHoldingPattern.file.filePath),
          join(UPLOAD_DIR, updatedShareHoldingPattern.file.filePath),
        );
      }
    }
    const result = await shareHoldingPatternCollection.updateOne(
      {
        _id: objectId, // Match the document by _id
        "quarters.quarterName": updatedShareHoldingPattern.quarterName,
      },
      {
        $set: {
          "quarters.$": updatedShareHoldingPattern,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      throw new CustomError(`Not found with id ${id}, please try again`);
    }

    return { message: "Updated successfully" };
  },

  async getShareHoldingPattern(shareHoldingPatternCollection: Collection<ShareHoldingPatternType>) {
    const shareHoldingPatterns = await shareHoldingPatternCollection.find().toArray();

    return shareHoldingPatterns.map((sh) => {
      sh.quarters.sort((a, b) => quarterOrder[b.quarterName] - quarterOrder[a.quarterName]);
      return sh;
    });
  },

  async getBySessionShareHoldingPattern(
    shareHoldingPatternCollection: Collection<ShareHoldingPatternType>,
    session: string | undefined,
  ) {
    const filter = session ? { isActive: true, financialYear: session } : { isActive: true };
    const shareHoldingPatterns = await shareHoldingPatternCollection.find(filter).toArray();

    return shareHoldingPatterns.map((sh) => {
      sh.quarters.sort((a, b) => quarterOrder[b.quarterName] - quarterOrder[a.quarterName]);
      return sh;
    });
  },

  async getActiveShareHoldingPattern(shareHoldingPatternCollection: Collection<ShareHoldingPatternType>) {
    return await shareHoldingPatternCollection.find({ isActive: true }).toArray();
  },

  async deleteShareHoldingPatternById(shareHoldingPatternCollection: Collection<ShareHoldingPatternType>, id: string) {
    const _id = new ObjectId(id);
    const result = await shareHoldingPatternCollection.findOneAndDelete({ _id });
    if (!result) {
      throw new CustomError("Share Holding Pattern not found with id " + id + ", please try again.");
    }
    for (const quarter of result.quarters) {
      if (quarter?.file) {
        await deleteFile(join(UPLOAD_DIR, quarter.file.filePath));
      }
    }
    return { message: "Deleted successfully" };
  },

  async deleteItemShareHoldingPatternById(
    shareHoldingPatternCollection: Collection<ShareHoldingPatternType>,
    objectId: string,
    quarterName: ShareHoldingPatternQuarterEnumType,
  ) {
    const result = await shareHoldingPatternCollection.findOneAndUpdate(
      { _id: new ObjectId(objectId) },
      { $pull: { quarters: { quarterName } } },
      { returnDocument: "before" },
    );

    const quarter = result?.quarters.find((s) => s.quarterName === quarterName);
    if (!quarter) {
      throw new CustomError("No document was updated check if the quarter name is correct and try again");
    }
    if (quarter.file) {
      await deleteFile(join(UPLOAD_DIR, quarter.file.filePath));
    }

    return { message: "Deleted successfully" };
  },
};
