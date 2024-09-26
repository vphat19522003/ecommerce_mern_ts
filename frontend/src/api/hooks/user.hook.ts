import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

import { AddressFormSchemaType } from '@app/pages/userSetting/userAddress/components/schemas';
import { ResultResponseType } from '@app/types/auth';
import { IErrorResponse, ResponseType } from '@app/types/common';
import { UserAddressResponseType, UserTypeResponse } from '@app/types/user';

import { addAddress, deleteAddress, getListAddress, getUser, setDefaultAddress } from '../user';

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

export const useAddAddress = (): UseMutationResult<ResultResponseType, IErrorResponse, AddressFormSchemaType> => {
  return useMutation({
    mutationFn: addAddress
  });
};

export const useSetDefaultAddress = (): UseMutationResult<ResultResponseType, IErrorResponse, string> => {
  return useMutation({
    mutationFn: setDefaultAddress
  });
};
