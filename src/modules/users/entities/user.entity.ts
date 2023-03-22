import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRelation } from './user.entity.relation';

@Entity()
export class Users extends UserRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ length: 100 })
  email?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  userId?: string;

  @Column()
  code?: string;

  @Column()
  profileId?: string;

  @Column()
  passWord?: string;

  @Column({ nullable: true })
  avatar?: string; // link url BE

  @Column()
  status?: string;

  @Column()
  role?: string;

  @Column({ nullable: true })
  mobile?: string;
}
