import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { Like, Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/rooms.create.dto';
import { QueryRoomDto } from './dtos/rooms.query';
import { UpdateRoomDto } from './dtos/rooms.update.dto';
import { Rooms } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomRepository: Repository<Rooms>,
  ) {}

  async createRoom(roomDto: CreateRoomDto): Promise<Rooms> {
    const result = this.roomRepository.create({ ...roomDto });
    await this.roomRepository.save(result);
    return result;
  }

  async updateRoom(id: string, updateDto: UpdateRoomDto): Promise<Rooms> {
    await this.roomRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
    const result = await this.findRoomById(id);
    return result;
  }

  async findRoomById(id: string): Promise<Rooms> {
    const result = await this.roomRepository.findOne({
      where: { id },
    });
    if (!result) {
      new CommonException(404, 'Room not found.');
    }
    return result;
  }

  async findAllRooms(
    queryDto: QueryRoomDto,
  ): Promise<{ data: Rooms[]; total: number }> {
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
    });
    const total = await this.roomRepository.count();
    return {
      data: results,
      total,
    };
  }

  async deleteRoom(id: string): Promise<void> {
    const result = await this.findRoomById(id);
    await this.roomRepository.softRemove(result);
  }
}
