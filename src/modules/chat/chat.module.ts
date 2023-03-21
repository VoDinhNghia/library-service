import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './auth.chat';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatService, ChatGateway, AuthenticationService, JwtService],
})
export class ChatModule {}
