import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from '@users/enum/user-type';

export const Roles = (...roles: UserTypeEnum[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
