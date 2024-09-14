import { UserTypeResponse } from '../user';

export type ResultResponseType = {
  message: string;
  status: number;
  result: UserTypeResponse;
};
