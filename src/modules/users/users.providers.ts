import { UsersRepository } from './repositories/users.repository';

export const userProviders = [
  {
    provide: 'UsersRepository',
    useClass: UsersRepository,
  },
];
