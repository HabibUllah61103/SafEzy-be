import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleRepository } from './repositories/vehicle.respository';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { UserService } from '../user/user.service';
import { VehicleStatus } from './enum/vehicle-status.enum';
import { SuccessMessageResponse } from 'src/shared/types/response.types';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    id: number,
    createVehicleDto: CreateVehicleDto,
  ): Promise<SuccessMessageResponse> {
    try {
      const carExists = await this.find(null, {
        numberPlate: createVehicleDto.numberPlate,
      });

      if (carExists) {
        return {
          message: 'Vehicle already exists',
        };
      }

      const userExists = await this.userService.find(null, { id });

      if (!userExists) {
        return {
          message: 'User not found',
        };
      }

      await this.vehicleRepository.save({
        ...createVehicleDto,
        ownerId: id,
        status: VehicleStatus.APPROVED,
      });

      return {
        message: 'Vehicle Added Succesfully',
      };
    } catch (error) {
      throw error;
    }
  }

  findAll(id: number) {
    return this.vehicleRepository.find({ where: { ownerId: id } });
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    console.log(updateVehicleDto);
    await this.vehicleRepository.update({ id }, { ...updateVehicleDto });
    return { message: 'Vehicle updated successfully' };
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }

  /**
   * Finds a single user based on optional select and where conditions. Use this function when you need to find a single user without any relations. If you need to find a user with relations, use the queryBuilder method.
   *
   * @param select Optional fields to select from the user
   * @param where Optional conditions to filter the user
   * @returns A Promise resolving to a single User entity
   */
  find(
    select?: FindOptionsSelect<Vehicle>,
    where?: FindOptionsWhere<Vehicle>,
  ): Promise<Vehicle> {
    return this.vehicleRepository.findOne({
      where,
      select,
    });
  }
}
