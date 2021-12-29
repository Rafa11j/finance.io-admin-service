import { AccountRepository } from '../repositories/account.repository';

export const accountProviders = [
  {
    provide: 'AccountRepository',
    useClass: AccountRepository,
  },
];
