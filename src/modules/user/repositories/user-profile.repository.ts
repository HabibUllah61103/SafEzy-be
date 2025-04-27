import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { PRIMARY_CONNECTION } from 'src/database';

export class UserProfileRepository extends Repository<UserProfile> {
  constructor(
    @InjectRepository(UserProfile, PRIMARY_CONNECTION)
    profile: Repository<UserProfile>,
  ) {
    super(profile.target, profile.manager, profile.queryRunner);
  }
}
