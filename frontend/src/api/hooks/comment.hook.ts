import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { CommentFormTypeCustom } from '@app/pages/productDetail/commentComponent/schemas';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse } from '@app/types/common';

import { addComment } from '../comment';

export const useAddComment = (): UseMutationResult<ResultResponseType, IErrorResponse, CommentFormTypeCustom> => {
  return useMutation({
    mutationFn: addComment
  });
};
