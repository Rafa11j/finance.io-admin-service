import { AccountType } from '../enums/account';

export type CreateAccount = {
  name: string;
  type: AccountType;
  user_id: string;
  balance: number;
};
