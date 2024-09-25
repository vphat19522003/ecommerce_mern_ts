import axiosCustom from '@app/config/axios';
import { ResponseType } from '@app/types/common';
import { UserAddressResponseType, UserTypeResponse } from '@app/types/user';

export const getUser = async (): Promise<UserTypeResponse> => {
  const res = await axiosCustom.get('/user/get-user');
  return res.data.result;
};

export const getListAddress = async (): Promise<UserAddressResponseType[]> => {
  const res = await axiosCustom.get('/user/get-list-address');

  return res.data.result;
};

export const deleteAddress = async (addressId: string): Promise<ResponseType> => {
  const res = await axiosCustom.post(`/user/delete-address?address_id=${addressId}`);

  return res.data;
};
