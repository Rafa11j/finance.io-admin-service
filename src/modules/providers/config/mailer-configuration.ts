import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SES } from 'aws-sdk';

@Injectable()
export class MailerModuleConfiguration implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    const isDeveloptment = this.configService.get('NODE_ENV') === 'development';
    const awsRegion = this.configService.get('awsDefaultRegion');
    const mailTrapConfig = this.configService.get('mailTrap');

    const options: MailerOptions = {
      defaults: {
        from: '"Equipe Finance.io" <contact@financeio.app>',
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };

    if (isDeveloptment) {
      options.transport = {
        ...mailTrapConfig,
      };
    } else {
      options.transport = {
        SES: new SES({
          apiVersion: '2010-12-01',
          region: awsRegion,
        }),
      };
    }

    return options;
  }
}
