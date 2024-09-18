import { useState } from 'react';

import { List } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useDevice } from '@app/hooks/useDevice';

import { categoryList } from '../mobileSidebar';

const Sidebar = (): JSX.Element => {
  const checkPath = ['user'];
  const isActivePath = checkPath.includes(window.location.pathname.split('/')[1]);

  const [isHovering, setIsHovering] = useState<boolean>(!isActivePath);
  const { isMobile } = useDevice();

  const handleMouseLeave = () => {
    if (isActivePath) setIsHovering(false);
  };

  const handleMouseEnter = () => {
    if (isActivePath) setIsHovering(true);
  };

  return (
    <Stack
      direction={'column'}
      className={`relative ${!isActivePath ? 'shadow-md' : 'bg-blue-700 text-white'}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        className='border-b-[1px] border-solid border-t-0 border-x-0 border-gray-100 py-2 pl-2'>
        <List />
        <Typography variant='h5' className={`py-1 text-xl font-bold ${isActivePath ? 'text-white' : 'text-blue-500'}`}>
          Menu
        </Typography>
      </Stack>
      {isHovering && (
        <Stack
          direction={'column'}
          className={`absolute top-full left-0 transition-all duration-300 ease-in-out ${isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-white w-full z-10 shadow-md rounded-br-lg rounded-bl-lg ${isMobile ? 'h-[220px] mt-[80px]' : 'h-[460px]'}`}>
          {categoryList.map((category) => (
            <Stack direction={'row'} spacing={2} key={category.id} className='pl-2 py-2' alignItems={'center'}>
              <img src={category.categoryImg} alt='' className='object-contain size-10' />

              <Typography variant='h6' className='text-black text-md'>
                {category.categoryName}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Sidebar;
