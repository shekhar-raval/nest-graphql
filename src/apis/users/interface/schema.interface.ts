import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';

import { User, IUser } from './users.interface';

export interface IUserModal extends Model<User> {
  matchPassword(password: string): boolean;
  validateAndGenerateToken(options: { email: string, password: string }): IUser;
  transform(data: any): IUser;
  get(id: string): IUser;
  checkDuplication(error: any): HttpException
}