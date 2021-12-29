import { Inject, Injectable } from '@nestjs/common';
import { IPaginated, IPaginatedParams } from '@shared/models/paginated';
import { AccountResponse } from '../interfaces/account-response';
import { IAccountRepository } from '../interfaces/account-respository';
import { buildAccount } from '../interfaces/build-account';

@Injectable()
export class FindAllAccountsPaginatedService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute({
    page,
    size,
    user_id,
  }: IPaginatedParams): Promise<IPaginated<AccountResponse>> {
    const [accounts, count] = await this.accountRepository.findAllPaginated({
      page: Number(page) * Number(size),
      size: Number(size),
      user_id,
    });

    const total_pages = Math.ceil(count / Number(size));
    const data = accounts.map(account => buildAccount(account));

    return {
      data,
      page: Number(page),
      elements_in_page: accounts.length,
      elements_per_page: Number(size),
      total_elements: count,
      total_pages,
      first_page: Number(page) === 0,
      last_page: Number(page) === total_pages - 1,
    };
  }
}
