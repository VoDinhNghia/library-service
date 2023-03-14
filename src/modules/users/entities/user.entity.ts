import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email?: string;

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

  @Column()
  avatar?: string; // link url BE

  @Column()
  status?: string;

  @Column()
  role?: string;
}
