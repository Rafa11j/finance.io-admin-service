import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entities/Transaction';

@EntityRepository(Transaction)
export class TransactionEntityRepository extends Repository<Transaction> {}
