import { EtypeRoom } from 'src/constants/constant';
import { ServiceGroupStudy } from 'src/modules/library-services/entities/library-services.group-study.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Rooms extends EntityBasic {
  @Column()
  name?: string;

  @Column({ default: 100 })
  capacity: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  status?: boolean;

  @Column({ default: EtypeRoom.BOOK })
  type?: string;

  @ManyToOne(() => Users, (user) => user.createRoom)
  createdBy?: Users;

  @ManyToOne(() => Users, (user) => user.updateRoom)
  updatedBy?: Users;

  @OneToMany(() => ServiceGroupStudy, (service) => service.room)
  groupService?: ServiceGroupStudy[];
}
