import { Divider, Stack, Typography } from '@mui/material';

import CartProductItem from './CartProductItem';

const CartProductList = (): JSX.Element => {
  return (
    <>
      <Typography className='px-4 py-2 text-2xl font-bold'>Giỏ hàng</Typography>
      <Divider />
      <Stack className='px-4 py-2'>
        <Typography className='text-lg mb-4'>
          Bạn đang có <b>1 sản phẩm</b> trong giỏ hàng
        </Typography>
        <Stack spacing={4}>
          <CartProductItem />
          <CartProductItem />
          <CartProductItem />
        </Stack>
      </Stack>
    </>
  );
};

export default CartProductList;
