import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log({ context });

    if (context.getType() !== 'ws') return true;

    const client: Socket = context.switchToWs().getClient();

    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token: string = authorization.split(' ')[1];

    const payload = verify(token, process.env.JWT_AUTH_SECRET_KEY as string, {
      maxAge: `${process.env.JWT_AUTH_EXPIRES_IN}`,
    });

    client.data.user = payload;

    return payload;
  }
}
