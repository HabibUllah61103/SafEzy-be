import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Fit-Chick Moment')
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return 'The server is running successfully. Please visit /api to access the Swagger documentation.';
  }
}
