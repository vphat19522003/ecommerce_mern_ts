import axiosCustom from '@app/config/axios';
import { CategoryResponseType } from '@app/types/category';

export const getMainCategory = async (): Promise<CategoryResponseType[]> => {
  const res = await axiosCustom.get('/category/get-main-category');

  return res.data.result;
};
