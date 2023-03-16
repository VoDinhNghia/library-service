import { Rooms } from 'src/modules/rooms/entities/rooms.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class UserRelation {
  @OneToMany(() => Rooms, (room) => room.createdBy)
  createRoom: Rooms[];

  @OneToMany(() => Rooms, (room) => room.updatedBy)
  updateRoom: Rooms[];
}
