import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.login.dto';
import { authMsg } from 'src/constants/constants.message.response';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log('api login');
    const checkUser = await this.authService.login(loginDto);
    return new ResponseRequest(res, checkUser, authMsg.login);
  }
}
