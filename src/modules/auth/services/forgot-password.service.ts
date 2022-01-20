import { ForgotPasswordDto } from '@auth/dtos/forgot-password.dto';
import { SendMailProducerService } from '@jobs/mail/send-mail-producer.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailDTO } from '@providers/dtos/mail.dto';
import { IUsersRepository } from '@users/repositories/users-repository.interface';
import { randomUUID } from 'crypto';
import { addHours } from 'date-fns';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    private configService: ConfigService,
    private readonly sendMailProducerService: SendMailProducerService,
  ) {}

  async execute({ email }: ForgotPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    const token_expiration = addHours(new Date(), 2);
    const token = randomUUID();

    if (!user) {
      throw new HttpException('E-mail inválido!', HttpStatus.BAD_REQUEST);
    }

    if (!user.active) {
      throw new HttpException('Usuário inativo!', HttpStatus.UNAUTHORIZED);
    }

    user.token = token;
    user.token_expiration = token_expiration;

    const appUrl = this.configService.get<string>('APP_FRONTEND');

    await this.userRepository.update(user);

    const emailData: ISendMailDTO = {
      data: {
        name: user.name,
        link: `${appUrl}/change-password?token=${token}`,
      },
      subject: '[Finance.io] Esqueci Minha Senha',
      template: 'forgot-password',
      to: email,
    };

    await this.sendMailProducerService.sendMail(emailData);
  }
}
