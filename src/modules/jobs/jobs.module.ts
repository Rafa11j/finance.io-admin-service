import { BullModule, InjectQueue } from '@nestjs/bull';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SendMailConsumer } from './mail/send-mail-consumer';
import { SendMailProducerService } from './mail/send-mail-producer.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            ...configService.get('redis'),
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  controllers: [],
  providers: [SendMailConsumer, SendMailProducerService],
  exports: [SendMailConsumer, SendMailProducerService],
})
export class JobsModule {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  configure(consumer: MiddlewareConsumer): void {
    const { router } = createBullBoard([new BullAdapter(this.mailQueue)]);

    consumer.apply(router).forRoutes('/admin/queues');
  }
}
