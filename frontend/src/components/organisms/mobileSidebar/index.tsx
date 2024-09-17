import { useDispatch, useSelector } from 'react-redux';

import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { toggleSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

export const categoryList = [
  {
    id: 1,
    categoryName: 'Books',
    categoryImg:
      'https://image.similarpng.com/very-thumbnail/2020/12/Colorful-book-illustration-on-transparent-background-PNG.png',
    link: '/'
  },
  {
    id: 2,
    categoryName: 'Computer',
    categoryImg:
      'https://image.similarpng.com/very-thumbnail/2020/12/Colorful-book-illustration-on-transparent-background-PNG.png',
    link: '/'
  },
  {
    id: 3,
    categoryName: 'Toys',
    categoryImg:
      'https://image.similarpng.com/very-thumbnail/2020/12/Colorful-book-illustration-on-transparent-background-PNG.png',
    link: '/'
  }
];

const MobileSideBar = (): JSX.Element => {
  const isOpen = useSelector((state: RootState) => state.ui.showSidebar);
  const dispatch = useDispatch();

  return (
    <>
      {/* Lớp phủ đen mờ */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-10 bg-black'
          onClick={() => dispatch(toggleSidebar())} // Đóng sidebar khi click vào lớp phủ
        />
      )}

      <motion.div
        initial={{ x: '-100%' }} // Bắt đầu ở ngoài màn hình bên trái
        animate={{ x: isOpen ? '0%' : '-100%' }} // Nếu mở, chuyển vào màn hình, nếu đóng, di chuyển ra ngoài
        transition={{ type: 'tween', duration: 0.5 }} // Thiết lập hiệu ứng chuyển động
        className='fixed left-0 z-20 bg-white top-20 w-[180px] xl:w-[230px] min-w-[230px] h-screen shadow-md py-4 rounded-tr-xl rounded-br-xl'>
        <Typography variant='h5' className='px-4 py-2 text-xl font-bold text-blue-700 lg:pl-8'>
          Category
        </Typography>
        <Stack direction={'column'}>
          {categoryList.map((category) => (
            <Stack direction={'row'} spacing={2} key={category.id} className='px-4 py-2 lg:pl-8' alignItems={'center'}>
              <img src={category.categoryImg} alt='' className='object-contain size-10' />

              <Typography variant='h6' className='text-black text-md'>
                {category.categoryName}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </motion.div>
    </>
  );
};

export default MobileSideBar;
