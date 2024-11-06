import { Stack, Typography } from '@mui/material';

import VideoBanner from './components/VideoBanner';
import WhyChooseUsBanner from './components/WhyChooseUsBanner';

const HomePage = (): JSX.Element => {
  return (
    <Stack className='py-6'>
      <Typography>BOOKS</Typography>
      <Typography>KHUYỂN MÃI SHOCK NHẤT</Typography>
      <Typography>TOP SẢN PHẨM BÁN CHẠY</Typography>
      <Typography>SẢN PHẨM MỚI</Typography>
      <Typography>BẠN CÓ THỂ THÍCH</Typography>
      <Typography>TOYS</Typography>
      <Typography>GAME</Typography>
      <Typography>ELECTRONICS</Typography>
      <Typography>FOOD</Typography>
      <WhyChooseUsBanner />
      <VideoBanner />
    </Stack>
  );
};

export default HomePage;
