import { EtypeRoom } from 'src/constants/constant';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Rooms extends EntityBasic {
  @Column()
  name: string;

  @Column({ default: 100 })
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: EtypeRoom.BOOK })
  type?: string;

  @ManyToOne(() => Users, (user) => user.room)
  createdBy: Users;
}
