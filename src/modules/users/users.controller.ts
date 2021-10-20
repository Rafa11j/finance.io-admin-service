import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/User';
import { CompleteRegistrationService } from './services/complete-registration.service';
import { CreateUserService } from './services/create-user.service';
import { FindAllUsersService } from './services/find-all.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly findAllUserService: FindAllUsersService,
    private readonly createUserService: CreateUserService,
    private readonly completeRegistrationService: CompleteRegistrationService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    const users = await this.findAllUserService.getUsers();

    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req): Promise<void> {
    return req.user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDTO): Promise<User> {
    const user = await this.createUserService.create(userDto);
    return user;
  }

  @Put('activation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async completeRegistration(
    @Body() data: CompleteRegistrationDTO,
  ): Promise<void> {
    await this.completeRegistrationService.execute(data);
  }
}
