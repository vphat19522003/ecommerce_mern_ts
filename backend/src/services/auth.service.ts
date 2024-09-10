import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_TIME
} from '@app/constants/tokenProperty';
import { CustomError } from '@app/core/response.error';
import KeyModel from '@app/models/key.model';
import UserRepository, { UserInfo } from '@app/repository/user.repository';
import { createPairToken } from '@app/utils/token.util';

import KeyService from './key.service';
import OTPService from './otp.service';

class AuthService {
  static async register(req: Request, res: Response): Promise<Omit<UserInfo, 'password'>> {
    const { username, email, password } = req.body;

    //Check exist email and username
    const existEmail = await UserRepository.findUserByEmail({ email });
    if (existEmail) throw new CustomError('Email is already exist', STATUS_CODE.BAD_REQUEST);

    const existUsername = await UserRepository.findUserByUsername({ username });
    if (existUsername) throw new CustomError('Username is already exists', STATUS_CODE.BAD_REQUEST);

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userCreated = await UserRepository.createUser({ username, email, password: hashedPassword });

    //generate key
    const public_key = randomBytes(64).toString('hex');
    const private_key = randomBytes(64).toString('hex');

    const { access_token, refresh_token } = createPairToken({
      payload: {
        _id: userCreated._id as string,
        email: userCreated.email,
        username: userCreated.username,
        isVerified: userCreated.isVerified as boolean
      },
      key: {
        public_key,
        private_key
      }
    });

    await KeyService.createUserKey({
      userId: userCreated._id as string,
      public_key,
      private_key,
      access_token,
      refresh_token
    });

    res.cookie('access_token', access_token, {
      maxAge: ACCESS_TOKEN_TIME,
      expires: ACCESS_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    res.cookie('refresh_token', refresh_token, {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    res.cookie('client_id', userCreated._id?.toString(), {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    const otp = await OTPService.generateOTP({ userId: userCreated._id as string, email: userCreated.email });

    if (otp) {
      await OTPService.sendOTP(otp);
    } else {
      throw new CustomError('Error generating OTP', STATUS_CODE.NOT_FOUND);
    }

    return omit(userCreated, 'password');
  }

  static async login(req: Request, res: Response): Promise<Omit<UserInfo, 'password'>> {
    const { username, password } = req.body;

    const user = await UserRepository.findUserByUsername({ username });

    if (!user) throw new CustomError('User not found', STATUS_CODE.BAD_REQUEST);

    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) throw new CustomError('Wrong password', STATUS_CODE.UNAUTHORIZED);

    const private_key = randomBytes(64).toString('hex');
    const public_key = randomBytes(64).toString('hex');

    const { access_token, refresh_token } = createPairToken({
      payload: {
        _id: user._id as string,
        email: user.email,
        isVerified: user.isVerified as boolean,
        username: user.username
      },
      key: {
        private_key,
        public_key
      }
    });
    const oldKeyStore = await KeyModel.findOneAndDelete({ userId: user._id }).lean();

    await KeyModel.findOneAndUpdate(
      { userId: new Types.ObjectId(user?._id) },

      {
        $set: { access_token, public_key, private_key, refresh_token },
        $addToSet: { used_refresh_tokens: oldKeyStore?.refresh_token }
      },
      { upsert: true, new: true }
    ).lean();

    res.cookie('access_token', access_token, {
      maxAge: ACCESS_TOKEN_TIME,
      expires: ACCESS_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    res.cookie('refresh_token', refresh_token, {
      maxAge: ACCESS_TOKEN_TIME,
      expires: ACCESS_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    res.cookie('client_id', user._id?.toString(), {
      maxAge: REFRESH_TOKEN_TIME,
      expires: REFRESH_TOKEN_EXPIRED,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: false,
      sameSite: 'none'
    });

    return omit(user, 'password');
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const client_id = req.cookies['client_id'];

    if (!client_id) throw new CustomError('Not provided client_id', STATUS_CODE.UNAUTHORIZED);

    const user = await UserRepository.findUserById(client_id);

    if (!user) throw new CustomError('User not found', STATUS_CODE.UNAUTHORIZED);

    await KeyService.deleteKeyByUserId(client_id);

    res.clearCookie('client_id');
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  static async verifyRefreshToken(req: Request, res: Response): Promise<void> {
    const refresh_token = req.cookies['refresh_token'];
    const client_id = req.cookies['client_id'];

    if (!refresh_token || !client_id) {
      throw new CustomError('Unauthorized - no refresh token or client id provided', STATUS_CODE.UNAUTHORIZED);
    }

    // client_id format
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      throw new CustomError('Invalid client ID format', STATUS_CODE.BAD_REQUEST);
    }

    //find user
    const user = await UserRepository.findUserById(client_id);
    if (!user) throw new CustomError('User not found', STATUS_CODE.UNAUTHORIZED);

    const key = await KeyService.findKeyByUserId(client_id);
    if (!key) {
      throw new CustomError('Token not found', STATUS_CODE.BAD_REQUEST);
    }

    if (key.used_refresh_tokens?.includes(refresh_token)) {
      throw new CustomError('Refresh token already used', STATUS_CODE.BAD_REQUEST);
    }

    try {
      jwt.verify(refresh_token, key.private_key);

      const public_key = randomBytes(64).toString('hex');
      const private_key = randomBytes(64).toString('hex');

      const token = createPairToken({
        payload: {
          _id: user._id as string,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified as boolean
        },
        key: {
          private_key,
          public_key
        }
      });

      await KeyModel.findOneAndUpdate(
        { userId: new Types.ObjectId(user?._id) },

        {
          $set: { access_token: token.access_token, public_key }
          //$addToSet: { used_refresh_tokens: refresh_token }
        },
        { upsert: true, new: true }
      ).lean();

      res.cookie('access_token', token.access_token, {
        maxAge: ACCESS_TOKEN_TIME,
        expires: ACCESS_TOKEN_EXPIRED,
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: false,
        sameSite: 'none'
      });

      res.cookie('client_id', user._id?.toString(), {
        maxAge: REFRESH_TOKEN_TIME,
        expires: REFRESH_TOKEN_EXPIRED,
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: false,
        sameSite: 'none'
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError('Refresh token expired', STATUS_CODE.UNAUTHORIZED);
      }

      if (error instanceof JsonWebTokenError) {
        throw new CustomError('Invalid refresh token', STATUS_CODE.FORBIDDEN);
      }

      throw new CustomError('Unknown error occurred', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default AuthService;
