import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

/**
 * App Imports
 */
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, AuthData } from './../../graphql.schema.generated';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query()
  async Login(@Args('data') loginInput: LoginInput): Promise<AuthData> {
    return await this.authService.login(loginInput);
  }

  @Mutation()
  async Register(@Args('data') registerInputs: RegisterInput): Promise<AuthData> {
    return await this.authService.register(registerInputs);
  }
}