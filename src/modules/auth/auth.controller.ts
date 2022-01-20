import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { IAuthResponse } from './interfaces/auth';
import { AuthenticateService } from './services/authenticate.service';
import { ForgotPasswordService } from './services/forgot-password.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authenticateService: AuthenticateService,
    private readonly forgotPasswordService: ForgotPasswordService,
  ) {}

  @Post()
  async auth(@Body() data: AuthenticateDto): Promise<IAuthResponse> {
    return this.authenticateService.execute(data);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto): Promise<void> {
    await this.forgotPasswordService.execute(data);
  }
}
