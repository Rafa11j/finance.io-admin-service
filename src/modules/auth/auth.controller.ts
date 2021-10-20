import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { IAuthResponse } from './interfaces/auth';
import { AuthenticateService } from './services/authenticate.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  async auth(@Body() data: AuthenticateDto): Promise<IAuthResponse> {
    return this.authenticateService.execute(data);
  }
}
