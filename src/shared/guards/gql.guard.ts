import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql'


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext()
    return super.canActivate(new ExecutionContextHost([req]))
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new HttpException('You do not have permission to access this data', HttpStatus.UNAUTHORIZED)
    }
    return user;
  }
}