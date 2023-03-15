import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class EntityBasic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
