import React from 'react';

import { LocalPolice, LocalShipping, PhoneCallback } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import Sidebar from '../sidebar';

const SubBanner = (): JSX.Element => {
  return (
    <Box className='px-2 lg:px-44 sm:px-16'>
      <Stack direction={'row'}>
        <Box className='w-1/6'>
          <Sidebar />
        </Box>

        <Stack direction={'row'} className='w-5/6 px-5 text-xs text-blue-700' spacing={8}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <LocalPolice className='text-2xl' />
            <p>Quality guaranteed</p>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <LocalShipping />
            <p>Fast shipping</p>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <PhoneCallback />
            <p>Contact: 0986552233</p>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SubBanner;
