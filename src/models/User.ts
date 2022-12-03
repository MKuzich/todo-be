/* eslint-disable no-useless-escape */
import { Model, model, Schema } from 'mongoose';
import Joi from 'joi';
import { IUser } from '../types/user.type';

export const schemaSignUpUser = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .regex(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ),
  password: Joi.string()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
});

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: null
  }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
