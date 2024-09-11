export type SignUpResult = {
  _id?: string;
  username: string;
  email: string;
  isVerified?: boolean;
};

export type SignUpResponseType = {
  message: string;
  status: number;
  result: SignUpResult;
};
