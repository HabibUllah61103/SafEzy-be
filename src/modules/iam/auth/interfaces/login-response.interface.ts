import { UserRole } from 'src/modules/user/enum/user-role.enum';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    profileImageUrl: string;
  };
  verified: boolean;
  role: UserRole;
}
