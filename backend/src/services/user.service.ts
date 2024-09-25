import bcrypt from 'bcrypt';
import { Request } from 'express';
import { omit } from 'lodash';
import mongoose from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import { AddressInfo } from '@app/repository/address.repository';
import AddressRepository from '@app/repository/address.repository';
import UserRepository, { UserInfo } from '@app/repository/user.repository';

class UserService {
  static async getUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const user = req.user as UserInfo;
    return omit(user, 'password', '__v', 'updatedAt');
  }

  static async updateUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const { _id } = req.user as UserInfo;
    const { fullName, phone, passport, gender } = req.body as UserInfo;

    const updatedUser = await UserRepository.updateUserById({
      _id,
      fullName,
      phone,
      passport,
      gender
    });

    return omit(updatedUser, 'password', '__v', 'updatedAt');
  }

  static async changePassword(req: IRequestCustom): Promise<void> {
    const { _id, password } = req.user as UserInfo;
    const { old_password, new_password } = req.body;

    const comparePass = bcrypt.compareSync(old_password, password);
    if (!comparePass) throw new CustomError('Current password is not match', STATUS_CODE.BAD_REQUEST);

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const newPasswordUser = await UserRepository.updateUserPassword({ _id, hashedPassword });
    if (!newPasswordUser) throw new CustomError("Can't change password", STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  static async getListAddress(req: IRequestCustom): Promise<AddressInfo[]> {
    const { _id: userId } = req.user as UserInfo;

    const addressList = await AddressRepository.getListAddressByUser(userId);

    return addressList.map((address) => omit(address, 'createdAt', 'updatedAt', '__v'));
  }

  static async addAddress(req: IRequestCustom): Promise<AddressInfo> {
    const { _id } = req.user as UserInfo;
    const { address_city, address_district, address_ward, address_street, address_type } = req.body as AddressInfo;

    if (!address_city) throw new CustomError('Address city is required', STATUS_CODE.BAD_REQUEST);
    if (!address_district) throw new CustomError('Address district is required', STATUS_CODE.BAD_REQUEST);
    if (!address_ward) throw new CustomError('Address ward is required', STATUS_CODE.BAD_REQUEST);
    if (!address_type) throw new CustomError('Address type is required', STATUS_CODE.BAD_REQUEST);
    if (!address_street) throw new CustomError('Address street is required', STATUS_CODE.BAD_REQUEST);

    const address_detail = `${address_street} ${address_ward} ${address_district} ${address_city}`;
    const newAddress = await AddressRepository.createAddress({
      userId: _id,
      address_city,
      address_district,
      address_ward,
      address_street,
      address_detail,
      address_type
    });

    return omit(newAddress, 'createdAt', 'updatedAt', '__v');
  }

  static async deleteAddress(req: Request): Promise<void> {
    const addressId = req.query.address_id as string;

    const address = await AddressRepository.getAddress(addressId);

    if (!address) throw new CustomError('Failed to get address', STATUS_CODE.INTERNAL_SERVER_ERROR);

    const result = (await AddressRepository.deleteAddress(addressId)) as mongoose.mongo.DeleteResult;

    if (result.deletedCount !== 1) throw new CustomError('Failed to delete address', STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  static async setDefaultAddress(req: IRequestCustom): Promise<AddressInfo> {
    const { _id } = req.user as UserInfo;
    const addressId = req.query.address_id as string;

    const address = await AddressRepository.getAddress(addressId);

    if (address.isSetDefault) throw new CustomError('Address is already set default', STATUS_CODE.BAD_REQUEST);

    const defaultAddress = await AddressRepository.updateStatusAddress(_id, addressId);

    return defaultAddress;
  }
}

export default UserService;
