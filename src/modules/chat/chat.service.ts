import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { CreateConversationDto } from './dtos/conversation.create.dto';
import { Message } from './entities/chat.entity';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    @InjectRepository(Conversation)
    private readonly conversation: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly message: Message,
  ) {}

  // validate => create conversation => create message
  async createConversation(dto: CreateConversationDto): Promise<Conversation> {
    const result = this.conversation.create(dto);
    await this.conversation.save(result);
    return result;
  }

  async getUserFromSocket(token: string) {
    const user = this.jwtStrategy.verifyToken(token);
    return user;
  }
}
