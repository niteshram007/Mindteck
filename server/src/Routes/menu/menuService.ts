import { Collection, ObjectId } from "mongodb";
import { PositionEnumType, MenuType, MenuItemType } from "./menuSchemas";
import CustomError from "../../error";
import { CollectionName } from "../../constants/collection";

function organizeData(data: MenuItemType[]): MenuItemType[] {
  const result: MenuItemType[] = [];
  const map: { [key: string]: MenuItemType } = {};

  // Step 1: Create a map
  data.forEach((item) => {
    map[item.label] = { ...item, children: [] };
  });
  // console.log(map, "1111111111111111111")

  // Step 2: parent-child relationships
  data.forEach((item) => {
    if (item.parent) {
      // If an item has a parent, add it as a child of the parent
      if (map[item.parent]) {
        map[item.parent].children?.push(map[item.label]);
      }
    } else {
      // If there's no parent, it's a top-level item, add it to the result
      result.push(map[item.label]);
    }
  });

  // console.log(result, "2222222222222222", map)

  // Step 3: Sort
  result.sort((a, b) => a.order - b.order);

  // Recursively sort children in each level
  const sortChildren = (items: MenuItemType[]) => {
    items.forEach((item) => {
      item.children?.sort((a, b) => a.order - b.order); // Sort children
      sortChildren(item.children || []); // Recursively sort children's children
    });
  };

  // Apply the sorting to the top-level items
  sortChildren(result);

  return result;
}

export const menuService = {
  async createMenu(menuCollection: Collection<MenuType>, data: MenuType): Promise<{ message: string }> {
    const menuData: MenuType & { createdAt: Date; updatedAt: Date } = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await menuCollection.insertOne(menuData);
    return { message: "created successfully" };
  },

  async updateMenu(
    menuCollection: Collection<MenuType>,
    updatedMenu: MenuType,
    id: string,
  ): Promise<{ message: string }> {
    //   Update menu in MongoDB
    const objectId = new ObjectId(id);
    const result = await menuCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedMenu, updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      throw new CustomError("Menu not found with category " + id + ", please try again.");
    }

    return { message: "Updated successfully" };
  },

  async getMenus(menu: Collection<MenuType>) {
    return await menu
      .aggregate([
        {
          $lookup: {
            from: CollectionName.menu,
            localField: "parent",
            foreignField: "_id",
            as: "parent",
          },
        },
        {
          $unwind: {
            path: "$parent",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            label: 1,
            order: 1,
            url: 1,
            position: 1,
            parent: "$parent.label",
            parentId: "$parent._id",
            _id: 1,
          },
        },
      ])
      .toArray();
  },

  async getMenusByPosition(menu: Collection<MenuType>, position: PositionEnumType) {
    const allMenus = await menu
      .aggregate([
        {
          $lookup: {
            from: CollectionName.menu,
            localField: "parent",
            foreignField: "_id",
            as: "parent",
          },
        },
        {
          $match: {
            position: position,
          },
        },
        {
          $unwind: {
            path: "$parent",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            label: 1,
            order: 1,
            url: 1,
            position: 1,
            parent: "$parent.label",
            _id: 1,
          },
        },
      ])
      .toArray();

    if (!allMenus.length) {
      throw new CustomError("Menu not found with position " + position + ", please try again.");
    }

    return allMenus;
  },

  async getMenusHierarchicallyByPosition(menu: Collection<MenuType>, position: PositionEnumType) {
    const allMenus = (await menu
      .aggregate([
        {
          $lookup: {
            from: CollectionName.menu,
            localField: "parent",
            foreignField: "_id",
            as: "parent",
          },
        },
        {
          $match: {
            position: position,
          },
        },
        {
          $unwind: {
            path: "$parent",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            label: 1,
            order: 1,
            url: 1,
            position: 1,
            parent: "$parent.label",
            _id: 1,
          },
        },
      ])
      .toArray()) as MenuItemType[];

    if (!allMenus) {
      throw new CustomError("Menu not found with position " + position+ ", please try again.");
    }

    return organizeData(allMenus);
  },

  async getActiveMenusHierarchicallyByPosition(menu: Collection<MenuType>, position: PositionEnumType) {
    const allMenus = (await menu
      .aggregate([
        {
          $lookup: {
            from: CollectionName.menu,
            localField: "parent",
            foreignField: "_id",
            as: "parent",
          },
        },
        {
          $match: {
            position,
            isActive:true,
          },
        },
        {
          $unwind: {
            path: "$parent",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            label: 1,
            order: 1,
            url: 1,
            position: 1,
            parent: "$parent.label",
            _id: 1,
          },
        },
      ])
      .toArray()) as MenuItemType[];

    if (!allMenus) {
      throw new CustomError("Menu not found with position " + position+ ", please try again.");
    }

    return organizeData(allMenus);
  },

  async deleteMenuById(menuCollection: Collection<MenuType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await menuCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw new CustomError("Menu not found with category " + id+ ", please try again.");
    }
    return { message: "Deleted successfully" };
  },
};
