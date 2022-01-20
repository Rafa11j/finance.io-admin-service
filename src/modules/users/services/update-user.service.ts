import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/users-repository.interface';
import { IUpdateUser } from '@users/interfaces/update-user';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    name,
    occupation,
    income,
    id,
  }: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyUserEmail = await this.userRepository.findByEmail(email);

    if (email !== user.email && verifyUserEmail) {
      throw new HttpException('E-mail já utilizado!', HttpStatus.BAD_REQUEST);
    }

    user.name = name;
    user.email = email;
    user.occupation = occupation;
    user.income = income;

    await this.userRepository.update(user);

    return user;
  }
}
