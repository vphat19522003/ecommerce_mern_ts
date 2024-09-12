import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { VerifyOTPValidateType } from '@app/pages/signUp/verifyOTP/schema';
import { ResultResponseType } from '@app/types/auth';

import { signUp, verifyOTP } from '../auth';

export const useSignUp = (): UseMutationResult<
  ResultResponseType,
  unknown,
  Omit<UserInfoValidType, 'confirmPassword'>
> => {
  return useMutation({
    mutationFn: signUp
  });
};

export const useVerifyOTP = (): UseMutationResult<ResultResponseType, unknown, VerifyOTPValidateType> => {
  return useMutation({
    mutationFn: verifyOTP
  });
};
