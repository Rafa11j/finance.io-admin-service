import { DeleteTransactionService } from '@transactions/services/delete-transaction.service';
import { FindAllTransactionsPaginatedService } from '@transactions/services/find-all-transactions-paginated.service';
import { FindTransactionService } from '@transactions/services/find-transaction.service';
import { UpdateTransactionService } from '@transactions/services/update-transaction.service';
import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionService } from '../services/create-transaction.service';

export const transactionProviders = [
  {
    provide: 'TransactionRepository',
    useClass: TransactionRepository,
  },
  CreateTransactionService,
  FindAllTransactionsPaginatedService,
  FindTransactionService,
  UpdateTransactionService,
  DeleteTransactionService,
];
