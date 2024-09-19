import { Stack } from '@mui/material';

import AvatarInfo from './components/avatarInfo';
import GeneralInfo from './components/generalInfo';
import PersonalInfo from './components/personalInfo';

const UserAccount = (): JSX.Element => {
  return (
    <Stack spacing={8} className='p-5'>
      <Stack>
        <GeneralInfo />
      </Stack>
      <Stack>
        <AvatarInfo />
      </Stack>
      <Stack>
        <PersonalInfo />
      </Stack>
    </Stack>
  );
};

export default UserAccount;
