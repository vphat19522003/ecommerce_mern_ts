import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useLogOut } from '@app/api/hooks/auth.hook';
import ButtonForm from '@app/components/atoms/button';
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
      <div>HOME PAGE</div>
      <ButtonForm onClick={handleLogout}>Logout</ButtonForm>
    </>
  );
};

export default HomePage;
