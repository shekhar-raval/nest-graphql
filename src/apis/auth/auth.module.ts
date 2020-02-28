import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

/**
 * App Imports
 */
import { JWT_SECRET, JWT_EXPIRATION } from '../../shared/env-vars';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRATION
      },
    }),
    UserModule
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }