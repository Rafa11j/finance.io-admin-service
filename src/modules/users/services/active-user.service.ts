import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

@Injectable()
export class ActiveUserService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.active = !user.active;

    await this.userRepository.update(user);
  }
}
