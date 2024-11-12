import { useState } from 'react';

import { AutoStories } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

import CustomTabPanel from '@app/components/organisms/customTabPanel';
import ProductCard from '@app/components/organisms/productCard';
import ProductSlider from '@app/components/organisms/productSlider';

const ListProductBook = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack className='mt-6'>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Typography variant='h6' className='font-bold text-pink-500'>
          BOOKS
        </Typography>
        <AutoStories className='text-pink-500' />
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label='basic tabs example' value={value} onChange={handleChange}>
          <Tab label='Item One' />
          <Tab label='Item Two' />
          <Tab label='Item Three' />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProductSlider>
          {[...Array(8)].map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard />
            </SwiperSlide>
          ))}
        </ProductSlider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Stack>
  );
};

export default ListProductBook;
