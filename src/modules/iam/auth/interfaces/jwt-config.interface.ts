import { JwtExpiresInKey } from '../enums/jwt-expires-in-key.enum';
import { JwtSecretKey } from '../enums/jwt-secret-key.enum';

export interface JwtConfig {
  secretKey: JwtSecretKey;
  expiresInKey: JwtExpiresInKey;
}
