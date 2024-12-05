import axiosCustom from '@app/config/axios';
import { CommentFormTypeCustom, IComment } from '@app/pages/productDetail/commentComponent/schemas';
import { CommentResultResponseType, ResultResponseType } from '@app/types/auth';

export const addComment = async ({
  productId,
  content,
  comment_vote,
  comment_images
}: CommentFormTypeCustom): Promise<ResultResponseType> => {
  const formData = new FormData();

  formData.append('productId', productId);
  formData.append('content', String(content));
  formData.append('comment_vote', String(comment_vote));

  comment_images?.forEach((file) => {
    formData.append('commentImg', file);
  });

  const res = await axiosCustom.post('/comment/add-comment', formData, {
    headers: { 'content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const getCommentByProductId = async ({
  productId,
  page,
  pageSize
}: {
  productId: string;
  page: number;
  pageSize: number;
}): Promise<CommentResultResponseType> => {
  const res = await axiosCustom.post('/comment/get-comments', {
    productId,
    page,
    pageSize
  });

  return res.data;
};

export const getCommentImages = async ({
  productId
}: {
  productId: string;
}): Promise<Omit<CommentResultResponseType, 'result'> & { result: string[] }> => {
  const res = await axiosCustom.post('/comment/get-image-comments', { productId });

  return res.data;
};

export const getMyComment = async ({
  productId
}: {
  productId: string;
}): Promise<Omit<CommentResultResponseType, 'result'> & { result: IComment }> => {
  const res = await axiosCustom.post('/comment/get-my-comment', { productId });

  return res.data;
};

export const deleteMyComment = async ({
  productId
}: {
  productId: string;
}): Promise<Omit<CommentResultResponseType, 'result'>> => {
  const res = await axiosCustom.post('/comment/delete-my-comment', { productId });

  return res.data;
};
