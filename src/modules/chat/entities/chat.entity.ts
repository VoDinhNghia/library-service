import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
export class Message extends EntityBasic {
  @Column()
  conversationId?: string;

  @Column({ nullable: false })
  userSendId: string;

  @Column({ nullable: false })
  userReceiveId: string;

  @Column({ default: false })
  status?: boolean;

  @Column({ nullable: true })
  content?: string;

  @ManyToOne(() => Users, (user) => user.userSend)
  userSend?: Users;

  @ManyToOne(() => Users, (user) => user.userReceive)
  userReceive?: Users;

  @ManyToOne(() => Conversation, (conver) => conver.message)
  conversation?: Conversation;
}
