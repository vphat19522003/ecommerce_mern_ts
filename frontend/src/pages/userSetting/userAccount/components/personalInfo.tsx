import { Map } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import { useDevice } from '@app/hooks/useDevice';

const PersonalInfo = (): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack spacing={4}>
      <Typography variant='h5'>Personal</Typography>
      <form>
        <Stack className={`${isMobile ? 'w-[80%]' : 'w-[50%]'}`} spacing={2}>
          <InputField variant='outlined' backgroundColor='transparent' label='Fullname' />
          <InputField variant='outlined' backgroundColor='transparent' label='Phone' />
          <InputField variant='outlined' backgroundColor='transparent' label='Email' />
          <InputField variant='outlined' backgroundColor='transparent' label='ID/Passport' />
          <InputField variant='outlined' backgroundColor='transparent' label='Gender' />
          <Stack
            direction={'row'}
            spacing={4}
            className='text-sm text-blue-700 cursor-pointer'
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Map />
            <p className='my-0 ml-2'>Manage delivery address</p>
          </Stack>
          <ButtonForm className='bg-blue-600 w-28' variant='contained'>
            Save change
          </ButtonForm>
        </Stack>
      </form>
    </Stack>
  );
};

export default PersonalInfo;
