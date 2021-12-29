import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginatedParams } from '@shared/models/paginated';
import { ICreateTransactionDto } from '../interfaces/create-transaction.dto';
import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../interfaces/transaction-respository';
import { TransactionEntityRepository } from './transaction-entity-repository';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntityRepository)
    private readonly transactionRepository: TransactionEntityRepository,
  ) {}

  async findAll(user_id: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { user_id },
      relations: ['category', 'account', 'payment_method'],
    });
  }

  async findAllPaginated({
    page,
    size,
    user_id,
  }: IPaginatedParams): Promise<[Transaction[], number]> {
    return this.transactionRepository.findAndCount({
      skip: page,
      take: size,
      where: { user_id },
      order: { date: 'DESC' },
      relations: ['category', 'account', 'payment_method'],
    });
  }

  async findById(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne(id, {
      relations: ['category', 'account', 'payment_method'],
    });
  }

  async create({
    account_id,
    category_id,
    date,
    description,
    form_payment,
    type,
    user_id,
    value,
    number_installments,
    payment_method_id,
  }: ICreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      account_id,
      category_id,
      date,
      description,
      form_payment,
      type,
      user_id,
      value,
      number_installments,
      payment_method_id,
    });

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  update({
    account_id,
    category_id,
    date,
    description,
    form_payment,
    id,
    number_installments,
    payment_method_id,
    type,
    value,
  }: Transaction): Promise<Transaction> {
    return this.transactionRepository.save({
      account_id,
      category_id,
      date,
      description,
      form_payment,
      id,
      number_installments,
      payment_method_id,
      type,
      value,
    });
  }

  async delete(id: string): Promise<void> {
    await this.transactionRepository.softDelete(id);
  }
}
