import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/response-api';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const checkUser = await this.authService.login(loginDto);
    return new ResponseRequest(res, checkUser, `Login sucess.`);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req: Request, @Res() res: Response) {
    const { user }: any = req;
    return new ResponseRequest(res, user, `Get me success.`);
  }
}
