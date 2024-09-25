export type UserTypeResponse = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
};
export type AddressType = 'Home' | 'Private' | 'Company';

export type UserAddressResponseType = {
  _id: string;
  userId: string;
  address_detail: string;
  address_street: string;
  address_city: string;
  address_district: string;
  address_ward: string;
  address_type: AddressType;
  isSetDefault: boolean;
};
