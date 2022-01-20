import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';
import { format, lastDayOfMonth } from 'date-fns';
import {
  IIncomesCategory,
  IIncomesCategoryData,
  IIncomesCategoryResponse,
} from '../interfaces/statistcs-response';

@Injectable()
export class DashboarCategoryGraphService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(user_id: string): Promise<IIncomesCategoryResponse> {
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

    const incomesTransactions: IIncomesCategory[] = transactions
      .filter(transaction => transaction.type === 'income')
      .map(data => ({
        id: data.id,
        value: data.value,
        category: data.category.name,
        color: data.category.color,
      }));
    const expensesTransactions: IIncomesCategory[] = transactions
      .filter(transaction => transaction.type === 'expense')
      .map(data => ({
        id: data.id,
        value: data.value,
        category: data.category.name,
        color: data.category.color,
      }));

    return {
      income: this.groupByCategory(incomesTransactions),
      expense: this.groupByCategory(expensesTransactions),
    };
  }

  private groupByCategory(data: IIncomesCategory[]): IIncomesCategoryData {
    return data.reduce((pv, cv) => {
      (pv[cv.category] = pv[cv.category] || []).push(cv);
      return pv;
    }, {});
  }
}
