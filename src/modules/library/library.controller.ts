import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/response-api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { CreateLibraryDto } from './dtos/library.create.dto';
import { LibraryService } from './library.service';
import { Request, Response } from 'express';
import { Users } from '../users/entities/user.entity';
import { UpdateLibraryDto } from './dtos/library.update.dto';

@Controller('api/library')
@ApiTags('library')
export class LibraryController {
  constructor(private readonly service: LibraryService) {
    const createLibraryDto: CreateLibraryDto = {
      name: 'Library Name',
      foundYear: new Date('2023-03-17'),
    };
    this.service.initLibrary(createLibraryDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  async updateLibrary(
    @Body() libraryDto: UpdateLibraryDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<ResponseRequest> {
    const { user }: Request | any = req;
    const updatedBy: Users = user.userId;
    const result = await this.service.updateLibrary(libraryDto, updatedBy);
    return new ResponseRequest(res, result, 'Update library success');
  }

  @Get()
  async getLibraryInfo(@Res() res: Response): Promise<ResponseRequest> {
    const result = await this.service.getLibraryInfo();
    return new ResponseRequest(res, result, 'Get library info success.');
  }
}
