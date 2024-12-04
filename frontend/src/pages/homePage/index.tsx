import { useState } from 'react';

import { Box, Grid, Stack } from '@mui/material';

import ImageViewer from '@app/components/organisms/imageViewer';
import MainBanner from '@app/components/organisms/mainBanner';
import { useDevice } from '@app/hooks/useDevice';

import ListProductBook from './components/ListProductBook';
import VideoBanner from './components/VideoBanner';

const HomePage = (): JSX.Element => {
  const { isMobile } = useDevice();
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const images = [
    'https://via.placeholder.com/800x600?text=Image+1',
    'https://via.placeholder.com/800x600?text=Image+2',
    'https://via.placeholder.com/800x600?text=Image+3',
    'https://via.placeholder.com/800x600?text=Image+4',
    'https://via.placeholder.com/800x600?text=Image+5',
    'https://via.placeholder.com/800x600?text=Image+6',
    'https://via.placeholder.com/800x600?text=Image+7',
    'https://via.placeholder.com/800x600?text=Image+8',
    'https://via.placeholder.com/800x600?text=Image+9',
    'https://via.placeholder.com/800x600?text=Image+10',
    'https://via.placeholder.com/800x600?text=Image+11',
    'https://via.placeholder.com/800x600?text=Image+12',
    'https://via.placeholder.com/800x600?text=Image+13',
    'https://via.placeholder.com/800x600?text=Image+14',
    'https://via.placeholder.com/800x600?text=Image+15',
    'https://via.placeholder.com/800x600?text=Image+16',
    'https://via.placeholder.com/800x600?text=Image+17',
    'https://via.placeholder.com/800x600?text=Image+18',
    'https://via.placeholder.com/800x600?text=Image+19',
    'https://via.placeholder.com/800x600?text=Image+20',
    'https://via.placeholder.com/800x600?text=Image+21',
    'https://via.placeholder.com/800x600?text=Image+22',
    'https://via.placeholder.com/800x600?text=Image+23',
    'https://via.placeholder.com/800x600?text=Image+24'
  ];

  const handleImageClick = (index: number) => {
    setViewerIndex(index); // Ghi lại chỉ số ảnh được click
    setViewerOpen(true); // Mở ImageViewer
  };
  return (
    <>
      <MainBanner />
      <Stack className={`${isMobile && 'pl-2'} py-6 `}>
        <ListProductBook />
        <ListProductBook />
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid
              item
              xs={6}
              sm={3}
              key={index}
              onClick={() => handleImageClick(index)} // Bắt sự kiện click
              sx={{ cursor: 'pointer' }}>
              <Box
                component='img'
                src={image}
                alt={`Image ${index}`}
                sx={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Hiển thị ImageViewer khi người dùng click */}
        {isViewerOpen && (
          <ImageViewer images={images} initialIndex={viewerIndex} onClose={() => setViewerOpen(false)} />
        )}
        {/* <Typography>KHUYỂN MÃI SHOCK NHẤT</Typography>
    <Typography>TOP SẢN PHẨM BÁN CHẠY</Typography>
    <Typography>SẢN PHẨM MỚI</Typography>
    <Typography>BẠN CÓ THỂ THÍCH</Typography>
    <Typography>TOYS</Typography>
    <Typography>GAME</Typography>
    <Typography>ELECTRONICS</Typography>
    <Typography>FOOD</Typography> */}

        {/* <WhyChooseUsBanner /> */}
        {/* <ParallaxBanner /> */}
        <VideoBanner />
      </Stack>
    </>
  );
};

export default HomePage;
