import { ElibraryServiceType } from 'src/constants/constant';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ServiceGroupStudy } from './library-services.group-study.entity';

@Entity()
export class Services extends EntityBasic {
  @Column()
  name: string;

  @Column({
    default: ElibraryServiceType.BORROW_BOOK,
  })
  type: string;

  @Column({ default: 0 })
  cost: number;

  @ManyToOne(() => Users, (user) => user.createRoom)
  createdBy: Users;

  @ManyToOne(() => Users, (user) => user.updateRoom)
  updatedBy: Users;

  @OneToMany(() => ServiceGroupStudy, (group) => group.service)
  groupService?: ServiceGroupStudy[];
}
