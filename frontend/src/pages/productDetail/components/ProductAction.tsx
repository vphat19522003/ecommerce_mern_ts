import { ShoppingCart } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import QuantityGroupButton from '@app/components/organisms/quantityGroupButton';
import { useDevice } from '@app/hooks/useDevice';

const ProductAction = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack direction={'column'} className={`p-4 ${!isMobile && 'w-full'}`} spacing={4}>
      {/* Quantity */}
      <Stack spacing={2}>
        <Typography className='font-extrabold'>Quantity</Typography>
        {/* Quantity action */}
        <QuantityGroupButton />
      </Stack>
      {/* Price */}
      <Stack spacing={2}>
        <Typography className='font-extrabold text-xl'>Total</Typography>
        <Typography className='text-3xl font-semibold'>$100.000</Typography>
      </Stack>
      {/* Group Action Button */}
      <Stack spacing={2}>
        <ButtonForm variant='outlined' className='bg-pink-500 text-white border-none '>
          <Typography>Buy Now</Typography>
        </ButtonForm>
        <ButtonForm variant='outlined'>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography className='text-sm'>Add To Cart</Typography>
            <ShoppingCart />
          </Stack>
        </ButtonForm>
      </Stack>
    </Stack>
  );
};

export default ProductAction;
