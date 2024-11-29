import { Box, Stack, Typography } from '@mui/material';

import ExampleCommentImage from '@app/assets/exp_comment_img.jpg';

const CommentImageSection = (): JSX.Element => {
  return (
    <Stack className='min-h-12'>
      <Typography className='font-semibold text-md'>All Images (100)</Typography>
      <Stack direction={'row'} spacing={2}>
        {[...Array(6)].map((item, index) => (
          <Box
            key={index}
            className={
              'cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden mt-2'
            }>
            <img src={ExampleCommentImage} alt={'comment image'} className='w-full h-full object-cover' />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentImageSection;
