import { Box, Stack, Typography } from '@mui/material';

import ProductCard from '@app/components/organisms/productCard';
import { useDevice } from '@app/hooks/useDevice';

import VideoBanner from './components/VideoBanner';

const HomePage = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack className={`${isMobile && 'pl-2'} py-6 `}>
      <Typography>BOOKS</Typography>
      <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Stack>

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
