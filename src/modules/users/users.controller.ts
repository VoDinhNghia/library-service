import { Controller, Get, Logger, Res, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/response-api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserResponseDto } from './dtos/users.response.dto';
import { UserQueryDto } from './dtos/users.query.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly logger = new Logger(UsersService.name);
  constructor(private service: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDto })
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.SUPPER_ADMIN,
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
    ]),
  )
  async getUsers(
    @Query() queryDto: UserQueryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log('api get users');
    const results = await this.service.getUsers(queryDto);
    return new ResponseRequest(res, results, 'Get user list success.');
  }
}
