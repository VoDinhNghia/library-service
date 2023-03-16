import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { cryptoPassWord } from 'src/constants/crypto';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dtos/auth.login.dto';
import { UserResponseDto } from '../users/dtos/users.response.dto';
import { EstatusUser } from 'src/constants/constant';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async login(loginDto: LoginDto): Promise<UserResponseDto> {
    const { email, passWord } = loginDto;
    const user: UserResponseDto = await this.findUserAuth(email, passWord);
    if (!user) {
      new CommonException(401, `User or password incorrect.`);
    }
    const result: UserResponseDto & { accessToken: string } = {
      ...user,
      accessToken: this.jwtService.sign({ ...user }),
    };
    return result;
  }

  async findUserAuth(
    email: string,
    passWord: string,
  ): Promise<UserResponseDto | null> {
    const password = cryptoPassWord(passWord);
    const result = await this.usersRepository.findOneBy({
      email,
      passWord: password,
      status: EstatusUser.ACTIVE,
    });
    return result ?? null;
  }
}
