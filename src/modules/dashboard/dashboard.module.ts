import { Module } from '@nestjs/common';
import { TransactionsModule } from '@transactions/transactions.module';
import { AccountModule } from '../accounts/account.module';
import { DashboardController } from './dashboard.controller';
import { DashboarCategoryGraphService } from './services/dashboard-category-graph.service';
import { DashboarStatisticsService } from './services/dashboard-statistcs.service';

@Module({
  imports: [AccountModule, TransactionsModule],
  controllers: [DashboardController],
  providers: [DashboarStatisticsService, DashboarCategoryGraphService],
})
export class DashboardModule {}
