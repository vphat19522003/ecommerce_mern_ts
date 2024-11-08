import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Close, Favorite } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import ShoesImage from '@app/assets/danhMuc/shoes_nike.webp';
import { useDevice } from '@app/hooks/useDevice';
import { closeProductSidebar, toggleProductSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

const ProductDetailSideBar = (): JSX.Element => {
  const isOpen = useSelector((state: RootState) => state.ui.showProductDetailSidebar);
  const dispatch = useDispatch();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-10 bg-black'
          onClick={() => dispatch(toggleProductSidebar())}
        />
      )}

      <motion.div
        initial={{ x: '100%' }} // Bắt đầu ở ngoài màn hình bên trái
        animate={{ x: isOpen ? '0%' : '100%' }} // Nếu mở, chuyển vào màn hình, nếu đóng, di chuyển ra ngoài
        transition={{ type: 'tween', duration: 0.5 }} // Thiết lập hiệu ứng chuyển động
        className={`fixed right-0 z-20 bg-white top-20 ${isMobile ? 'bottom-11' : 'bottom-0'} w-[280px] max-h-screen overflow-y-scroll shadow-md py-2 rounded-tl-xl rounded-bl-xl px-4`}>
        <Stack direction={'row'} justifyContent={'space-between'} className='py-2'>
          <Typography variant='h5' className=' py-2 text-xl font-bold text-blue-700'>
            Product Details
          </Typography>
          <IconButton onClick={() => dispatch(closeProductSidebar())}>
            <Close />
          </IconButton>
        </Stack>

        <Stack direction={'column'} spacing={2}>
          <div className='w-full max-h-fit rounded-lg overflow-hidden relative'>
            <img src={ShoesImage} alt='shoes' className='w-full h-full object-cover ' />
            <IconButton className='absolute top-1 right-1'>
              <Favorite className='text-red-500' />
            </IconButton>
          </div>
          <Typography className='font-bold'>Nike Jordan</Typography>
          <Typography className='text-md text-justify'>
            Image Enlargement: After shooting, you can enlarge photographs of the objects for clear zoomed view. Change
            In Aspect Ratio: Boldly crop the subject and save it with a composition that has impact.
          </Typography>
          <Stack direction={'column'} className='mt-2'>
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Price</Typography>
              <Stack direction='row' alignItems={'center'} spacing={1}>
                <Typography className='text-2xl font-semibold'>$299.00</Typography>
                <Typography className='text-sm line-through'>$399.00</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Category</Typography>
              <Typography className='text-md'>Book</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Status</Typography>
              <Typography className='text-md bg-green-500 text-white rounded-lg p-1'>Available</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} className='py-3'>
              <Typography className='text-md'>Brands</Typography>
              <Typography className='text-md'>Unknown</Typography>
            </Stack>
          </Stack>
        </Stack>
      </motion.div>
    </>
  );
};

export default ProductDetailSideBar;
