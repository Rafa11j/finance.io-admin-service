import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

@Injectable()
export class FindUserService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
