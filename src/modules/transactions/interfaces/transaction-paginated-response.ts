import { FormPaymentType } from '../types/formPaymentType';
import { TransactionType } from '../types/transactionType';

export interface ITransactionPaginatedResponse {
  id: string;
  category_id: string;
  category: string;
  value: number;
  type: TransactionType;
  form_payment: FormPaymentType;
  account_id: string;
  account: string;
  date: Date;
}
