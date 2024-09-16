import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useLogOut } from '@app/api/hooks/auth.hook';
import { clearUser } from '@app/redux/authSlice';
import { IErrorResponse } from '@app/types/common';

const HomePage = () => {
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
    <>
      <div className='mt-14'>HOME PAGE</div>
    </>
  );
};

export default HomePage;
