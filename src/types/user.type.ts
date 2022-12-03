import { Document } from 'mongoose';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  token: string | null;
  _id: string;
}

export interface IPasswords {
  email: string;
  oldPassword: string;
  newPassword: string;
}
