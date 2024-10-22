import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { CategoryResponseType } from '@app/types/category';

import { getMainCategory } from '../category';

export const useGetMainCategory = (): UseQueryResult<CategoryResponseType[]> => {
  return useQuery({
    queryKey: ['mainCategory'],
    queryFn: getMainCategory
  });
};
