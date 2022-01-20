import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IHashProvider } from '@providers/models/hash-provider';
import { IUsersRepository } from '@users/repositories/users-repository.interface';
import { AuthenticateDto } from '../dtos/authenticate.dto';
import { IAuthResponse } from '../interfaces/auth';

@Injectable()
export class AuthenticateService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    @Inject('HashProvider')
    private hashProvider: IHashProvider,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute({ email, password }: AuthenticateDto): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'E-mail/senha inválidos!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException(
        'E-mail/senha inválidos!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.active) {
      throw new HttpException('Usuário inativo!', HttpStatus.UNAUTHORIZED);
    }

    const { secret } = this.configService.get('jwt');

    const token = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        name: user.name,
        user_type: user.user_type,
      },
      { secret, expiresIn: '1d' },
    );

    const filesUrl = this.configService.get('FILE_URL_AWS');

    const avatar = user?.avatar ? `${filesUrl}/${user?.avatar}` : null;

    return {
      token,
      id: user.id,
      email: user.email,
      name: user.name,
      occupation: user.occupation,
      avatar,
      user_type: user.user_type,
      income: user?.income,
    };
  }
}
