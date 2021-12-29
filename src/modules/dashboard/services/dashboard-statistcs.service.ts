import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';
import { IAccountRepository } from 'src/modules/accounts/interfaces/account-respository';
import { IStatisticsResponse } from '../interfaces/statistcs-response';

@Injectable()
export class DashboarStatisticsService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(user_id: string): Promise<IStatisticsResponse> {
    const accounts = await this.accountRepository.findAll(user_id);
    const transactions = await this.transactionRepository.findAll(user_id);
    const balance = accounts
      .map(account => Number(account.balance))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const incomes = transactions
      .filter(transaction => transaction.type === 'income')
      .map(income => Number(income.value))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .map(income => Number(income.value))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const response: IStatisticsResponse = {
      balance,
      incomes,
      expenses,
      transactions_performed: transactions.length,
    };

    return response;
  }
}
