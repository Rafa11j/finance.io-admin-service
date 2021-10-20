import { BullModule, InjectQueue } from '@nestjs/bull';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { SendMailConsumer } from './mail/send-mail-consumer';
import { SendMailProducerService } from './mail/send-mail-producer.service';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
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
