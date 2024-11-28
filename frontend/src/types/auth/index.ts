import { getProductTypeCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

import { UserTypeResponse } from '../user';

export type ResultResponseType = {
  message: string;
  status: number;
  result: UserTypeResponse;
};

export type ProductResultResponseType = Omit<ResultResponseType, 'result'> & {
  result: getProductTypeCustom[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};
