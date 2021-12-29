import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../interfaces/account-respository';

@Injectable()
export class DeleteAccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
    }

    await this.accountRepository.delete(id);
  }
}
