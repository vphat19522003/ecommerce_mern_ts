import axiosCustom from '@app/config/axios';
import { CategoryResponseType, CustomCategoryResponseType } from '@app/types/category';

export const getMainCategory = async (): Promise<CategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-main-category');

  return res.data.result;
};

export const getListCategory = async (): Promise<CustomCategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-tree-category');

  return res.data.result;
};

export const createProduct
