import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { RootState } from '@app/store';

const HeaderAction = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Stack direction={'row'} spacing={10} alignItems={'center'}>
      <Link
        to={'/user-setting'}
        className='text-sm text-blue-700 no-underline transition-colors duration-300 hover:text-blue-600'>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          className='relative transition-colors duration-300 cursor-pointer hover:text-blue-500'>
          <AccountCircle fontSize='large' className='mr-2 text-blue-700 ' />

          {user ? user.username : 'Login'}
        </Stack>
      </Link>
      <Link className='text-sm text-pink-500 no-underline transition-colors duration-300 hover:text-pink-600' to='/'>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          className='transition-colors duration-300 cursor-pointer hover:text-pink-700'>
          <ShoppingCart fontSize='large' className='mr-2 text-pink-500' />
          Shopping Cart
        </Stack>
      </Link>
    </Stack>
  );
};

export default HeaderAction;
