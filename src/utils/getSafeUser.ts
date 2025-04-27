import { User } from 'src/modules/user/entities/user.entity';

export function getSafeUser(user: User) {
  delete user.password;

  return user;
}
