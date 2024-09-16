import { useDispatch } from 'react-redux';

import { Menu, ShoppingCart } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import HeaderSearch from '@app/components/molecules/headerSearch';
import { toggleSidebar } from '@app/redux/uiSlice';

const MobileHeader = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Box className='fixed top-0 left-0 z-50 w-full py-2 bg-white shadow-md'>
      <Stack className='w-full ' direction={'row'} alignItems={'center'} spacing={2}>
        <Stack className='basis-[18%]'>
          <button
            className='text-black bg-transparent bg-gray-100 border-none rounded-md hover:text-blue-700'
            onClick={() => dispatch(toggleSidebar())}>
            <Stack alignItems={'center'}>
              <Menu />
            </Stack>
          </button>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className='w-full'>
          <Box className='basis-[85%] mt-2'>
            <HeaderSearch />
          </Box>
          <Stack className='basis-[15%]' justifyContent={'center'} direction={'row'}>
            <ShoppingCart fontSize='medium' className='text-pink-500' />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MobileHeader;
