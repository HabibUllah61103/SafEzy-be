import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleStrategy } from '../iam/auth/enums/role-strategy.enum';
import { NotificationsService } from './notifications.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestNotificationDto } from './dtos/create-notification.dto';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { UserRole } from '../user/enum/user-role.enum';
import { PaginationDto } from 'src/shared/dtos';
import { LoggedInUser } from '../user/interfaces/logged-in-user.interface';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Role } from 'src/shared/decorators/role.decorator';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@Role(UserRole.ADMIN, UserRole.USER)
@UseGuards(JwtAuthGuard, RoleGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Contractor, Coordinator' })
  async find(
    @Query() query: PaginationDto,
    @GetUser() { id, role }: LoggedInUser,
  ) {
    if (role === UserRole.USER) {
      return this.notificationsService.findContractor(query, id);
    }
    return this.notificationsService.find(query, id);
  }

  @Get('unread')
  @ApiOperation({ summary: 'Contractor, Coordinator' })
  async hasUnread(@GetUser() { id }: LoggedInUser) {
    const hasUnread = await this.notificationsService.hasUnread(id);

    return { hasUnread };
  }

  @Patch('unread')
  @ApiOperation({ summary: 'Contractor, Coordinator' })
  async markAsRead(@GetUser() { id }: LoggedInUser) {
    await this.notificationsService.markAsRead(id);

    return { message: 'Notifications marked as read' };
  }

  @Post('send')
  @ApiOperation({ summary: 'Coordinator' })
  async sendNotification(@Body() testNotificationDto: TestNotificationDto) {
    return await this.notificationsService.createTest(testNotificationDto);
  }
}
