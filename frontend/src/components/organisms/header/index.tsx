import React, { useEffect, useState } from 'react';

import { Menu } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

import HeaderAction from '@app/components/molecules/headerAction';
import HeaderLogo from '@app/components/molecules/headerLogo';
import HeaderSearch from '@app/components/molecules/headerSearch';

const HeaderComponent = () => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);

      // Hiện header phụ khi scroll qua 100px
      if (currentScrollY > 400) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Box className='px-2 md:px-48 sm:px-20'>
        <Stack className='w-full py-4 bg-white' direction={'row'} alignItems={'center'} spacing={10}>
          <Box sx={{ flex: '1 1 10%' }}>
            <HeaderLogo font_size='36px' img_size={15} />
          </Box>
          <Box sx={{ flex: '3 1 60%' }}>
            <HeaderSearch />
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
          <Box className='px-2 md:px-32 sm:px-20'>
            <Stack direction={'row'} alignItems={'center'} spacing={10}>
              <Box sx={{ flex: '1 1 10%' }}>
                <Stack direction={'row'} spacing={4}>
                  <button onClick={toggleSidebar} className='p-2 text-black bg-gray-100 rounded-md'>
                    <Stack alignItems={'center'}>
                      <Menu />
                      Menu
                    </Stack>
                  </button>
                  <HeaderLogo font_size='30px' img_size={14} />
                </Stack>
              </Box>
              <Box sx={{ flex: '1 1 60%' }}>
                <HeaderSearch />
              </Box>
              <Box className='-mt-4' sx={{ flex: '1 1 30%' }}>
                <HeaderAction />
              </Box>
            </Stack>
          </Box>
        </motion.div>
      )}
    </>

    // <div>
    //   {/* Header chính */}
    //   <header className='fixed top-0 left-0 z-50 w-full bg-white shadow-md'>
    //     <div className='flex items-center justify-between p-4'>
    //       <h1 className='text-xl font-bold'>Logo</h1>
    //       <div className='flex items-center gap-4'>
    //         <input type='text' placeholder='Tìm kiếm sản phẩm...' className='p-2 border rounded-md' />
    //         <span>User</span>
    //         <span>Giỏ hàng</span>
    //       </div>
    //     </div>
    //     {/* Sidebar bên trái */}
    //     <div className='fixed top-0 left-0 w-64 h-full text-white bg-gray-800'>
    //       <ul>
    //         <li>Category 1</li>
    //         <li>Category 2</li>
    //         <li>Category 3</li>
    //       </ul>
    //     </div>
    //   </header>

    //   {/* Header phụ xuất hiện khi scroll */}
    //   {showStickyHeader && (
    //     <motion.div
    //       initial={{ y: -100, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       exit={{ y: -100, opacity: 0 }}
    //       transition={{ duration: 0.4, ease: 'easeInOut' }}
    //       className='fixed top-0 left-0 z-50 w-full bg-blue-600 shadow-md'>
    //       <div className='flex items-center justify-between p-4'>
    //         <h1 className='text-white'>Logo</h1>
    //         <button onClick={toggleSidebar} className='p-2 text-black bg-gray-100 rounded-md'>
    //           Menu
    //         </button>
    //       </div>
    //     </motion.div>
    //   )}

    //   {/* Sidebar menu khi nhấn vào nút Menu trên header phụ */}
    //   {showSidebar && (
    //     <motion.div
    //       initial={{ x: '100%', opacity: 0 }}
    //       animate={{ x: showSidebar ? 0 : '100%', opacity: showSidebar ? 1 : 0 }}
    //       exit={{ x: '100%', opacity: 0 }}
    //       transition={{ duration: 0.3, ease: 'easeInOut' }}
    //       className='fixed top-0 right-0 z-50 w-64 h-full text-white bg-gray-800'>
    //       <div className='p-4'>
    //         <button onClick={toggleSidebar} className='text-right text-white'>
    //           Close
    //         </button>
    //         <ul>
    //           <li>Category 1</li>
    //           <li>Category 2</li>
    //           <li>Category 3</li>
    //         </ul>
    //       </div>
    //     </motion.div>
    //   )}
    // </div>
  );
};

export default HeaderComponent;
