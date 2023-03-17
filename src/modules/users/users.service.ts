import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { Like, Repository } from 'typeorm';
import { UserQueryDto } from './dtos/users.query.dto';
import { UserResponseDto } from './dtos/users.response.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async migrateUserFromBackend(users = []): Promise<void> {
    try {
      const checkDb = await this.usersRepository.find();
      if (checkDb.length > 0) {
        new CommonException(409, 'Please contact with admin to handle.');
      }
      await this.usersRepository.clear();
      const userDto = users.map((user: any) => {
        const dto = {
          email: user?.email,
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          middleName: user?.profile?.middleName,
          userId: user?._id,
          code: user?.profile?.code,
          profileId: user?.profile?._id,
          passWord: user?.passWord,
          avatar: user?.profile?.avatar,
          status: user?.status,
          role: user?.role,
          mobile: user?.profile?.mobile,
        };
        return dto;
      });
      const results = this.usersRepository.create(userDto);
      await this.usersRepository.save(results);
      console.log('Sync data success!');
    } catch {
      console.log('Sync data failed!');
      new CommonException(500, 'Can not sync data.');
    }
  }

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
      query.firstName = Like(`%${searchKey}`);
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

  async getUserById(id: number): Promise<UserResponseDto> {
    const result = await this.usersRepository.findOneBy({ id });
    if (!result) {
      new CommonException(404, 'User not found.');
    }
    return result;
  }
}
