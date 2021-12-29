import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from 'src/modules/accounts/interfaces/account-respository';
import { ICreateTransactionDto } from '../interfaces/create-transaction.dto';
import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../interfaces/transaction-respository';

@Injectable()
export class CreateTransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(data: ICreateTransactionDto): Promise<Transaction> {
    const account = await this.accountRepository.findById(data.account_id);

    // Verificar saldo na conta
    if (data.type === 'expense' && Number(account.balance) < data.value) {
      throw new HttpException(
        'Saldo insuficiente da conta',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Cariar uma transação
    const transaction = await this.transactionRepository.create(data);

    // atualizar o saldo da conta
    if (data.type === 'income') {
      account.balance = Number(account.balance) + data.value;
    } else {
      account.balance -= data.value;
    }
    await this.accountRepository.update(account);

    return transaction;
  }
}
