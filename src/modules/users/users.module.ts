import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { CreateUserService } from './services/create-user.service';
import { FindAllUsersService } from './services/find-all.service';
import { UserController } from './users.controller';
import { CompleteRegistrationService } from './services/complete-registration.service';
import { userProviders } from './users.providers';
import { UserRepository } from './repositories/users-entity-repository';
import { FindUserService } from './services/find-user.service';
import { UploadUserAvatarService } from './services/upload-user-avatar.service';
import { UpdateUserService } from './services/update-user.service';
import { ChangePasswordService } from './services/change-password.service';
import { FindAllUsersPaginatedService } from './services/find-all-users-paginated.service';
import { ActiveUserService } from './services/active-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [
    ...userProviders,
    FindAllUsersService,
    FindUserService,
    CreateUserService,
    CompleteRegistrationService,
    UploadUserAvatarService,
    UpdateUserService,
    ChangePasswordService,
    FindAllUsersPaginatedService,
    ActiveUserService,
  ],
  exports: [...userProviders],
})
export class UsersModule {}
