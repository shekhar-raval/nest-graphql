import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

/**
 * App Imports 
 */
import { AuthService } from "src/apis/auth/auth.service";
import { JWT_SECRET } from "../env-vars";
import { JwtPayload } from "src/apis/auth/interface/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    const data = await this.authService.validateUser(payload);
    return data;
  }
}