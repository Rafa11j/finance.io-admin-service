import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { resolve } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { globalProviders } from './global-providers';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '9d8def5897d489',
          pass: '577c00c37578eb',
        },
      },
      defaults: {
        from: 'Equipe Finance.io <noreply@finance.io>',
      },
      template: {
        // dir: resolve(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [...globalProviders],
  exports: [...globalProviders],
})
export class ProvidersModule {}
