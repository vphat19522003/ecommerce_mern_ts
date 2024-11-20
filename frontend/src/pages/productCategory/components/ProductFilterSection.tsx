import { ArrowDropDown, FilterAlt } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, Rating, Stack, Typography } from '@mui/material';

import FreeShip from '@app/assets/FreeShip.png';
import TopDeal from '@app/assets/TopDeal.png';
import ButtonForm from '@app/components/atoms/button';
import { useDevice } from '@app/hooks/useDevice';

const ProductFilterSection = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack
      className='bg-white rounded-lg px-4 py-2'
      style={{
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
      }}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='py-2'>
        <Typography className='font-bold'>Tất cả sản phẩm</Typography>
        <ButtonForm variant='outlined' className='rounded-lg'>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <FilterAlt className='text-md' />
            <Typography className='text-md '>Bộ lọc</Typography>
          </Stack>
        </ButtonForm>
      </Stack>
      <Divider />
      <Stack className='py-3' direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'}>
        {/* Filter 1 */}
        {!isMobile && (
          <Stack direction={'row'} spacing={2}>
            <FormControlLabel
              control={<Checkbox checked={false} />}
              label={
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <img src={FreeShip} className='object-contain' width='80px' height='auto' />
                </Stack>
              }
            />
            <FormControlLabel
              control={<Checkbox checked={false} />}
              label={
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <img src={TopDeal} className='object-contain' width='80px' height='auto' />
                </Stack>
              }
            />
            <FormControlLabel
              control={<Checkbox checked={false} />}
              label={
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Rating name='rating' defaultValue={4} precision={0.5} size='small' readOnly />
                  <Typography className='text-sm'>từ 4 sao</Typography>
                </Stack>
              }
            />
          </Stack>
        )}

        {/* Filter 2 */}
        <Stack direction={'row'} spacing={2} alignItems={'center'} className={`${isMobile && 'ml-auto'}`}>
          <Typography className='text-md text-slate-400'>Sắp xếp</Typography>
          <ButtonForm variant='outlined' className='rounded-3xl'>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography className='text-md'>Phổ biến</Typography>
              <ArrowDropDown className='text-md' />
            </Stack>
          </ButtonForm>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductFilterSection;
