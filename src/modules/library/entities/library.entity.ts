import { numberIdLibrary } from 'src/constants/constant';
import { Users } from 'src/modules/users/entities/user.entity';
import { EntityBasic } from 'src/utils/entity.basic';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Library extends EntityBasic {
  @Column()
  name?: string;

  @Column({ default: numberIdLibrary })
  numberId: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  foundYear?: Date;

  @ManyToOne(() => Users, (user) => user.librarian)
  librarian?: Users;
}
