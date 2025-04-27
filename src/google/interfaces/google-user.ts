import { UserRole } from 'src/modules/user/enum/user-role.enum';

export interface GoogleUser {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  picture?: string;
  role?: UserRole;
}
