import { Menu, ShoppingCart } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import HeaderSearch from '@app/components/molecules/headerSearch';

const MobileHeader = (): JSX.Element => {
  return (
    <Box className='fixed top-0 left-0 z-50 w-full py-2 shadow-md bg-white'>
      <Stack className='w-full ' direction={'row'} alignItems={'center'}>
        <Stack className='basis-[10%]'>
          <button className='text-black bg-gray-100 rounded-md border-none bg-transparent'>
            <Stack alignItems={'center'}>
              <Menu />
            </Stack>
          </button>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className='w-full'>
          <Box className='basis-[90%] mt-2'>
            <HeaderSearch />
          </Box>
          <Stack className='basis-[10%]' justifyContent={'center'} direction={'row'}>
            <ShoppingCart fontSize='medium' className='text-pink-500' />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MobileHeader;
