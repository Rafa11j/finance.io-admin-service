import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/users-repository.interface';

@Injectable()
export class UploadUserAvatarService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(id: string, file: any): Promise<string> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nodeEnv = this.configService.get('NODE_ENV');
    const filesUrl = this.configService.get('FILE_URL_AWS');

    const filesUrlProduction = `https://s3.sa-east-1.amazonaws.com/finance.io-dev/${user?.avatar}`;

    user.avatar = nodeEnv === 'development' ? file.filename : file.key;

    await this.userRepository.update(user);

    const avatar =
      nodeEnv === 'production'
        ? filesUrlProduction
        : `${filesUrl}/${user?.avatar}`;

    return avatar;
  }
}
