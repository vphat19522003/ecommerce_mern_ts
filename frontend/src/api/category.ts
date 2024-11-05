import axiosCustom from '@app/config/axios';
import { AddNewCategoryFormCustom } from '@app/pages/admin/ecommerce/categoryPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { CategoryResponseType, CustomCategoryResponseType } from '@app/types/category';
import { ResponseType } from '@app/types/common';

export const getMainCategory = async (): Promise<CategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-main-category');

  return res.data.result;
};

export const getListCategory = async (): Promise<CustomCategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-tree-category');

  return res.data.result;
};

export const createCategory = async ({
  name,
  description,
  categoryImg,
  parent
}: AddNewCategoryFormCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', String(description));

  if (parent) {
    formData.append('parent', parent);
  }

  formData.append('file', categoryImg);

  const res = await axiosCustom.post('/category/create-category', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const deleteCategory = async (categoryId: string): Promise<ResponseType> => {
  const res = await axiosCustom.post(`/category/delete-category?category_id=${categoryId}`);

  return res.data;
};
