import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ISendMailDTO } from '@providers/dtos/mail.dto';
import { IMailProvider } from '@providers/models/mail-provider';
import { Job } from 'bull';

@Processor('mail-queue')
export class SendMailConsumer {
  constructor(
    @Inject('MailProvider')
    private readonly mailProvider: IMailProvider,
  ) {}

  @Process('mail-job')
  async handler(job: Job<ISendMailDTO>): Promise<void> {
    const { data } = job;

    await this.mailProvider.sendMail(data);
  }
}
