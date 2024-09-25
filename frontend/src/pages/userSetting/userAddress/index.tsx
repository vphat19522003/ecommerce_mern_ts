import { useRef } from 'react';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteAddress, useGetListAddress } from '@app/api/hooks/user.hook';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import { IErrorResponse } from '@app/types/common';
import { UserAddressResponseType } from '@app/types/user';

import AddressAction from './components/addressAction';
import AddressForm from './components/addressForm';
import AddressList from './components/addressList';

const UserAddress = (): JSX.Element => {
  const dialogRef = useRef<IDialogRef>(null);
  const queryClient = useQueryClient();

  const { data: addressList = [] } = useGetListAddress();
  const { mutate: deleteAddress } = useDeleteAddress();

  const handleOpenDialog = () => {
    dialogRef.current?.show();
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId, {
      onSuccess: (data) => {
        queryClient.setQueryData(['addressList'], (oldData: UserAddressResponseType[] | undefined) => {
          return oldData?.filter((address) => address._id !== addressId);
        });
        toast.success(data.message);
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message);
      }
    });
  };

  return (
    <>
      <Stack spacing={8} className='p-5'>
        <AddressAction handleOpenDialog={handleOpenDialog} />
        <AddressList addressList={addressList} handleDeleteAddress={handleDeleteAddress} />
      </Stack>
      <ConfirmPopup title='Add new address' ref={dialogRef} confirmLabel='Add'>
        <AddressForm />
      </ConfirmPopup>
    </>
  );
};

export default UserAddress;
