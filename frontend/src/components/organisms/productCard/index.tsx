import { useDispatch } from 'react-redux';

import { Favorite, StarBorder, Visibility } from '@mui/icons-material';
import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material';

import ShoesImage from '@app/assets/danhMuc/shoes_nike.webp';
import ButtonForm from '@app/components/atoms/button';
import { toggleProductSidebar } from '@app/redux/uiSlice';

const ProductCard = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Card className=' h-full shadow-md !p-2'>
      <CardContent className='!p-0'>
        <div className=' bg-white rounded-lg overflow-hidden w-full h-full relative'>
          <img title='shoes' src={ShoesImage} className='object-cover w-full h-full' />
          <IconButton className='absolute top-2 right-2'>
            <Favorite className='text-red-500' />
          </IconButton>
        </div>
        <Stack direction={'column'} spacing={2} className='p-4'>
          <Typography>Nike Jordan</Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction='row' alignItems={'center'} spacing={1}>
              <Typography className='text-2xl font-semibold'>$299.00</Typography>
              <Typography className='text-sm line-through'>$399.00</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'end'} spacing={1}>
              <StarBorder className='text-yellow-300 text-[22px]' />
              <Stack direction={'row'} alignItems={'end'} spacing={1}>
                <Typography className='text-base font-extrabold'>4.5</Typography>
                <Typography className='text-sm'>/5</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} className='w-full' spacing={4}>
            <ButtonForm
              className='flex-2 rounded-lg bg-transparent'
              variant='contained'
              onClick={() => dispatch(toggleProductSidebar())}>
              <Visibility className='text-blue-700' />
            </ButtonForm>
            <ButtonForm className='flex-1 rounded-lg ' variant='contained'>
              Add to cart
            </ButtonForm>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
