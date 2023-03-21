import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenChatService } from './auth.chat';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatService, ChatGateway, AuthenChatService, JwtService],
})
export class ChatModule {}
