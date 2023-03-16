import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/rooms.create.dto';
import { Rooms } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomRepository: Repository<Rooms>,
  ) {}

  async createRoom(roomDto: CreateRoomDto, createdBy: number): Promise<Rooms> {
    const dto: Record<string, any> = {
      ...roomDto,
      createdBy,
    };
    const result = this.roomRepository.create(dto);
    await this.roomRepository.save(result);
    return result;
  }

  async findRoomById(id: number): Promise<Rooms> {
    const result = await this.roomRepository.findOne({
      where: { id },
      relations: { createdBy: true },
    });
    return result ?? null;
  }
}
