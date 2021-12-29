import { Inject, Injectable } from '@nestjs/common';
import { IPaginated, IPaginatedParams } from '@shared/models/paginated';
import { Transaction } from '@transactions/entities/Transaction';
import { ITransactionPaginatedResponse } from '@transactions/interfaces/transaction-paginated-response';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';

@Injectable()
export class FindAllTransactionsPaginatedService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    page,
    size,
    user_id,
  }: IPaginatedParams): Promise<IPaginated<ITransactionPaginatedResponse>> {
    const [transactions, count] =
      await this.transactionRepository.findAllPaginated({
        page: Number(page) * Number(size),
        size: Number(size),
        user_id,
      });

    const total_pages = Math.ceil(count / Number(size));
    const data = transactions.map(transaction =>
      this.buildTransaction(transaction),
    );

    return {
      data,
      page: Number(page),
      elements_in_page: transactions.length,
      elements_per_page: Number(size),
      total_elements: count,
      total_pages,
      first_page: Number(page) === 0,
      last_page: total_pages === 0 ? true : Number(page) === total_pages - 1,
    };
  }

  private buildTransaction({
    account_id,
    account,
    category,
    category_id,
    date,
    form_payment,
    id,
    type,
    value,
  }: Transaction): ITransactionPaginatedResponse {
    return {
      account: account.name,
      account_id,
      category: category.name,
      category_id,
      date,
      form_payment,
      id,
      type,
      value,
    };
  }
}
