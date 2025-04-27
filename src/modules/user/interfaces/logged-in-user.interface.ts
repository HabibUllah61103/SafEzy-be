import { UserRole } from '../enum/user-role.enum';

export interface LoggedInUser {
  id: number;
  role: UserRole;
}
