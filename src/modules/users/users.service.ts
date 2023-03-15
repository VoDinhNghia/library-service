import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQueryDto } from './dtos/users.query.dto';
import { UserResponseDto } from './dtos/users.response.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUsers(
    queryDto: UserQueryDto,
  ): Promise<{ data: UserResponseDto[]; total: number }> {
    const { limit, page, searchKey, status, role } = queryDto;
    const query: UserQueryDto | any = {};
    if (status) {
      query.status = status;
    }
    if (role) {
      query.role = role;
    }
    if (searchKey) {
      query.firstName = new RegExp(searchKey);
    }
    const data = await this.usersRepository.find({
      where: query,
      skip: Number(limit) * Number(page) - Number(limit),
      take: limit,
    });
    const total = await this.usersRepository.count();

    return {
      data,
      total,
    };
  }
}
