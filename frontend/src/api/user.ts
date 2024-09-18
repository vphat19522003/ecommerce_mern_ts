import axiosCustom from '@app/config/axios';
import { UserTypeResponse } from '@app/types/user';

export const getUser = async (): Promise<UserTypeResponse> => {
  const res = await axiosCustom.get('/user/get-user');
  return res.data;
};
