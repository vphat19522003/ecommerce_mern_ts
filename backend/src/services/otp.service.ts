import { Types } from 'mongoose';
import nodemailer from 'nodemailer';

import { CustomError } from '@app/core/response.error';
import OTPModel from '@app/models/otp.model';

import mailConfig from '../utils/mailConfig';

const transporter = nodemailer.createTransport(mailConfig);

interface IOTP {
  userId: string | Types.ObjectId;
  email: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
}

class OTPService {
  static async generateOTP({ userId, email }: Omit<IOTP, 'code' | 'expiresAt' | 'isUsed'>): Promise<IOTP> {
    const code = Math.floor(Math.random() * 900000 + 100000);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    const otp = {
      userId,
      email,
      code,
      expiresAt
    };

    const createdOTP = await OTPModel.create(otp);

    return createdOTP.toObject();
  }

  static async sendOTP(otp: IOTP): Promise<void> {
    const { email, code } = otp;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'TEST SEND MAIL',
      text: `${code}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email send info :>> ', info);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new CustomError('Failed to send email', 500);
    }
  }
}

export default OTPService;
