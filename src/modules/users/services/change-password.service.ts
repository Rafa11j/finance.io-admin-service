import { IChangePassword } from '@auth/interfaces/change-password';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IHashProvider } from '@providers/models/hash-provider';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

@Injectable()
export class ChangePasswordService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    old_password,
    confirm_password,
    password,
  }: IChangePassword): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }

    const passwordMatch = await this.hashProvider.compare(
      old_password,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Senha atual incorreta!', HttpStatus.BAD_REQUEST);
    }

    if (password !== confirm_password) {
      throw new HttpException(
        'Senha e confirmar senha diferentes!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPassword = await this.hashProvider.hash(password);

    user.password = newPassword;

    await this.userRepository.update(user);
  }
}
