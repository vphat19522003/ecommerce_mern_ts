import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import AddressModel, { AddressItemType, addressType } from '@app/models/address.model';

export type AddressInfo = {
  _id?: string;
  userId: string;
  address_detail: string;
  address_street: string;
  address_city: AddressItemType;
  address_district: AddressItemType;
  address_ward: AddressItemType;
  address_type: addressType;
  isSetDefault?: boolean;
};

class LocationRepository {
  static async createLocation({
    userId,
    address_city,
    address_district,
    address_ward,
    address_street,
    address_type,
    address_detail
  }: AddressInfo): Promise<AddressInfo> {
    const newAddress = await AddressModel.create({
      userId: new Types.ObjectId(userId),
      address_city,
      address_district,
      address_ward,
      address_street,
      address_type,
      address_detail
    });
    if (!newAddress) throw new CustomError('Failed to create address', STATUS_CODE.INTERNAL_SERVER_ERROR);

    return newAddress.toObject<AddressInfo>();
  }
}

export default LocationRepository;
