import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from 'src/modules/accounts/interfaces/account-respository';
import { IUpdateTransactionDto } from '@transactions/interfaces/update-transaction.dto';
import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../interfaces/transaction-respository';

@Injectable()
export class UpdateTransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    account_id,
    category_id,
    date,
    description,
    form_payment,
    type,
    id,
    value,
    number_installments,
    payment_method_id,
  }: IUpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new HttpException(
        'Transação não encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.accountRepository.findById(account_id);

    // Verificar saldo na conta
    if (type === 'expense' && Number(account.balance) < value) {
      throw new HttpException(
        'Saldo insuficiente da conta',
        HttpStatus.BAD_REQUEST,
      );
    }

    transaction.account_id = account_id;
    transaction.category_id = category_id;
    transaction.date = date;
    transaction.description = description;
    transaction.form_payment = form_payment;
    transaction.type = type;
    transaction.value = value;
    transaction.number_installments = number_installments;
    transaction.payment_method_id = payment_method_id;

    await this.transactionRepository.update(transaction);

    return transaction;
  }
}
