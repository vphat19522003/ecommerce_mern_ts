import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Divider, Stack, Typography } from '@mui/material';

import {
  useAddComment,
  useDeleteMyComment,
  useGetCommentImages,
  useGetComments,
  useGetMyComment
} from '@app/api/hooks/comment.hook';
import ButtonForm from '@app/components/atoms/button';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';
import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { RootState } from '@app/store';
import { IErrorResponse } from '@app/types/common';

import CommentFilterSection from '../commentComponent/CommentFilterSection';
import CommentForm from '../commentComponent/CommentForm';
import CommentImageSection from '../commentComponent/CommentImageSection';
import GeneralRatingInfo from '../commentComponent/GeneralRatingInfo';
import MainCommentSection from '../commentComponent/MainCommentSection';
import MyComment from '../commentComponent/MyComment';
import { AddNewCommentFormType, IComment } from '../commentComponent/schemas';

type ProductCommentProps = {
  productDetail?: getProductDetailCustom;
};

const initFitler = {
  hasImage: false,
  hasBought: false,
  rating: [],
  sort: 'latest'
};

const ProductComment = ({ productDetail }: ProductCommentProps): JSX.Element => {
  const [listComment, setListComment] = useState<IComment[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0
  });
  const [commentImages, setCommentImages] = useState<string[]>([]);
  const [myComment, setMyComment] = useState<IComment | null>(null);
  const [filters, setFilters] = useState(initFitler);

  const addCommentDialogRef = useRef<IDialogRef>(null);
  const confirmDialogRef = useRef<IDialogRef>(null);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const { mutate: addComment, isPending } = useAddComment();
  const { mutate: getCommentList, isPending: isPendingGetComment } = useGetComments();
  const { mutate: getCommentImages } = useGetCommentImages();
  const { mutate: getMyComment } = useGetMyComment();
  const { mutate: deleteMyComment } = useDeleteMyComment();

  useEffect(() => {
    if (!productDetail?._id) return;
    getCommentList(
      { productId: productDetail?._id as string, page: 1, pageSize: 5 },
      {
        onSuccess: (data) => {
          setListComment(data.result.data);
          setPagination(data.result.pagination);
        }
      }
    );
    getCommentImages(
      { productId: productDetail?._id as string },
      {
        onSuccess: (data) => {
          setCommentImages(data.result);
        }
      }
    );

    if (user) {
      getMyComment(
        { productId: productDetail?._id as string },
        {
          onSuccess: (data) => {
            setMyComment(data.result);
          }
        }
      );
    } else {
      setMyComment(null);
    }
  }, [productDetail?._id]);

  const handleOpenAddComment = () => {
    if (!user) {
      navigate('/login');
    } else addCommentDialogRef.current?.show();
  };

  const handleAddComment = (data: AddNewCommentFormType) => {
    addComment(
      { ...data, productId: productDetail?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          addCommentDialogRef.current?.hide();

          getCommentList(
            { productId: productDetail?._id as string, page: pagination.page, pageSize: pagination.pageSize },
            {
              onSuccess: (data) => {
                setListComment(data.result.data);
                setPagination(data.result.pagination);
                setMyComment(data.result.data.find((p) => p.userId._id === user?._id) || null);
              }
            }
          );

          getCommentImages(
            { productId: productDetail?._id as string },
            {
              onSuccess: (data) => {
                setCommentImages(data.result);
              }
            }
          );
        },
        onError: (err: IErrorResponse) => {
          toast.error(err.response.data.message as string);
        }
      }
    );
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page === pagination.page) return;
    getCommentList(
      { productId: productDetail?._id as string, page: page, pageSize: 5 },
      {
        onSuccess: (data) => {
          setListComment(data.result.data);
          setPagination(data.result.pagination);
        }
      }
    );
  };

  const handleDeleteComment = () => {
    confirmDialogRef.current?.show(() => {
      deleteMyComment(
        { productId: productDetail?._id as string },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setMyComment(null);
            getCommentList(
              { productId: productDetail?._id as string, page: pagination.page, pageSize: pagination.pageSize },
              {
                onSuccess: (data) => {
                  setListComment(data.result.data);
                  setPagination(data.result.pagination);
                }
              }
            );

            getCommentImages(
              { productId: productDetail?._id as string },
              {
                onSuccess: (data) => {
                  setCommentImages(data.result);
                }
              }
            );
          }
        }
      );
    });
  };

  const handleChangeFilter = () => {};
  return (
    <>
      <Stack className='p-4' spacing={2}>
        <Typography className='font-extrabold'>Customer's Reviews</Typography>
        {/* General Rating Info */}
        <GeneralRatingInfo />
        <Divider />
        {/* Comment Images Section */}
        <CommentImageSection commentImages={commentImages} />
        <Divider />
        {/* Comment Action Form */}
        {!myComment ? (
          <ButtonForm variant='contained' className='max-w-[36%]' onClick={handleOpenAddComment}>
            Viết đánh giá
          </ButtonForm>
        ) : (
          <MyComment myComment={myComment} handleDeleteComment={handleDeleteComment} />
        )}

        <Divider />
        {/* Comment Filter Section */}
        <CommentFilterSection />
        <Divider />
        {/* Main Comment Section */}
        <MainCommentSection
          listComment={listComment}
          pagination={pagination}
          handleChangePage={handleChangePage}
          isPendingGetComment={isPendingGetComment}
        />
      </Stack>

      {/* Add Comment */}
      <PopUp title='Đánh giá sản phẩm' ref={addCommentDialogRef} size='xl'>
        <CommentForm productDetail={productDetail} handleAddComment={handleAddComment} isPending={isPending} />
      </PopUp>

      {/* Delete Comment */}
      <ConfirmPopup ref={confirmDialogRef} title='Warning'>
        Are you sure to delete your comment ?
      </ConfirmPopup>
    </>
  );
};

export default ProductComment;
