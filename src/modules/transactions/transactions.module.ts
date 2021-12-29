import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/Transaction';
import { transactionProviders } from './providers';
import { TransactionEntityRepository } from './repositories/transaction-entity-repository';
import { AccountModule } from '../accounts/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionEntityRepository]),
    AccountModule,
  ],
  controllers: [TransactionsController],
  providers: [...transactionProviders],
  exports: [...transactionProviders],
})
export class TransactionsModule {}
