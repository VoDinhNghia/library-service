import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateRoomDto } from './dtos/rooms.create.dto';
import { QueryRoomDto } from './dtos/rooms.query';
import { Rooms } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomRepository: Repository<Rooms>,
  ) {}

  async createRoom(roomDto: CreateRoomDto, createdBy: Users): Promise<Rooms> {
    const dto: CreateRoomDto & { createdBy: Users } = {
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

  async findAllRooms(queryDto: QueryRoomDto): Promise<Rooms[]> {
    const { limit, page, searchKey, status, type } = queryDto;
    const query: Record<string, any> = {};
    if (type) {
      query.type = type;
    }
    if (status) {
      query.status = status;
    }
    if (searchKey) {
      query.name = Like(`%${searchKey}`);
    }
    const results = await this.roomRepository.find({
      where: query,
      skip: Number(limit) * Number(page) - Number(limit),
      take: limit,
      relations: { createdBy: true },
    });
    return results;
  }
}
