import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PRIMARY_CONNECTION } from 'src/database';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User, PRIMARY_CONNECTION)
    user: Repository<User>,
  ) {
    super(user.target, user.manager, user.queryRunner);
  }
}
