import axiosCustom from '@app/config/axios';
import { CommentFormTypeCustom } from '@app/pages/productDetail/commentComponent/schemas';
import { ResultResponseType } from '@app/types/auth';

export const addComment = async ({
  productId,
  content,
  comment_vote
}: CommentFormTypeCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('productId', productId);
  formData.append('content', String(content));
  formData.append('comment_vote', String(comment_vote));

  const res = await axiosCustom.post('/comment/add-comment', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};
