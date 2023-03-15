import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
  deletedBy?: string;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
