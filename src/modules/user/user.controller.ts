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
  Query,
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
import { Role } from 'src/shared/decorators/role.decorator';
import { UserRole } from './enum/user-role.enum';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { JwtUserAuthGuard } from 'src/shared/guards/user-jwt.guard';
import { JwtAdminAuthGuard } from 'src/shared/guards/admin-jwt.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { GetUserByTypeDto } from './dto/get-user-by-type.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile')
  @Role(UserRole.USER)
  @UseGuards(JwtUserAuthGuard, RoleGuard)
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
  @Role(UserRole.USER)
  @UseGuards(JwtUserAuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Get LoggedIn User (User)',
  })
  findMe(@GetUser() { id }: LoggedInUser) {
    return this.userService.find(null, { id });
  }

  @Get()
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAdminAuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Get All Users using type (Admin)',
  })
  findAll(@Query() getUserByTypeDto: GetUserByTypeDto) {
    return this.userService.findAll(getUserByTypeDto);
  }

  @Get('profile/me')
  @Role(UserRole.USER)
  @UseGuards(JwtUserAuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Get LoggedIn User Profile (User)',
  })
  findProfileMe(@GetUser() { id }: LoggedInUser) {
    return this.userService.findProfile(null, { userId: id });
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAdminAuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Get User Profile (Admin)',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(RoleGuard)
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
  @Role(UserRole.ADMIN, UserRole.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
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
  @Role(UserRole.USER)
  @UseGuards(JwtUserAuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Remove LoggedIn User (User)',
  })
  async remove(@GetUser() { id }: LoggedInUser) {
    return await this.userService.remove(id);
  }
}
