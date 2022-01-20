import { UserTypeEnum } from '@users/enum/user-type';

export interface ICreateUser {
  name: string;
  email: string;
  token_expiration: Date;
  occupation: string;
  income?: number;
  active: boolean;
  user_type: UserTypeEnum;
}
