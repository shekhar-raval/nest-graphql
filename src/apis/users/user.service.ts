import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';

/**
 * App Imports
 */
import { IUserModal } from './interface/schema.interface';
import { LoginDTO, RegisterDTO } from './dto/users.dto';
import { IUser } from './interface/users.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: IUserModal) { }

  async login(user: LoginDTO): Promise<IUser | HttpException> {
    const data = await this.userModel.validateAndGenerateToken(user);
    return data;
  }

  async register(user: RegisterDTO): Promise<IUser | HttpException> {
    try {
      const data = new this.userModel(user);
      const us = await data.save();
      return this.userModel.transform(us);
    } catch (err) {
      throw this.userModel.checkDuplication(err)
    }
  }

  async findUserById(id: string): Promise<IUser | HttpException> {
    return await this.userModel.get(id);
  }
}