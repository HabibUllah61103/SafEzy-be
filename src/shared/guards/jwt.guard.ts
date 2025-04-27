import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-user') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(error: Error, user: any) {
    console.log(typeof user);
    if (error || !user) {
      throw error || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
