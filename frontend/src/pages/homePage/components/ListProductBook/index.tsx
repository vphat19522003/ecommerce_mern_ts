import { useState } from 'react';

import { AutoStories } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';

import CustomTabPanel from '@app/components/organisms/customTabPanel';
import ProductCard from '@app/components/organisms/productCard';
import { useDevice } from '@app/hooks/useDevice';

const ListProductBook = (): JSX.Element => {
  const [value, setValue] = useState(0);
  const { isMobile } = useDevice();

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
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Stack>
  );
};

export default ListProductBook;
