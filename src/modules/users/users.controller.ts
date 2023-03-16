import {
  Controller,
  Get,
  Logger,
  Res,
  Req,
  UseGuards,
  Query,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErolesUser, keyAccessBackend } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/response-api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserResponseDto } from './dtos/users.response.dto';
import { UserQueryDto } from './dtos/users.query.dto';
import { AuthServiceAccessByKey } from 'src/validates/validate.service.key-access';

@Controller('api/users')
@ApiTags('users')
export class UsersController {
  private readonly logger = new Logger(UsersService.name);
  constructor(private service: UsersService) {}

  @Post('/migrate') // only one migrate then Block and user cronjob service
  @UseGuards(AuthServiceAccessByKey(keyAccessBackend))
  async migrateUsersData(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<ResponseRequest> {
    this.logger.log('api migrate users');
    const { body = [] } = req;
    await this.service.migrateUserFromBackend(body);
    return new ResponseRequest(res, true, 'Get user list success.');
  }

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
