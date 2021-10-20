import { Inject, Injectable, Logger } from '@nestjs/common';
import { IHashProvider } from '@providers/models/hash-provider';
import { User } from '@users/entities/User';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

@Injectable()
export class FindAllUsersService {
  private readonly logger = new Logger(FindAllUsersService.name);

  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async getUsers(): Promise<User[]> {
    const password = await this.hashProvider.hash('12345');
    const date = new Date();

    const curretnDate = dayjs(date, { locale: 'pt-br' });
    const brazilianDate = dayjs(date)
      .add(2, 'hours')
      .format('YYYY-MM-DD[T]hh:mm:ss');

    this.logger.debug(password);
    this.logger.debug(`Date: ${date}`);
    this.logger.debug(`Curretn Date: ${curretnDate}`);
    this.logger.debug(`Brazilian Date: ${brazilianDate}`);

    return this.userRepository.findAll();
  }
}
