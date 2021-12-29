import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { Account } from './entities/Account';
import { accountProviders } from './providers';
import { AccountEntityRepository } from './repositories/account-entity-repository';
import { CreateAccountService } from './services/create-account.service';
import { DeleteAccountService } from './services/delete-account.service';
import { FindAccountService } from './services/find-account.service';
import { FindAllAccountsPaginatedService } from './services/find-all-accounts-paginated.service';
import { FindAllAccountsService } from './services/find-all-accounts.service';
import { UpdateAccountService } from './services/update-account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountEntityRepository])],
  controllers: [AccountController],
  providers: [
    ...accountProviders,
    CreateAccountService,
    FindAllAccountsService,
    FindAccountService,
    FindAllAccountsPaginatedService,
    UpdateAccountService,
    DeleteAccountService,
  ],
  exports: [...accountProviders],
})
export class AccountModule {}
