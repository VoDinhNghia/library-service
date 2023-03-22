import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Message } from './chat.entity';

@Entity()
export class Conversation extends EntityBasic {
  @Column({ type: 'uuid' })
  createdId?: string;

  @ManyToOne(() => Message, (message) => message.conversation)
  message?: Message;

  @ManyToOne(() => Users, (user) => user.conversation)
  created?: Users;
}
