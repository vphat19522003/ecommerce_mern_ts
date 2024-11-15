import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  AddNewProductFormCustom,
  getProductDetailCustom,
  getProductTypeCustom
} from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse } from '@app/types/common';

import { createProduct, getAllLatestProduct, getProductDetail } from '../product';

export const useCreateProduct = (): UseMutationResult<ResultResponseType, IErrorResponse, AddNewProductFormCustom> => {
  return useMutation({
    mutationFn: createProduct
  });
};

export const useGetAllLatestProduct = (quantity: number): UseQueryResult<getProductTypeCustom[]> => {
  return useQuery({
    queryKey: ['AllLatestProduct'],
    queryFn: async () => {
      return getAllLatestProduct(quantity);
    }
  });
};

export const useGetDetailProduct = (productId: string): UseQueryResult<getProductDetailCustom> => {
  return useQuery({
    queryKey: ['ProductDetails', productId],
    queryFn: async () => {
      return getProductDetail(productId);
    }
  });
};
