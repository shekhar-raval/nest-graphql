import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export interface IUser {
  readonly active: boolean
  readonly email: string,
  readonly name: string,
  readonly id?: string,
  token?: string
}
