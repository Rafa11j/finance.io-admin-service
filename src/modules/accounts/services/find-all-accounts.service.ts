import { Inject, Injectable } from '@nestjs/common';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';

@Injectable()
export class FindAllAccountsService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(user_id: string): Promise<AccountResponse[]> {
    const accounts = await this.accountRepository.findAll(user_id);
    return accounts.map(account => buildAccount(account));
  }
}
