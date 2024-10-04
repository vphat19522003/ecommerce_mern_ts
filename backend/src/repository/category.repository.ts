import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import CategoryModel, { CategoryImageType, ICategory } from '@app/models/category.model';

export type CategoryInfo = {
  _id?: string | Types.ObjectId;
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

  static async getTreeCategory(category_id: string): Promise<unknown> {
    const category = (await CategoryModel.findById(category_id).lean()) as any;

    if (!category) {
      throw new CustomError('Category not found', STATUS_CODE.BAD_REQUEST);
    }

    const subCategories = await CategoryModel.find({ parentCategory: category_id }).lean();

    if (subCategories.length > 0) {
      category.subCategories = await Promise.all(
        subCategories.map(async (subCategory) => {
          return await this.getTreeCategory(subCategory._id as string);
        })
      );
    }

    return omit(category, '__v', 'updatedAt');
  }

  static async findTopParentCategory(categoryId: string | mongoose.Types.ObjectId): Promise<ICategory> {
    const category = await CategoryModel.findById(categoryId).populate('parentCategory').lean();

    if (!category!.parentCategory) {
      return category as ICategory;
    }

    return this.findTopParentCategory(category!.parentCategory._id);
  }
}

export default CategoryRepository;
