import axiosCustom from '@app/config/axios';
import {
  AddNewProductFormCustom,
  getProductTypeCustom
} from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';

export const createProduct = async ({
  productName,
  productPrice,
  description,
  stockQuantity,
  productThumbImg,
  productDescImg,
  category,
  categoryLabel,
  author,
  page_number,
  publisher,
  createdBy
}: AddNewProductFormCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('productName', productName);
  formData.append('productPrice', String(productPrice));
  formData.append('description', description);
  formData.append('stockQuantity', String(stockQuantity));
  formData.append('thumbImg', productThumbImg);

  productDescImg.forEach((file) => {
    formData.append('descImg', file);
  });

  formData.append('category', category);

  if (categoryLabel === 'Book') {
    formData.append('author', author as string);
    formData.append('page_number', String(page_number || 0));
    formData.append('publisher', publisher as string);
  }

  formData.append('createdBy', createdBy as string);

  const res = await axiosCustom.post('/product/create-product', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const getAllLatestProduct = async (quantity: number): Promise<getProductTypeCustom[]> => {
  const res = await axiosCustom.get(`/product/get-all-latest-products?quantity=${quantity}`);

  return res.data.result;
};
