import { ISendMailDTO } from '@providers/dtos/mail.dto';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
