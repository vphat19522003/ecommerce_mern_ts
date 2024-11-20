import { Link } from 'react-router-dom';

import { Delete, Inventory } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

import NetflixImg from '@app/assets/NETFLIX-1thang.png';
import QuantityGroupButton from '@app/components/organisms/quantityGroupButton';
import { useDevice } from '@app/hooks/useDevice';

const CartProductItem = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      className='rounded-lg border-[0.5px] border-solid border-slate-300 p-5'
      spacing={4}>
      {/* Cart Product Image */}
      <Stack className={`${isMobile ? 'w-full' : 'w-4/12'} rounded-lg overflow-hidden max-h-[200px]`}>
        <img src={NetflixImg} alt='Product Image' className='w-full h-full object-contain rounded-lg' />
      </Stack>
      {/* Cart Product INFO + ACTION */}
      <Stack className={`${isMobile ? 'w-full' : 'w-8/12'} mt-4`} spacing={2}>
        {/* INFO */}
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-between'}>
          <Stack>
            <Link to={'/'} className='no-underline text-black'>
              <Typography className='font-bold'>Netflix Premium 1 tháng - Tài khoản</Typography>
            </Link>
            <Typography className='text-md'>App, Giải trí, Xem phim</Typography>
          </Stack>

          <Stack spacing={4}>
            <Stack direction='row' alignItems={'center'} spacing={2} className={`${isMobile && 'mt-4'}`}>
              <Typography className='text-xl font-bold'>89.000đ</Typography>
              <Typography className='text-sm line-through text-slate-400 font-semibold'>260.000đ</Typography>
            </Stack>
            <QuantityGroupButton />
          </Stack>
        </Stack>

        <Divider className='my-3' />
        {/* ACTION */}
        <Stack direction={'row'} justifyContent={'space-between'} className='mt-0'>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Inventory />
            <Typography className='text-red-500 text-md'>Tình trạng: </Typography>
            <Typography className='text-green-700 text-md'>Còn hàng</Typography>
          </Stack>
          <IconButton>
            <Delete className='text-red-600' />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartProductItem;
