import axiosCustom from '@app/config/axios';
import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { SignUpResponseType } from '@app/types/auth';

export const signUp = async ({
  email,
  password,
  username
}: Omit<UserInfoValidType, 'confirmPassword'>): Promise<SignUpResponseType> => {
  const res = await axiosCustom.post('/auth/register', {
    email,
    password,
    username
  });

  return res.data;
};
