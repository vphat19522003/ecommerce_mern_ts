import { Divider, Rating, Stack, Typography } from '@mui/material';

import BorderLinearProgress from '@app/components/organisms/borderLinearProgress';
import { useDevice } from '@app/hooks/useDevice';

const GeneralRatingInfo = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack direction={isMobile ? 'column' : 'row'}>
      <Stack className={`min-h-64 ${isMobile ? 'w-full' : 'w-4/12'}`}>
        <Typography className='font-semibold text-md'>Tổng quan</Typography>
        {/* Rating Point */}
        <Stack direction={'row'} alignItems={'center'} spacing={4} className='mt-2'>
          <Typography className='text-4xl font-bold'>5.0</Typography>
          <Rating name='rating' defaultValue={5} precision={0.5} size='large' readOnly />
        </Stack>
        {/* Total comment */}
        <Typography className='text-md text-gray-400'>(2615 ratings)</Typography>
        {/* Total rating type */}
        <Stack spacing={2} className='mt-3'>
          {/* 5 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={5} precision={0.5} size='small' readOnly />
            <BorderLinearProgress variant='determinate' value={90} className='w-[140px]' />
            <Typography className='text-xs text-gray-500'>2000</Typography>
          </Stack>
          {/* 4 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={4} precision={0.5} size='small' readOnly />
            <BorderLinearProgress variant='determinate' value={70} className='w-[140px]' />
            <Typography className='text-xs text-gray-500'>300</Typography>
          </Stack>
          {/* 3 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={3} precision={0.5} size='small' readOnly />
            <BorderLinearProgress variant='determinate' value={20} className='w-[140px]' />
            <Typography className='text-xs text-gray-500'>230</Typography>
          </Stack>
          {/* 2 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={2} precision={0.5} size='small' readOnly />
            <BorderLinearProgress variant='determinate' value={10} className='w-[140px]' />
            <Typography className='text-xs text-gray-500'>11</Typography>
          </Stack>
          {/* 1 stars */}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Rating name='rating' defaultValue={1} precision={0.5} size='small' readOnly />
            <BorderLinearProgress variant='determinate' value={10} className='w-[140px]' />
            <Typography className='text-xs text-gray-500'>10</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} variant='middle' flexItem />
      <Stack className={`min-h-64 ${isMobile ? 'w-full' : 'w-8/12'}`}></Stack>
    </Stack>
  );
};

export default GeneralRatingInfo;
