import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { globalProviders } from './global-providers';
import { MailerModuleConfiguration } from './config/mailer-configuration';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerModuleConfiguration,
    }),
  ],
  controllers: [],
  providers: [...globalProviders],
  exports: [...globalProviders],
})
export class ProvidersModule {}
