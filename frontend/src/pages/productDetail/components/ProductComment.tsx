import { Divider, Stack, Typography } from '@mui/material';

import CommentFilterSection from '../commentComponent/CommentFilterSection';
import CommentImageSection from '../commentComponent/CommentImageSection';
import GeneralRatingInfo from '../commentComponent/GeneralRatingInfo';
import MainCommentSection from '../commentComponent/MainCommentSection';

const ProductComment = (): JSX.Element => {
  return (
    <Stack className='p-4' spacing={2}>
      <Typography className='font-extrabold'>Customer's Reviews</Typography>
      {/* General Rating Info */}
      <GeneralRatingInfo />
      <Divider />
      {/* Comment Images Section */}
      <CommentImageSection />
      <Divider />
      {/* Comment Filter Section */}
      <CommentFilterSection />
      <Divider />
      {/* Main Comment Section */}
      <MainCommentSection />
    </Stack>
  );
};

export default ProductComment;
