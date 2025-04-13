import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Language = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const language = request.headers['accept-language'];

  return language;
});
