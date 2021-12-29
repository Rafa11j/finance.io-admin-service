import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';

@Injectable()
export class FindAccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(id: string): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
    }

    return buildAccount(account);
  }
}
