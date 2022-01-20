import { MailerService } from '@nestjs-modules/mailer';
import { HashProvider } from './implementations/bcrypt.provider';
import { MailTrapProvider } from './implementations/mailtrap.provider';
import { SESMailProvider } from './implementations/ses-mail.provider';
import { IHashProvider } from './models/hash-provider';
import { IMailProvider } from './models/mail-provider';

export const globalProviders = [
  {
    provide: 'HashProvider',
    useFactory: (): IHashProvider => new HashProvider(),
  },
  {
    provide: 'MailProvider',
    useFactory: (mailerService: MailerService): IMailProvider => {
      // return new MailTrapProvider(mailerService);
      return new SESMailProvider(mailerService);
    },
    inject: [MailerService],
  },
];
