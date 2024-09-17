import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Stack } from '@mui/material';

const HeaderAction = (): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={10} alignItems={'center'}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <AccountCircle fontSize='large' className='text-blue-700' />
        <span className='text-sm'>Login/Sign up</span>
      </Stack>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <ShoppingCart fontSize='large' className='text-pink-500' />
        <span className='text-sm'>Shopping Cart</span>
      </Stack>
    </Stack>
  );
};

export default HeaderAction;
