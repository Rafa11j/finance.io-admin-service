import { Inject, Injectable } from '@nestjs/common';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';
import { CreateAccount } from '../interfaces/create-account';

@Injectable()
export class CreateAccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    balance,
    name,
    type,
    user_id,
  }: CreateAccount): Promise<AccountResponse> {
    const account = await this.accountRepository.create({
      balance,
      name,
      type,
      user_id,
    });
    return buildAccount(account);
  }
}
