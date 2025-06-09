import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleStrategy } from '../iam/auth/enums/role-strategy.enum';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { LoggedInUser } from './interfaces/logged-in-user.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile')
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Create User Profile (User)',
  })
  createProfile(
    @GetUser() { id }: LoggedInUser,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.userService.createProfile(id, createProfileDto);
  }

  @Get('me')
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Get LoggedIn User Profile (User)',
  })
  findMe(@GetUser() { id }: LoggedInUser) {
    return this.userService.find(null, { id });
  }

  @Get(':id')
  @UseGuards(AuthGuard([RoleStrategy.ADMIN]))
  @ApiOperation({
    summary: 'Get User Profile (Admin)',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard([RoleStrategy.USER, RoleStrategy.ADMIN]))
  @ApiOperation({
    summary: 'Update LoggedIn User (User, Admin)',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('profile/:id')
  @UseGuards(AuthGuard([RoleStrategy.USER, RoleStrategy.ADMIN]))
  @ApiOperation({
    summary: 'Update LoggedIn User Profile (User, Admin)',
  })
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Remove LoggedIn User (User)',
  })
  async remove(@GetUser() { id }: LoggedInUser) {
    return await this.userService.remove(id);
  }
}
