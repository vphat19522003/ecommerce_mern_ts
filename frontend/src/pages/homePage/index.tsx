import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useLogOut } from '@app/api/hooks/auth.hook';
import ButtonForm from '@app/components/atoms/button';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import { clearUser } from '@app/redux/authSlice';
import { IErrorResponse } from '@app/types/common';

const HomePage = (): JSX.Element => {
  const confirmPopupRef = useRef<IDialogRef>(null);

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

  const handleOpenPopup = () => {
    confirmPopupRef.current?.show();
  };
  return (
    <>
      <ConfirmPopup title='Test' ref={confirmPopupRef}>
        Test popup
      </ConfirmPopup>
      <ButtonForm onClick={handleOpenPopup}>Test open popup</ButtonForm>
    </>
  );
};

export default HomePage;
