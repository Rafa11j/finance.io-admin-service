import { IPaginatedParams } from '@shared/models/paginated';
import { ICreateTransactionDto } from './create-transaction.dto';
import { Transaction } from '../entities/Transaction';
import { IFindTransactionGraph } from './find-transaction-graph.request';

export interface ITransactionRepository {
  findAll(user_id: string): Promise<Transaction[]>;
  findAllBetweenDate(data: IFindTransactionGraph): Promise<Transaction[]>;
  findAllPaginated(data: IPaginatedParams): Promise<[Transaction[], number]>;
  findById(id: string): Promise<Transaction | undefined>;
  create(create: ICreateTransactionDto): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
