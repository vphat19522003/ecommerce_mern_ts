import * as zod from 'zod';

import { errorMessages } from '@app/constants/errorMessages';

export const addNewCommentFormSchemas = zod.object({
  content: zod.string().min(1, errorMessages.require).min(5, errorMessages.commentContentMinLength),
  comment_vote: zod.number().min(1, errorMessages.commentVoteMin).max(5, errorMessages.commentVoteMax)
});

export type AddNewCommentFormType = zod.infer<typeof addNewCommentFormSchemas>;

export type CommentFormTypeCustom = AddNewCommentFormType & {
  productId: string;
};
