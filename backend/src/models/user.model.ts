import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
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
    }
  },
  { timestamps: true }
);

const UserModel = model('User', userSchema);

export default UserModel;
