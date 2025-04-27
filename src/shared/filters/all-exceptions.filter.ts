import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ErrorExtended } from 'src/interfaces/error-extended';
import { LoggerService } from 'src/modules/logger/logger.service';
import getCurrentUTCTime from 'src/utils/getCurrentUTCTime';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: ErrorExtended, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception?.response?.message ||
      exception?.message ||
      'Internal server error';
    const error = exception?.response?.error || 'Internal Server';

    const context = `Error in ${request.method} ${request.url}`;

    this.logger.saveErrorInDb(
      JSON.stringify(message),
      exception instanceof Error ? exception.stack : 'No stack trace',
      context,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: getCurrentUTCTime(),
      path: request.url,
      message,
      error,
    });
  }
}
