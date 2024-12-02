import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddAPhoto } from '@mui/icons-material';
import { Box, Rating, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import TextArea from '@app/components/atoms/textArea';
import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

import { addNewCommentFormSchemas, AddNewCommentFormType } from './schemas';

type CommentFormProps = {
  productDetail?: getProductDetailCustom;
  handleAddComment: (comment: AddNewCommentFormType) => void;
  isPending: boolean;
};

const labels: { [index: string]: string } = {
  1: 'Bad+',
  2: 'Bad',
  3: 'Normal',
  4: 'Good',
  5: 'Excellent'
};
const CommentForm = ({ productDetail, handleAddComment, isPending }: CommentFormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<AddNewCommentFormType>({
    resolver: zodResolver(addNewCommentFormSchemas),
    defaultValues: {
      content: '',
      comment_vote: 5
    }
  });

  const handleSubmitComment = (value: AddNewCommentFormType) => {
    handleAddComment(value);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitComment)}>
      <Stack>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <img
            src={productDetail?.productThumbImg.url}
            alt=''
            style={{
              width: '140px',
              height: '140px',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Typography style={{ textAlign: 'center', marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
          {productDetail?.productName}
        </Typography>
        <Controller
          control={control}
          name='comment_vote'
          render={({ field: { value } }) => (
            <Stack
              direction={'row'}
              justifyContent={'center'}
              spacing={4}
              alignItems={'center'}
              style={{ marginBottom: '16px' }}>
              <Box
                style={{
                  position: 'relative'
                }}>
                <Rating
                  name='rating'
                  precision={1}
                  size='large'
                  style={{
                    fontSize: '2rem'
                  }}
                  value={value}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    if (newValue === null) {
                      console.log(newValue);
                    } else {
                      setValue('comment_vote', newValue);
                    }
                  }}
                />
                <span style={{ position: 'absolute', right: 'auto', top: 6, color: '#faaf00', marginLeft: '4px' }}>
                  {labels[getValues('comment_vote')]}
                </span>
              </Box>
            </Stack>
          )}
        />

        <Controller
          control={control}
          name='content'
          render={({ field: { onChange, value } }) => (
            <TextArea
              variant='outlined'
              borderColorFocus='blue.700'
              backgroundColor='white'
              placeholder='Nêu cảm nhận của bạn về sản phẩm'
              size='small'
              style={{
                maxHeight: '90px !important',
                fontSize: '14px'
              }}
              value={value}
              onChange={onChange}
              error={errors.content}
            />
          )}
        />

        <Stack direction={'row'} justifyContent={'flex-end'}>
          <input type='file' id='upload-comment-images' accept='image/*' hidden multiple />

          <label htmlFor='upload-comment-images'>
            <Stack direction={'row'} spacing={2} alignItems={'center'} style={{ marginTop: '6px' }}>
              <AddAPhoto
                style={{
                  color: '#1D4ED8'
                }}
              />
              <p
                style={{
                  color: '#1D4ED8',
                  fontSize: '12px'
                }}>
                Gửi ảnh thực tế <span>(Tối đa 3 ảnh)</span>
              </p>
            </Stack>
          </label>
        </Stack>
        <ButtonForm variant='contained' style={{ marginTop: '16px' }} type='submit' disabled={isPending}>
          Gửi đánh giá
        </ButtonForm>
      </Stack>
    </form>
  );
};

export default CommentForm;
