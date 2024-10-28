import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { AddNewProductFormCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse } from '@app/types/common';

import { createProduct } from '../product';

export const useCreateProduct = (): UseMutationResult<ResultResponseType, IErrorResponse, AddNewProductFormCustom> => {
  return useMutation({
    mutationFn: createProduct
  });
};
