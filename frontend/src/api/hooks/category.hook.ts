import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { AddNewCategoryFormCustom } from '@app/pages/admin/ecommerce/categoryPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { CategoryResponseType, CustomCategoryResponseType } from '@app/types/category';
import { IErrorResponse } from '@app/types/common';

import { getListCategory, getMainCategory } from '../category';

export const useGetMainCategory = (): UseQueryResult<CategoryResponseType[]> => {
  return useQuery({
    queryKey: ['mainCategory'],
    queryFn: getMainCategory
  });
};

export const useGetListCategory = (): UseQueryResult<CustomCategoryResponseType[]> => {
  return useQuery({
    queryKey: ['listCategory'],
    queryFn: getListCategory
  });
};

export const useCreateProduct = (): UseMutationResult<ResultResponseType, IErrorResponse, AddNewCategoryFormCustom> => {
  return useMutation({
    mutationFn: createProduct
  });
};
