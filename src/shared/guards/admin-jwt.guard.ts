import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt-admin') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(error: Error, user: any) {
    if (error || !user) {
      throw error || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
