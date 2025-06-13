import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { WsAuthMiddleware } from 'src/shared/middlewares/socket.middleware';
import { UserRole } from '../user/enum/user-role.enum';

@WebSocketGateway({
  namespace: 'alert',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  private connectedUsers = new Map<number, string>();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`${socket}`);
    });
  }

  afterInit(client: Socket) {
    client.use(WsAuthMiddleware() as any);
  }

  async handleConnection(socket: Socket) {
    const userId = await this.getConnectedUserId(socket);

    if (!userId) {
      socket.disconnect();
      return;
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      socket.disconnect();
      return;
    }

    if (user.role === UserRole.ADMIN) {
      socket.disconnect();
      return;
    }

    this.connectedUsers.set(userId, socket.id);

    console.log(`[CONNECT_USER] ${userId} [SOCKET] ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    const userId = this.getConnectedUserId(socket);

    if (!userId) return;

    this.connectedUsers.delete(userId);
  }

  @SubscribeMessage('intrusion_alert')
  handleIntrusionAlert(@MessageBody() data: any) {
    console.log('[INTRUSION ALERT RECEIVED]', data);
    // Forward it to all connected users or store/process as needed
    this.server.emit('intrusion_alert', data);
  }

  getConnectedUserId(socket: Socket) {
    return socket.data?.user?.id;
  }

  disconnectUser(userId: number) {
    const socketId = this.connectedUsers.get(userId);

    if (!socketId) return;

    this.connectedUsers.delete(userId);
    console.log(`[DISCONNECT_USER] ${userId}`);
  }
}
