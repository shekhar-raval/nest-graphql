import { Injectable, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

/**
 * App imports
 */
import { UserService } from "../users/user.service";
import { IUser } from "../users/interface/users.interface";
import { LoginInput, RegisterInput, AuthData } from './../../graphql.schema.generated';
import { JWT_EXPIRATION } from "src/shared/env-vars";

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly userService: UserService) { }

  async validateUser({ id }): Promise<IUser | HttpException> {
    const us = await this.userService.findUserById(id);
    return us;
  }

  async generateToken(user: IUser | any): Promise<string> {
    const token = await this.jwt.sign({ id: user.id }, { expiresIn: JWT_EXPIRATION });
    return token;
  }

  async login(user: LoginInput): Promise<AuthData> {
    const data = await this.userService.login(user);
    const token = await this.generateToken(data);
    return { user: data, token };
  }

  async register(user: RegisterInput): Promise<AuthData> {
    const data = await this.userService.register(user);
    const token = await this.generateToken(data);
    return { user: data, token };
  }
}