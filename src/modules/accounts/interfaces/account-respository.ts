import { IPaginatedParams } from '@shared/models/paginated';
import { Account } from '../entities/Account';
import { CreateAccount } from './create-account';

export interface IAccountRepository {
  findAll(user_id: string): Promise<Account[]>;
  findAllPaginated(data: IPaginatedParams): Promise<[Account[], number]>;
  findById(id: string): Promise<Account | undefined>;
  create(createAccount: CreateAccount): Promise<Account>;
  update(account: Account): Promise<Account>;
  delete(id: string): Promise<void>;
}
