import { FormPaymentType } from '../types/formPaymentType';
import { TransactionType } from '../types/transactionType';

export interface IUpdateTransactionDto {
  id: string;
  category_id: string;
  value: number;
  type: TransactionType;
  form_payment: FormPaymentType;
  account_id: string;
  date: Date;
  payment_method_id?: string;
  number_installments?: number;
  description: string;
}
