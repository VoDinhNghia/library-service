import { EtypeRoom } from 'src/constants/constant';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column } from 'typeorm';

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
}
