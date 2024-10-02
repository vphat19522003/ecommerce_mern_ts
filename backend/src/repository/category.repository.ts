import mongoose, { Types } from 'mongoose';

import CategoryModel, { CategoryImageType } from '@app/models/category.model';

export type CategoryInfo = {
  _id?: string;
  name: string;
  description?: string;
  categoryImg: CategoryImageType;
  parentCategory?: string;
  subCategories?: [string];
};

class CategoryRepository {
  static async createCategory({ name, description, categoryImg, parentCategory }: CategoryInfo): Promise<CategoryInfo> {
    const newCategory = await CategoryModel.create({
      name,
      description,
      categoryImg,
      parentCategory
    });

    return newCategory.toObject<CategoryInfo>();
  }

  static async getMainCategory(): Promise<CategoryInfo[]> {
    const listMainCategory = await CategoryModel.find({ parentCategory: null }).lean();
    return listMainCategory as unknown as CategoryInfo[];
  }

  static async getSubCategory(parent_id: string): Promise<CategoryInfo[]> {
    const listMainCategory = await CategoryModel.find({ parentCategory: parent_id }).lean();
    return listMainCategory as unknown as CategoryInfo[];
  }

  static async deleteCategory(category_id: string): Promise<mongoose.mongo.DeleteResult> {
    const subCategories = await CategoryModel.find({ parentCategory: category_id });

    for (const subCategory of subCategories) {
      await this.deleteCategory(subCategory._id as string);
    }

    const result = await CategoryModel.deleteOne({ _id: new Types.ObjectId(category_id) });

    return result;
  }
}

export default CategoryRepository;
