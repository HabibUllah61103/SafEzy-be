import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { LoggedInUser } from '../user/interfaces/logged-in-user.interface';
import { AuthGuard } from '@nestjs/passport';
import { RoleStrategy } from '../iam/auth/enums/role-strategy.enum';

@ApiTags('Vehicle')
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Create User Vehicle (User)',
  })
  create(
    @GetUser() { id }: LoggedInUser,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return this.vehicleService.create(id, createVehicleDto);
  }

  @Get()
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Create User Vehicle (User)',
  })
  findAll(@GetUser() { id }: LoggedInUser) {
    return this.vehicleService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard([RoleStrategy.USER]))
  @ApiOperation({
    summary: 'Create User Vehicle (User)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
