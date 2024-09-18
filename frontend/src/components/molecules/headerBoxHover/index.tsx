import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logout } from '@mui/icons-material';
import { Stack } from '@mui/material';

import { useLogOut } from '@app/api/hooks/auth.hook';
import { clearUser } from '@app/redux/authSlice';
import { paths } from '@app/routes/paths';
import { IErrorResponse } from '@app/types/common';

const HeaderBoxHover = (): JSX.Element => {
  const dispatch = useDispatch();
  const { mutate: logOut } = useLogOut();
  const handleLogout = () => {
    logOut(
      {},
      {
        onSuccess: (data) => {
          dispatch(clearUser());
          toast.success(data.message);
        },
        onError: (error: IErrorResponse) => {
          toast.error(error.response.data.message);
        }
      }
    );
  };
  return (
    <Stack direction={'column'} spacing={2} className='bg-white w-full'>
      <Link to={'user/account'} className='px-2 py-4 m-0 no-underline text-blue-700 hover:bg-slate-200'>
        Account Info
      </Link>

      <Link to={paths.index} className='px-2 py-4 m-0 no-underline text-blue-700 hover:bg-slate-200'>
        Your Notification
      </Link>

      <Stack
        className='hover:bg-slate-200 cursor-pointer'
        spacing={2}
        direction={'row'}
        alignItems={'center'}
        onClick={handleLogout}>
        <p className='px-2 py-4 m-0'>Log out</p>
        <Logout />
      </Stack>
    </Stack>
  );
};

export default HeaderBoxHover;
