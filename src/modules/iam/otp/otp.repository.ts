import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import { PRIMARY_CONNECTION } from 'src/database';

export class OtpRepository extends Repository<Otp> {
  constructor(
    @InjectRepository(Otp, PRIMARY_CONNECTION)
    otp: Repository<Otp>,
  ) {
    super(otp.target, otp.manager, otp.queryRunner);
  }
}
