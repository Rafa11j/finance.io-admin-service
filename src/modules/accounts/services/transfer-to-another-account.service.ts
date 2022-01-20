import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';
import { TransferAccount } from '../interfaces/transfer-account';

@Injectable()
export class TransferToAnotherAccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    account_destination_id,
    current_account_id,
    value,
  }: TransferAccount): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(current_account_id);

    if (!account) {
      throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
    }

    const accountDestination = await this.accountRepository.findById(
      account_destination_id,
    );

    if (!accountDestination) {
      throw new HttpException(
        'Conta de destino não encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (value > Number(account.balance)) {
      throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST);
    }

    account.balance = Number(account.balance) - value;
    accountDestination.balance = Number(accountDestination.balance) + value;

    await this.accountRepository.update(account);
    await this.accountRepository.update(accountDestination);

    return buildAccount(account);
  }
}
