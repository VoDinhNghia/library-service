import { Rooms } from 'src/modules/rooms/entities/rooms.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Services } from './library-services.entities';

@Entity()
export class ServiceGroupStudy extends EntityBasic {
  @Column()
  name?: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  brrowedTime: Date;

  @Column({ nullable: true })
  returnTime?: Date;

  @ManyToOne(() => Services, (service) => service.groupService)
  service?: Services;

  @ManyToOne(() => Rooms, (room) => room.groupService)
  room?: Rooms;

  @ManyToOne(() => Users, (user) => user.userGroupService)
  user?: Users;

  @ManyToOne(() => Users, (user) => user.createRoom)
  createdBy: Users;

  @ManyToOne(() => Users, (user) => user.updateRoom)
  updatedBy: Users;
}
