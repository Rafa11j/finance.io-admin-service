import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IHashProvider } from '@providers/models/hash-provider';
import { ICompleteRegistration } from '@users/interfaces/complete-registration';
import { IUsersRepository } from '@users/repositories/users-repository.interface';
import dayjs from 'dayjs';

@Injectable()
export class CompleteRegistrationService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({
    token,
    password,
    confirm_password,
  }: ICompleteRegistration): Promise<void> {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new HttpException('Token inválido!', HttpStatus.BAD_REQUEST);
    }

    const currentDate = new Date();

    // Validar tempo de expiração do token
    const tokenExpiration = user.token_expiration;
    const tokenExpirationTimeDiff = dayjs(tokenExpiration).diff(
      currentDate,
      'hour',
    );

    if (tokenExpirationTimeDiff < 0) {
      throw new HttpException(
        'Token de ativação expirado! Solicite o envio do link novamente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password !== confirm_password) {
      throw new HttpException(
        'Senha e Confirmação de Senha, devem ser iguais!',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await this.hashProvider.hash(password);
    user.active = true;

    await this.userRepository.update(user);
  }
}
