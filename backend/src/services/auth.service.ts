import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { omit } from 'lodash';

import STATUS_CODE from '@app/constants/responseStatus';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_TIME
} from '@app/constants/tokenProperty';
import { CustomError } from '@app/core/response.error';
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
      payload: { _id: userCreated._id as string, email: userCreated.email, username: userCreated.username },
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
}

export default AuthService;
