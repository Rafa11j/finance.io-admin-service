import { UserTypeEnum } from '@users/enum/user-type';

export interface IAuthResponse {
  id: string;
  token: string;
  email: string;
  name: string;
  occupation: string;
  avatar?: string;
  income?: number;
  user_type: UserTypeEnum;
}
