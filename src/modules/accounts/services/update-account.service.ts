import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';
import { UpdateAccount } from '../interfaces/update-account';

@Injectable()
export class UpdateAccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    balance,
    name,
    type,
    id,
  }: UpdateAccount): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
    }

    account.name = name;
    account.balance = balance;
    account.type = type;

    await this.accountRepository.update(account);

    return buildAccount(account);
  }
}
