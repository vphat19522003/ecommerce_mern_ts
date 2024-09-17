import { Box, Stack } from '@mui/material';

import BannerSlider from '@app/components/molecules/bannerSlider';
import { useDevice } from '@app/hooks/useDevice';

const MainBanner = (): JSX.Element => {
  const { isMobile } = useDevice();

  return (
    <Box className={`px-2 lg:px-44 sm:px-10 bg-slate-100 py-4 ${isMobile ? 'h-[220px] mt-[80px]' : 'h-[400px]'}`}>
      <Stack direction='row' spacing={2} className='h-full'>
        {!isMobile ? (
          <>
            <Box className='w-1/5'></Box>
            <Stack className='w-4/5' direction={'row'}>
              <Box className='w-full h-full px-4'>
                <BannerSlider />
              </Box>
            </Stack>
          </>
        ) : (
          <Box className='w-full h-full'>
            <BannerSlider />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default MainBanner;
