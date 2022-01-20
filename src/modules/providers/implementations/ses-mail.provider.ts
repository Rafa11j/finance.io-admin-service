import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ISendMailDTO } from '@providers/dtos/mail.dto';
import { IMailProvider } from '@providers/models/mail-provider';
import { resolve } from 'path';

@Injectable()
export class SESMailProvider implements IMailProvider {
  private readonly logger = new Logger(SESMailProvider.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail({
    data,
    subject,
    template,
    to,
    from,
  }: ISendMailDTO): Promise<void> {
    try {
      const templatePath = resolve(__dirname, '..', 'templates', template);

      this.logger.debug('Enviando e-mail...');
      await this.mailerService.sendMail({
        from: from || '"Equipe Finance.io" <contact@financeio.app>',
        to,
        subject,
        template: templatePath,
        context: data,
      });
      this.logger.debug('Email enviado');
    } catch (err) {
      this.logger.error(err);
    }
  }
}
