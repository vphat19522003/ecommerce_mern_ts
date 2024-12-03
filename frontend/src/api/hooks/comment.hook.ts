import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { CommentFormTypeCustom } from '@app/pages/productDetail/commentComponent/schemas';
import { CommentResultResponseType, ResultResponseType } from '@app/types/auth';
import { IErrorResponse } from '@app/types/common';

import { addComment, getCommentByProductId } from '../comment';

export const useAddComment = (): UseMutationResult<ResultResponseType, IErrorResponse, CommentFormTypeCustom> => {
  return useMutation({
    mutationFn: addComment
  });
};

export const useGetComments = (): UseMutationResult<
  CommentResultResponseType,
  IErrorResponse,
  { productId: string; page: number; pageSize: number }
> => {
  return useMutation({
    mutationFn: getCommentByProductId
  });
};
