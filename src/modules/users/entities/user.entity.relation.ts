import { ServiceGroupStudy } from 'src/modules/library-services/entities/library-services.group-study.entity';
import { Library } from 'src/modules/library/entities/library.entity';
import { Rooms } from 'src/modules/rooms/entities/rooms.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class UserRelation {
  @OneToMany(() => Rooms, (room) => room.createdBy)
  createRoom?: Rooms[];

  @OneToMany(() => Rooms, (room) => room.updatedBy)
  updateRoom?: Rooms[];

  @OneToOne(() => Library, (library) => library.librarian)
  librarian?: Library[];

  @OneToMany(() => ServiceGroupStudy, (service) => service.user)
  userGroupService?: ServiceGroupStudy[];
}
