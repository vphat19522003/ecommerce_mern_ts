import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { omit } from 'lodash';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import UserRepository from '@app/repository/user.repository';

class AuthService {
  static async register(req: Request, res: Response) {
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

    return omit(userCreated, ['password']);
  }
}

export default AuthService;
