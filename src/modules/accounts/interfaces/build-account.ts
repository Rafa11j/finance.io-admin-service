import { Account } from '../entities/Account';
import { AccountResponse } from './account-response';

export const buildAccount = ({
  id,
  name,
  type,
  balance,
}: Account): AccountResponse => {
  return {
    id,
    name,
    type,
    balance,
  };
};
