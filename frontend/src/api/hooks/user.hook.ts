import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UserTypeResponse } from '@app/types/user';

import { getUser } from '../user';

export const useGetUser = (): UseQueryResult<UserTypeResponse> => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      return getUser();
    }
  });
};
