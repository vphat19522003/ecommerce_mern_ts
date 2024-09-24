import { Anchor, Delete, EmojiTransportation, Home, Map, VpnLock } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const shippingPlace = {
  Private: <VpnLock />,
  Home: <Home />,
  Company: <EmojiTransportation />
};

const AddressList = (): JSX.Element => {
  return (
    <>
      {Array.from({ length: 4 }, (_, idx) => (
        <Stack key={idx} spacing={4}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography className='text-white rounded-full bg-blue-700 px-2'>{idx}</Typography>

            <Stack direction={'row'}>
              <IconButton color='primary'>
                <Anchor />
              </IconButton>
              <IconButton color='secondary'>
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
          <Stack spacing={5}>
            <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
              <p className='w-28'>Address: </p>
              <p className='font-black'>123 DVH P.2 Quận 7 TP.HCM</p>
            </Stack>
            <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
              <p className='w-28'>District: </p>
              <p className='font-black'>Quận 7</p>
            </Stack>
            <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
              <p className='w-28'>City: </p>
              <p className='font-black'>Hồ Chí Minh</p>
            </Stack>
            <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
              <p className='w-28'>Place: </p>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                {shippingPlace['Home']}
                <p className='font-black'>Home</p>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <ButtonForm variant='contained' color='primary' className='px-2'>
              <Stack direction={'row'} spacing={1}>
                <Map />
                <p>Check map</p>
              </Stack>
            </ButtonForm>
          </Stack>
          <Divider orientation='horizontal' className='mt-5' />
        </Stack>
      ))}
    </>
  );
};

export default AddressList;
