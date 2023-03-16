import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
