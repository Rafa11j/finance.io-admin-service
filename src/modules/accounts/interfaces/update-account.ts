import { AccountType } from '../enums/account';

export type UpdateAccount = {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
};
