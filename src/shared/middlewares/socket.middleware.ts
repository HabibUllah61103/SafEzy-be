import { Socket } from 'socket.io';
import { WsJwtGuard } from '../guards/socket.guard';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const WsAuthMiddleware = (): SocketIOMiddleware => (client, next) => {
  try {
    WsJwtGuard.validateToken(client);
    next();
  } catch (error) {
    console.log('error in WsAuthMiddleware', error);
    next(error);
  }
};
