import { Body, Controller, Get, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/response-api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { CreateLibraryDto } from './dtos/library.create.dto';
import { LibraryService } from './library.service';
import { Response } from 'express';
import { UpdateLibraryDto } from './dtos/library.update.dto';
import { libraryController } from 'src/constants/constants.controller.name';
import { libraryMsg } from 'src/constants/constants.message.response';

@Controller(libraryController.name)
@ApiTags(libraryController.tag)
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
  ): Promise<ResponseRequest> {
    const result = await this.service.updateLibrary(libraryDto);
    return new ResponseRequest(res, result, libraryMsg.update);
  }

  @Get()
  async getLibraryInfo(@Res() res: Response): Promise<ResponseRequest> {
    const result = await this.service.getLibraryInfo();
    return new ResponseRequest(res, result, libraryMsg.getInfo);
  }
}
