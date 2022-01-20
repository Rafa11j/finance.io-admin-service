import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { multerOptions } from '@config/multer';
import { IPaginated } from '@shared/models/paginated';
import { Roles } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { CompleteRegistrationDTO } from './dtos/complete-registration.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/User';
import { CompleteRegistrationService } from './services/complete-registration.service';
import { CreateUserService } from './services/create-user.service';
import { FindAllUsersService } from './services/find-all.service';
import { UploadUserAvatarService } from './services/upload-user-avatar.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UpdateUserService } from './services/update-user.service';
import { ChangePasswordService } from './services/change-password.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { IUserTypeResponse } from './interfaces/user-type-response';
import { FindAllUsersPaginatedService } from './services/find-all-users-paginated.service';
import { UserTypeEnum } from './enum/user-type';
import { ActiveUserService } from './services/active-user.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly findAllUserService: FindAllUsersService,
    private readonly createUserService: CreateUserService,
    private readonly completeRegistrationService: CompleteRegistrationService,
    private readonly uploadUserAvatar: UploadUserAvatarService,
    private readonly updateUserService: UpdateUserService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly findAllUsersPaginatedService: FindAllUsersPaginatedService,
    private readonly activeUserService: ActiveUserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserTypeEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    const users = await this.findAllUserService.getUsers();

    return users;
  }

  @Get('/paginated')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserTypeEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async listPaginated(
    @Query('size') size = 20,
    @Query('page') page = 0,
  ): Promise<IPaginated<User>> {
    return this.findAllUsersPaginatedService.execute({
      page,
      size,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req): Promise<void> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-type')
  async getUserType(@Request() req): Promise<IUserTypeResponse> {
    return {
      user_type: req.user.user_type,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserTypeEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDTO): Promise<User> {
    const user = await this.createUserService.create(userDto);
    return user;
  }

  @Patch('/upload-avatar')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async uploadAvatar(
    @UploadedFile() file: any,
    @Request() req,
  ): Promise<string> {
    const { id } = req.user;
    return this.uploadUserAvatar.execute(id, file);
  }

  @Put('activation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async completeRegistration(
    @Body() data: CompleteRegistrationDTO,
  ): Promise<void> {
    await this.completeRegistrationService.execute(data);
  }

  @Put('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Request() req, @Body() data: UpdateUserDTO): Promise<User> {
    const { id } = req.user;
    return this.updateUserService.execute({
      id,
      ...data,
    });
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Request() req,
    @Body() data: ChangePasswordDto,
  ): Promise<void> {
    const { id } = req.user;
    return this.changePasswordService.execute({
      ...data,
      user_id: id,
    });
  }

  @Patch('/:id/enable')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async enable(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.activeUserService.execute(id);
  }
}
