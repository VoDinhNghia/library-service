import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { cryptoPassWord } from 'src/constants/crypto';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dtos/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async login(loginDto: LoginDto): Promise<Users | any> {
    const { email, passWord } = loginDto;
    const user: Record<string, any> = await this.findUserAuth(email, passWord);
    if (!user) {
      new CommonException(401, `User or password incorrect.`);
    }
    const result: Record<string, any> = {
      ...user,
      accessToken: this.jwtService.sign({ ...user }),
    };
    return result;
  }

  async findUserAuth(email: string, passWord: string): Promise<Users | any> {
    const password = cryptoPassWord(passWord);
    const result = await this.usersRepository.findOneBy({
      email,
      passWord: password,
    });
    return result ?? null;
  }
}
