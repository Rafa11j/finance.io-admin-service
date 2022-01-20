import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';
import { lastDayOfMonth } from 'date-fns';
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const start_date = new Date(year, month, 1);
    const end_date = new Date(year, month, lastDayOfMonth(date).getDate());
    const transactions = await this.transactionRepository.findAllBetweenDate({
      user_id,
      start_date,
      end_date,
    });

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
