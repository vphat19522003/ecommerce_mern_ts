import { useRef } from 'react';

import { Stack } from '@mui/material';

import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';

import AddressAction from './components/addressAction';
import AddressForm from './components/addressForm';
import AddressList from './components/addressList';

const UserAddress = (): JSX.Element => {
  const dialogRef = useRef<IDialogRef>(null);

  const handleOpenDialog = () => {
    dialogRef.current?.show();
  };
  return (
    <>
      <Stack spacing={8} className='p-5'>
        <AddressAction handleOpenDialog={handleOpenDialog} />
        <AddressList />
      </Stack>
      <ConfirmPopup title='Add new address' ref={dialogRef} confirmLabel='Add'>
        <AddressForm />
      </ConfirmPopup>
    </>
  );
};

export default UserAddress;
