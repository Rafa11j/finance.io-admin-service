import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Transaction } from '@transactions/entities/Transaction';
import { IFindTransactionResponse } from '@transactions/interfaces/find-transaction-response';
import { ITransactionRepository } from '@transactions/interfaces/transaction-respository';

@Injectable()
export class FindTransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string): Promise<IFindTransactionResponse> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new HttpException(
        'Transação não encontrada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.buildTransaction(transaction);
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
    description,
    number_installments,
    payment_method_id,
    payment_method,
  }: Transaction): IFindTransactionResponse {
    const transaction: IFindTransactionResponse = {
      account: account.name,
      account_id,
      category: category.name,
      category_id,
      date,
      form_payment,
      id,
      type,
      value,
      description,
      number_installments,
      payment_method_id,
    };

    if (type === 'expense') {
      transaction.payment_method = payment_method.name;
    }

    return transaction;
  }
}
