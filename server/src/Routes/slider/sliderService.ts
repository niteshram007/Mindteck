import { Collection, ObjectId, WithId } from "mongodb";
//
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import CustomError from "../../error";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { SliderType, SliderUpdateType } from "./sliderSchemas";
import { join } from "node:path";

export const sliderService = {
  async createSlider(sliderCollection: Collection<SliderType>, data: SliderType): Promise<{ message: string }> {
    if(Array.isArray(data?.items)){
      for (const item of data.items ) {
        await moveFile(join(UPLOAD_TEMP_DIR, item.file.filePath), join(UPLOAD_DIR, item.file.filePath));
      }
    }

    const sliderData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await sliderCollection.insertOne(sliderData);
    return { message: "created successfully" };
  },

  async updateSlider(
    sliderCollection: Collection<SliderUpdateType>,
    requestBody: SliderUpdateType,
    id: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(id);
    const oldSliders: WithId<SliderUpdateType> | null = await sliderCollection.findOne({ _id: objectId });

    const added: string[] = [];
    const modified: { old: string; updated: string }[] = [];
    const deleted: string[] = [];

    // console.log(oldSliders, "------- oldSliders ----------")
    // console.log(requestBody, "-------- requestBody ---------")

    if (oldSliders) {
      const oldMapSliders = new Map(oldSliders.items.map((slider) => [slider.id, slider]));

      for (const newSlider of requestBody.items) {
        const oldSlider = oldMapSliders.get(newSlider.id);

        if (!oldSlider) {
          added.push(newSlider.file.filePath);
        } else {
          // there is a match check for modification
          const isModified = oldSlider.file.filePath !== newSlider.file.filePath;
          if (isModified) {
            modified.push({ old: oldSlider.file.filePath, updated: newSlider.file.filePath });
          }
          //remove the slider from the map to track remaining old slider
          oldMapSliders.delete(newSlider.id);
        }
      }
      //recaning items in the oldMap are deleted

      for (const deletedSlider of oldMapSliders.values()) {
        deleted.push(deletedSlider.file.filePath);
      }
    } else {
      throw new CustomError("Slider not found with category " + id+", please try again.");
    }

    //

    // console.log("<<<<<<<=======ADDED===========", added, "=>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log("<<<<<<<=========DELETED===============", deleted, "=======>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log("<<<<<<<==========MODIFIED=========", modified, "==>>>>>>>>>>>>>>>>>>>>>>>>>>");

    for (const filePath of added) {
      // if it new the only move the file
      await moveFile(join(UPLOAD_TEMP_DIR, filePath), join(UPLOAD_DIR, filePath));
    }

    for (const filePaths of modified) {
      // if it is modified, delete the old one and move the new one
      await deleteFile(join(UPLOAD_DIR, filePaths.old));
      await moveFile(join(UPLOAD_TEMP_DIR, filePaths.updated), join(UPLOAD_DIR, filePaths.updated));
    }

    for (const filePath of deleted) {
      // if it is deleted the only delete the file
      await deleteFile(join(UPLOAD_DIR, filePath));
    }

    const updateFields = {
      ...requestBody,
      updatedAt: new Date(),
    };

    const result = await sliderCollection.updateOne({ _id: objectId }, { $set: updateFields });

    if (!result.matchedCount) {
      throw new CustomError("slider not found with category " + id+", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getSliders(sliderCollection: Collection<SliderType>) {
    return await sliderCollection.find().toArray();
  },

  async deleteSliderById(slider: Collection<SliderType>, id: string) {
    const objectId = new ObjectId(id);

    const result = await slider.findOneAndDelete({ _id: objectId });

    if (!result) {
      throw new CustomError("Slider not found with category " + id+", please try again.");
    }

    for (const item of result.items) {
      if (item.file) {
        await deleteFile(item.file.filePath);
      }
    }

    return { message: "Deleted successfully" };
  },
};
