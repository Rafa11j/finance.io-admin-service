import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from '@users/entities/User';
import dayjs from 'dayjs';
import { CreateUserDTO } from '@users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { IUsersRepository } from '@users/repositories/users-repository.interface';
import { SendMailProducerService } from 'src/modules/jobs/mail/send-mail-producer.service';
import { ISendMailDTO } from '@providers/dtos/mail.dto';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject('UsersRepository')
    private userRepository: IUsersRepository,
    private readonly configService: ConfigService,
    private readonly sendMailProducerService: SendMailProducerService,
  ) {}

  async create({ email, name, occupation }: CreateUserDTO): Promise<User> {
    const token_expiration = dayjs(new Date()).add(2, 'hours').toDate();

    const verifyUserEmail = await this.userRepository.findByEmail(email);

    if (verifyUserEmail) {
      throw new HttpException('E-mail já utilizado!', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.create({
      email,
      name,
      token_expiration,
      occupation,
    });

    const appUrl = this.configService.get<string>('APP_FRONTEND');

    const { token } = user;

    const emailData: ISendMailDTO = {
      data: {
        name,
        link: `${appUrl}/activation?token=${token}`,
      },
      subject: '[Finance.io] Completar Cadastro',
      template: 'create-account',
      to: email,
    };

    await this.sendMailProducerService.sendMail(emailData);

    return user;
  }
}
