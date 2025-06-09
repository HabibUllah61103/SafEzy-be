import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/logger.service';

export function handleServiceError(
  error: any,
  context: string,
  logger: LoggerService,
): never {
  logger.error(`Error in ${context}: ${error}`);

  if (error?.status === 500) {
    throw new InternalServerErrorException(
      `Couldn't process the function: ${error.message}`,
    );
  }

  throw new BadRequestException(error.message);
}
