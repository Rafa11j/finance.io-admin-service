import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginatedParams } from '@shared/models/paginated';
import { Account } from '../entities/Account';
import { IAccountRepository } from '../interfaces/account-respository';
import { CreateAccount } from '../interfaces/create-account';
import { AccountEntityRepository } from './account-entity-repository';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntityRepository)
    private readonly accountRepository: AccountEntityRepository,
  ) {}

  async findAll(user_id: string): Promise<Account[]> {
    return this.accountRepository.find({
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findAllPaginated({
    page,
    size,
    user_id,
  }: IPaginatedParams): Promise<[Account[], number]> {
    return this.accountRepository.findAndCount({
      skip: page,
      take: size,
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  async create(createAccount: CreateAccount): Promise<Account> {
    const account = this.accountRepository.create(createAccount);
    await this.accountRepository.save(account);
    return account;
  }

  async update(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }

  async delete(id: string): Promise<void> {
    await this.accountRepository.softDelete(id);
  }
}
