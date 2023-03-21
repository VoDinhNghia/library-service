import { Injectable } from '@nestjs/common';
import { AuthenChatService } from './auth.chat';

@Injectable()
export class ChatService {
  constructor(private readonly authentchatService: AuthenChatService) {}

  async getUserFromSocket(token: string) {
    const user = await this.authentchatService.getUserFromAuthenticationToken(
      token,
    );
    console.log('userr', user);
    return user;
  }
}