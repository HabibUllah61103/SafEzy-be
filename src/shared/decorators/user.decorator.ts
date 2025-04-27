import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LoggedInUser } from 'src/modules/user/interfaces/logged-in-user.interface';

export const GetUser = createParamDecorator(
  <T = LoggedInUser>(data: unknown, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest<Request & { user: T }>();
    return request.user;
  },
);
