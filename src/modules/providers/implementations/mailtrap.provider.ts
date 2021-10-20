import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ISendMailDTO } from '@providers/dtos/mail.dto';
import { IMailProvider } from '@providers/models/mail-provider';
import { resolve } from 'path';

@Injectable()
export class MailTrapProvider implements IMailProvider {
  private readonly logger = new Logger(MailTrapProvider.name);

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

      await this.mailerService.sendMail({
        from: from || '"Equipe Finance.io" <noreply@finance.io>',
        to,
        subject,
        template: templatePath,
        context: data,
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
