import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, headers } = req;
    const { statusCode } = res;

    const device = headers['user-agent'];
    const language = headers['accept-language'];

    this.logger.debug(
      `[${method}]-[${originalUrl}]-[${statusCode}]-[${ip}]-[${device}]-[${language}]`,
    );
    next();
  }
}
