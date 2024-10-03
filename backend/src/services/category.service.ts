import { Request } from 'express';
import { omit } from 'lodash';
import mongoose from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import CategoryModel from '@app/models/category.model';
import CategoryRepository, { CategoryInfo } from '@app/repository/category.repository';
import { uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

class CategoryService {
  static async createCategory(req: Request): Promise<CategoryInfo> {
    const { name, description, parentCategory } = req.body;
    const file = req.file;
    const folder = 'category';

    if (!name) throw new CustomError('No name provided', STATUS_CODE.BAD_REQUEST);

    if (!file) throw new CustomError('No file provided', STATUS_CODE.BAD_REQUEST);

    if (!isValidImage(file)) throw new CustomError("File doesn't have valid type", STATUS_CODE.BAD_REQUEST);

    const isExistName = await CategoryModel.findOne({ name });
    if (isExistName) throw new CustomError('Category Name is already existed', STATUS_CODE.BAD_REQUEST);

    if (parentCategory) {
      const parent = await CategoryModel.findById(parentCategory);
      if (!parent) throw new CustomError('Parent category not found', STATUS_CODE.BAD_REQUEST);
    }

    let newCategory;

    try {
      // Upload ảnh lên Cloudinary
      const uploadResult = await uploadToCloudinary(file, folder);

      // Tạo category mới
      newCategory = await CategoryRepository.createCategory({
        name,
        description,
        parentCategory: parentCategory || null,
        categoryImg: {
          category_img_url: uploadResult.url,
          category_img_public_id: uploadResult.public_id
        }
      });

      if (!newCategory) throw new CustomError('Failed to create category', STATUS_CODE.INTERNAL_SERVER_ERROR);

      if (parentCategory) {
        await CategoryModel.findByIdAndUpdate(
          parentCategory,
          { $push: { subCategories: newCategory._id } },
          { new: true }
        );
      }

      return omit(newCategory, '__v', 'updatedAt');
    } catch (error) {
      if (newCategory) {
        await CategoryModel.findByIdAndDelete(newCategory._id);
      }

      throw new CustomError('Failed to upload avatar', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getMainCategory(): Promise<CategoryInfo[]> {
    const listCategory = await CategoryRepository.getMainCategory();
    return listCategory;
  }

  static async getSubCategory(req: Request): Promise<CategoryInfo[]> {
    const { parent_id } = req.query;

    if (!parent_id) throw new CustomError('No parent ID provided', STATUS_CODE.BAD_REQUEST);

    const listSubCategory = await CategoryRepository.getSubCategory(parent_id as string);
    return listSubCategory;
  }

  static async deleteCategory(req: Request): Promise<void> {
    const { category_id } = req.query;

    if (!category_id) throw new CustomError('No category ID provided', STATUS_CODE.BAD_REQUEST);

    const result = (await CategoryRepository.deleteCategory(category_id as string)) as mongoose.mongo.DeleteResult;

    if (result.deletedCount !== 1)
      throw new CustomError('Failed to delete category', STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  static async getTreeCategory(req: Request): Promise<unknown> {
    const { category_id } = req.query;
    let listCategory = [];
    const categoryTree = [];

    if (!category_id) listCategory = await this.getMainCategory();
    else listCategory.push(category_id);

    for (let idx = 0; idx < listCategory.length; idx++) {
      const categoryTreeItem = await CategoryRepository.getTreeCategory(listCategory[idx] as string);
      categoryTree.push(categoryTreeItem);
    }

    return categoryTree;
  }
}

export default CategoryService;
