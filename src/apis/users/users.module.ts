import { UserResolver } from './users.resolver';
import { UserSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User', schema: UserSchema
      }
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule { }