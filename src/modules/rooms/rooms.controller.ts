import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/response-api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { CreateRoomDto } from './dtos/rooms.create.dto';
import { RoomsService } from './rooms.service';
import { Response, Request } from 'express';
import { Users } from '../users/entities/user.entity';
import { QueryRoomDto } from './dtos/rooms.query';

@Controller('api/rooms')
@ApiTags('rooms')
export class RoomsController {
  private readonly logger = new Logger(RoomsController.name);
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.SUPPER_ADMIN,
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
    ]),
  )
  async createRoom(
    @Body() roomDto: CreateRoomDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<ResponseRequest> {
    this.logger.log('api create room');
    const { user }: Request | any = req;
    const createdBy: Users = user.userId;
    const results = await this.roomService.createRoom(roomDto, createdBy);
    return new ResponseRequest(res, results, 'Create room success.');
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.SUPPER_ADMIN,
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
    ]),
  )
  async updateRoom(
    @Param('id') id: number,
    @Body() roomDto: CreateRoomDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<ResponseRequest> {
    this.logger.log('api update room');
    const { user }: Request | any = req;
    const updatedBy: Users = user.userId;
    const results = await this.roomService.updateRoom(id, roomDto, updatedBy);
    return new ResponseRequest(res, results, 'Update room success.');
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.SUPPER_ADMIN,
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
    ]),
  )
  async deleteRoom(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log('api delete room');
    const results = await this.roomService.deleteRoom(id);
    return new ResponseRequest(res, results, 'Delete room success.');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getRooms(
    @Query() queryDto: QueryRoomDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log('api get rooms');
    const results = await this.roomService.findAllRooms(queryDto);
    return new ResponseRequest(res, results, 'Get rooms success.');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getRoomById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log('api get room by id');
    const results = await this.roomService.findRoomById(id);
    return new ResponseRequest(res, results, 'Get room by id success.');
  }
}
