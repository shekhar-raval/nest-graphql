/* eslint-disable @typescript-eslint/no-unused-vars */
import { createParamDecorator } from '@nestjs/common'
import { Response } from 'express'
import { IUser } from '../../apis/users/interface/users.interface';

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res
)

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): IUser => ctx.res && ctx.req.user
)
