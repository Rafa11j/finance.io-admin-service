import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ISendMailDTO } from '@providers/dtos/mail.dto';
import { Queue } from 'bull';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('mail-queue') private queue: Queue) {}

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.queue.add('mail-job', data);
  }
}
