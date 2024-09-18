import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

import HeaderAction from '@app/components/molecules/headerAction';
import HeaderLogo from '@app/components/molecules/headerLogo';
import HeaderSearch from '@app/components/molecules/headerSearch';
import { useDevice } from '@app/hooks/useDevice';
import { closeSidebar, toggleSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

import MobileHeader from '../mobileHeader';

const Header = (): JSX.Element => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { isMobile } = useDevice();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 400) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);

        if (!isMobile) dispatch(closeSidebar());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, dispatch]);

  useEffect(() => {
    if (!isMobile) {
      dispatch(closeSidebar());
    }
  }, [isMobile, dispatch]);

  return (
    <>
      {isMobile && <MobileHeader />}
      {!isMobile && (
        <>
          <Box className='px-2 shadow-sm lg:px-44 md:px-20 sm:px-16'>
            <Stack className='w-full py-4 bg-white' direction={'row'} alignItems={'center'} spacing={10}>
              <Box sx={{ flex: '1 1 10%' }}>
                <HeaderLogo font_size='36px' img_size={15} />
              </Box>
              <Box sx={{ flex: '3 1 60%' }}>
                <HeaderSearch description='Enter the product name you want to search' />
              </Box>
              <Box className='-mt-4' sx={{ flex: '1 1 30%' }}>
                <HeaderAction />
              </Box>
            </Stack>
          </Box>
          {/* Header phụ xuất hiện khi scroll */}
          {showStickyHeader && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className='fixed top-0 left-0 z-50 w-full py-4 bg-white shadow-md'>
              <Box className='px-2 lg:px-44 md:px-20 sm:px-16'>
                <Stack direction={'row'} alignItems={'center'} spacing={10}>
                  <Box sx={{ flex: '1 1 10%' }}>
                    <Stack direction={'row'} spacing={4}>
                      <button
                        onClick={() => dispatch(toggleSidebar())}
                        className='p-2 text-black bg-transparent border-none rounded-md cursor-pointer hover:text-blue-700'>
                        <Stack alignItems={'center'}>
                          <Menu />
                          Menu
                        </Stack>
                      </button>
                      <HeaderLogo font_size='30px' img_size={14} />
                    </Stack>
                  </Box>
                  <Box sx={{ flex: '1 1 60%' }}>
                    <HeaderSearch description='Enter the product name you want to search' />
                  </Box>
                  <Box className='-mt-4' sx={{ flex: '1 1 30%' }}>
                    <HeaderAction />
                  </Box>
                </Stack>
              </Box>
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default Header;
