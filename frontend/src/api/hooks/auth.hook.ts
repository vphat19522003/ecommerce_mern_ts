import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { UserInfoValidType } from '@app/pages/signUp/userInformation/schema';
import { SignUpResponseType } from '@app/types/auth';

import { signUp } from '../auth';

export const useSignUp = (): UseMutationResult<
  SignUpResponseType,
  unknown,
  Omit<UserInfoValidType, 'confirmPassword'>
> => {
  return useMutation({
    mutationFn: signUp
  });
};
