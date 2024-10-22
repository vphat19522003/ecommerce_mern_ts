import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Lock, Person, PowerSettingsNew, Settings } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { useLogOut } from '@app/api/hooks/auth.hook';
import { clearUser } from '@app/redux/authSlice';
import { IErrorResponse } from '@app/types/common';

const ActionMenu = (): JSX.Element => {
  const { mutate: logOut } = useLogOut();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logOut(
      {},
      {
        onSuccess: (data) => {
          dispatch(clearUser());
          window.location.href = '/login';
          toast.success(data.message);
        },
        onError: (err: IErrorResponse) => {
          toast.error(err.response.data.message as string);
        }
      }
    );
  };
  return (
    <Stack direction={'column'} className='text-[#39465f] cursor-pointer '>
      <Stack direction={'row'}>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          className='p-6 w-1/2 border-[0.5px] border-solid border-slate-200 border-t-0 border-l-0 border-r-0 hover:text-blue-700'>
          <Person />
          <Typography>Account</Typography>
        </Stack>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          className='p-6 w-1/2 border-[0.5px] border-solid border-slate-200 border-t-0 border-r-0'>
          <Settings />
          <Typography>Settings</Typography>
        </Stack>
      </Stack>
      <Stack direction='row'>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          className='p-6 w-1/2 border-slate-200 border-t-0 border-l-0 border-solid border-[0.5px] border-b-0'>
          <Lock />
          <Typography>Lock</Typography>
        </Stack>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          className='p-6 w-1/2 hover:text-red-600'
          onClick={handleLogout}>
          <PowerSettingsNew />
          <Typography>Logout</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ActionMenu;
