import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { IErrorResponse, ResponseType } from '@app/types/common';
import { UserAddressResponseType, UserTypeResponse } from '@app/types/user';

import { deleteAddress, getListAddress, getUser } from '../user';

export const useGetUser = (): UseQueryResult<UserTypeResponse> => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      return getUser();
    }
  });
};

export const useGetListAddress = (): UseQueryResult<UserAddressResponseType[]> => {
  return useQuery({
    queryKey: ['addressList'],
    queryFn: async () => {
      return getListAddress();
    }
  });
};

export const useDeleteAddress = (): UseMutationResult<ResponseType, IErrorResponse, string> => {
  return useMutation({
    mutationFn: deleteAddress
  });
};
