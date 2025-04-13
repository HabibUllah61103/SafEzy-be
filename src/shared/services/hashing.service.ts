import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }
}
