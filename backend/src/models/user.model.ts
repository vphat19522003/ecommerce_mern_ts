import { Document, model, Schema } from 'mongoose';

export enum Gender {
  male = 'Male',
  female = 'Female',
  other = 'Other'
}

export enum Role {
  admin = 'Admin',
  user = 'User'
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  fullName: string;
  phone: string;
  passport: string;
  gender?: Gender;
  role: Role;
  avatar_url: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowerCase: true, unique: true },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    fullName: {
      type: String
    },
    phone: {
      type: String
    },
    passport: {
      type: String
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.male
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.user,
      required: true
    },
    avatar_url: { type: String }
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
