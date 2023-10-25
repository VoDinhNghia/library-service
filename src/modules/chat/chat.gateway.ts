import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('test_message')
  async listenForMessages(
    @MessageBody() content: Record<string, string>,
    @ConnectedSocket() socket: Socket,
  ) {
    const authorization = socket?.handshake?.headers?.authorization || '';
    if (authorization) {
      console.log('data receive', content);
      const author = await this.chatService.getUserFromSocket(authorization);
      let result = {};
      if (!content.conversationId) {
        result = await this.chatService.createConversation({
          createdId: author.id,
          ...content,
        });
      } else {
        result = await this.chatService.createMessage({
          ...content,
          userSendId: author.id,
        });
      }
      this.server.sockets.emit('test_message', {
        result,
      });
    }
  }

  async handleConnection(socket: Socket) {
    const authorization = socket?.handshake?.headers?.authorization || '';
    if (authorization) {
      await this.chatService.getUserFromSocket(authorization);
    }
  }
}
