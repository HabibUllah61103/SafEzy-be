import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmToken } from '../entities/fcm-token.entity';
import { PRIMARY_CONNECTION } from 'src/database';

export class FcmTokenRepository extends Repository<FcmToken> {
  constructor(
    @InjectRepository(FcmToken, PRIMARY_CONNECTION)
    fcmToken: Repository<FcmToken>,
  ) {
    super(fcmToken.target, fcmToken.manager, fcmToken.queryRunner);
  }
}
