import { AccountType } from '../enums/account';

export type AccountResponse = {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
};
