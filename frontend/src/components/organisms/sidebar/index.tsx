import { List } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';

import { categoryList } from '../mobileSidebar';

const Sidebar = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack direction={'column'} className='relative px-4 shadow-md'>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        className='border-b-[1px] border-solid border-t-0 border-x-0 border-gray-100 py-2'>
        <List />
        <Typography variant='h5' className='py-1 text-xl font-bold text-blue-700'>
          Menu
        </Typography>
      </Stack>

      <Stack
        direction={'column'}
        className={`absolute top-full left-0 bg-white w-full z-10 shadow-md rounded-br-lg rounded-bl-lg ${isMobile ? 'h-[220px] mt-[80px]' : 'h-[460px]'}`}>
        {categoryList.map((category) => (
          <Stack direction={'row'} spacing={2} key={category.id} className='px-4 py-2' alignItems={'center'}>
            <img src={category.categoryImg} alt='' className='object-contain size-10' />

            <Typography variant='h6' className='text-black text-md'>
              {category.categoryName}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
