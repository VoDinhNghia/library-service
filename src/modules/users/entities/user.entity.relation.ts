import { Message } from 'src/modules/chat/entities/chat.entity';
import { Conversation } from 'src/modules/chat/entities/conversation.entity';
import { ServiceGroupStudy } from 'src/modules/library-services/entities/library-services.group-study.entity';
import { Library } from 'src/modules/library/entities/library.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class UserRelation {
  @OneToMany(() => Library, (library) => library.librarian)
  librarian?: Library[];

  @OneToMany(() => ServiceGroupStudy, (groupService) => groupService.user)
  userGroupService?: ServiceGroupStudy[];

  @OneToMany(() => Message, (chat) => chat.userSend)
  userSend?: Message[];

  @OneToMany(() => Message, (chat) => chat.userReceive)
  userReceive?: Message[];

  @OneToMany(() => Conversation, (conver) => conver.created)
  conversation?: Message[];
}
