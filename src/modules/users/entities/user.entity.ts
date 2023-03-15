import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column } from 'typeorm';

@Entity()
export class Users extends EntityBasic {
  @Column({ length: 100 })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  userId?: string;

  @Column()
  profileId?: string;

  @Column()
  passWord?: string;

  @Column({ nullable: true })
  avatar?: string; // link url BE

  @Column()
  status: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  mobile?: string;
}
