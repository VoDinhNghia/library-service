import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() user: UserEntity) {
    return this.service.createUser(user);
  }

  @Get()
  get() {
    return this.service.getUsers();
  }
}
