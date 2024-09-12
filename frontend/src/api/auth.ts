import axiosCustom from '@app/config/axios';
import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { VerifyOTPValidateType } from '@app/pages/signUp/verifyOTP/schema';
import { ResultResponseType } from '@app/types/auth';

export const signUp = async ({
  email,
  password,
  username
}: Omit<UserInfoValidType, 'confirmPassword'>): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/auth/register', {
    email,
    password,
    username
  });

  return res.data;
};

export const verifyOTP = async ({ code: verify_otp, email }: VerifyOTPValidateType): Promise<ResultResponseType> => {
  const res = await axiosCustom.post('/auth/verify-otp', {
    verify_otp,
    email
  });

  return res.data;
};
