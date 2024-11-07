import { Box, Stack, Typography } from '@mui/material';

import LazySection from '@app/components/organisms/lazySection';

import VideoBanner from './components/VideoBanner';

const HomePage = (): JSX.Element => {
  return (
    <Stack className='py-6'>
      <LazySection>
        <Typography>BOOKS</Typography>
      </LazySection>
      {/* <Typography>KHUYỂN MÃI SHOCK NHẤT</Typography>
      <Typography>TOP SẢN PHẨM BÁN CHẠY</Typography>
      <Typography>SẢN PHẨM MỚI</Typography>
      <Typography>BẠN CÓ THỂ THÍCH</Typography>
      <Typography>TOYS</Typography>
      <Typography>GAME</Typography>
      <Typography>ELECTRONICS</Typography>
      <Typography>FOOD</Typography> */}
      <Box className='h-200'></Box>
      {/* <WhyChooseUsBanner /> */}
      {/* <ParallaxBanner /> */}
      <VideoBanner />
    </Stack>
  );
};

export default HomePage;
