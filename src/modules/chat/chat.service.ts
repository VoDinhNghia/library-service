import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { CreateConversationDto } from './dtos/conversation.create.dto';
import { CreateMessageDto } from './dtos/message.create.dto';
import { Message } from './entities/chat.entity';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    @InjectRepository(Conversation)
    private readonly conversation: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly message: Repository<Message>,
  ) {}

  async createConversation(
    dto: CreateConversationDto & CreateMessageDto,
  ): Promise<Conversation> {
    const converDto = { createdId: dto.createdId };
    const result = this.conversation.create(converDto);
    await this.conversation.save(result);
    const messageDto = {
      conversationId: result.id,
      userSendId: dto.createdId,
      userReceiveId: dto.userReceiveId,
      content: dto.content,
    };
    const message = await this.createMessage(messageDto);
    result.message = message;
    return result;
  }

  async createMessage(dto: CreateMessageDto): Promise<Message> {
    const result = this.message.create(dto);
    await this.message.save(result);
    return result;
  }

  async getUserFromSocket(token: string) {
    const user = this.jwtStrategy.verifyToken(token);
    return user;
  }
}
