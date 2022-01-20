import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaginated, IPaginatedParams } from '@shared/models/paginated';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

@Injectable()
export class FindAllUsersPaginatedService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    private configService: ConfigService,
  ) {}

  async execute({ page, size }: IPaginatedParams): Promise<IPaginated<User>> {
    const [users, count] = await this.userRepository.findAllPaginated({
      page: Number(page) * Number(size),
      size: Number(size),
    });

    const total_pages = Math.ceil(count / Number(size));

    const data = users.map(user => this.buildUser(user));

    return {
      data,
      page: Number(page),
      elements_in_page: users.length,
      elements_per_page: Number(size),
      total_elements: count,
      total_pages,
      first_page: Number(page) === 0,
      last_page: total_pages === 0 ? true : Number(page) === total_pages - 1,
    };
  }

  private buildUser(user: User): User {
    const filesUrl = this.configService.get('FILE_URL_AWS');

    const avatar = user?.avatar ? `${filesUrl}/${user?.avatar}` : null;

    return {
      ...user,
      avatar,
    };
  }
}
