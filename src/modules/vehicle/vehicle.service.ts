import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleRepository } from './repositories/vehicle.respository';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly userService: UserService,
  ) {}

  async create(id: number, createVehicleDto: CreateVehicleDto) {
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
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    console.log(updateVehicleDto);
    return `This action updates a #${id} vehicle`;
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
