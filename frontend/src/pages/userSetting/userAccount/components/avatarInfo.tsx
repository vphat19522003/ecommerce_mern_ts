import { Stack } from '@mui/material';

import viteAvatar from '@app/assets/vite.svg';

const AvatarInfo = (): JSX.Element => {
  return (
    <Stack
      direction={'row'}
      spacing={8}
      className='border-solid border-y-[0.5px] border-gray-200 border-x-0 py-4'
      alignItems={'center'}>
      <Stack>
        <img
          src={viteAvatar}
          alt=''
          className='w-[140px] h-[140px] rounded-full border-solid border-gray-200 object-cover border-2 shadow-md'
        />
      </Stack>
      <Stack>
        <input type='file' />
        <p className='text-md text-gray-500'>Please image has size less than 5MB</p>
      </Stack>
    </Stack>
  );
};

export default AvatarInfo;
