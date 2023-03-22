import { ElibraryServiceType } from 'src/constants/constant';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => ServiceGroupStudy, (group) => group.service)
  groupService?: ServiceGroupStudy[];
}
