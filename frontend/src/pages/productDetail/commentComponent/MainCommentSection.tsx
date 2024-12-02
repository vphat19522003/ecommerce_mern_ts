import { CheckCircle, Comment, Share, ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Pagination, Rating, Stack, Typography } from '@mui/material';

import ExampleCommentImage from '@app/assets/exp_comment_img.jpg';
import avatar from '@app/assets/stitch_icon.png';
import ButtonForm from '@app/components/atoms/button';
import { useDevice } from '@app/hooks/useDevice';

const MainCommentSection = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <>
      {[...Array(5)].map((item, index) => (
        <>
          <Stack direction={'row'} spacing={4} className='py-2 ' key={index}>
            {/* User Info */}
            <Stack className={`${isMobile ? 'w-5/12' : 'w-3/12'}`}>
              {/* User Avatar, name, participate date */}
              <Stack direction={'row'} spacing={3}>
                <Avatar alt='Remy Sharp' src={avatar} />
                {/* Name, participate date */}
                <Stack>
                  <Typography className='text-lg font-semibold'>Stitch Nguyễn</Typography>
                  <Typography className='text-sm font-medium text-gray-400'>Participate 2 years ago</Typography>
                </Stack>
              </Stack>
              {/* All comments */}
              <Stack direction={'row'} justifyContent={'space-between'} className='my-2'>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Comment className='text-sm text-gray-400' />
                  <Typography className='text-sm text-gray-400'>Đã viết</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Typography className='text-sm'>2 Đánh giá</Typography>
                </Stack>
              </Stack>
              <Divider />
              {/* All likes */}
              <Stack direction={'row'} justifyContent={'space-between'} className='my-2'>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <ThumbUp className='text-sm text-gray-400' />
                  <Typography className='text-sm text-gray-400'>Đã nhận</Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Typography className='text-sm'>5 Lượt cảm ơn</Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* Comment Section */}
            <Stack className={`${isMobile ? 'w-7/12' : 'w-9/12'}`}>
              {/* Rating point */}
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Rating name='rating' defaultValue={5} precision={0.5} size='small' readOnly />
                <Typography className='text-lg font-bold'>Cực kỳ hài lòng</Typography>
              </Stack>
              {/* Has bought */}
              <Stack direction={'row'} spacing={2} alignItems={'center'} className='mt-1'>
                <CheckCircle className='text-md text-green-600' />
                <Typography className='text-sm font-md text-green-600'>Đã mua hàng</Typography>
              </Stack>

              {/* Comment content, image */}
              <Stack className='mt-4'>
                <Typography className='text-md text-justify'>
                  Sách mới, k bị rách góc, sẽ quay lại mua lần sau
                </Typography>
                <Box
                  className={
                    'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
                  }>
                  <img src={ExampleCommentImage} alt={'comment image'} className='w-full h-full object-cover' />
                </Box>
                {/* Time comment */}
                <Typography className='text-md text-gray-400 mt-2'>Đánh giá vào 6 tháng trước</Typography>
              </Stack>

              {/* Comment action */}
              <Stack direction={'row'} justifyContent={'space-between'} className='mt-2'>
                <ButtonForm className='size-auto'>
                  <ThumbUpOffAlt className='text-lg' />
                  <Typography className='ml-2 text-md'>Hữu ích</Typography>
                </ButtonForm>
                <IconButton className='size-auto'>
                  <Share className='text-xl text-blue-700' />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
        </>
      ))}
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Pagination />
      </Stack>
    </>
  );
};

export default MainCommentSection;
