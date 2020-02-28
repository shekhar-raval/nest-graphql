import { AuthModule } from './apis/auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * App Imports
 */
import { MONGO_URL_DEV, MONGO_OPTIONS } from './shared/env-vars';
import { GQLModule } from './graphql/graphql.module';
import { UserModule } from './apis/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL_DEV, MONGO_OPTIONS),
    GQLModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
