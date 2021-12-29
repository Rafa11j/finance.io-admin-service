import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';
import { IAccountRepository } from 'src/modules/accounts/interfaces/account-respository';

@Injectable()
export class DeleteTransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new HttpException(
        'Transação não encontrada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.accountRepository.findById(
      transaction.account_id,
    );

    if (!account) {
      throw new HttpException(
        'Conta da transação não encontrada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (transaction.type === 'income') {
      account.balance = Number(account.balance) - Number(transaction.value);
    } else {
      account.balance = Number(account.balance) + Number(transaction.value);
    }

    await this.accountRepository.update(account);

    await this.transactionRepository.delete(id);
  }
}
