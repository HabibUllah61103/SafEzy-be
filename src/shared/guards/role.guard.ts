import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/user/enum/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles: UserRole[] = this.reflector.getAllAndOverride<
      UserRole[]
    >('role', [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) return false;

    const isAllowed = requiredRoles.some((role) => user.role === role);

    if (isAllowed) return true;

    throw new HttpException(
      "You don't have permission to access this resource",
      HttpStatus.FORBIDDEN,
    );
  }
}
