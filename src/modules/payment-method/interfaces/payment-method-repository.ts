import { PaymentMethod } from '@payment-method/entities/payment-method';
import { ICreatePaymentMethod } from './create-payment-method';
import { IFindPaymentMethodPaginated } from './find-payment-method-paginated';

export interface IPaymentMethodRepository {
  findAll(user_id: string): Promise<PaymentMethod[]>;
  findAllPaginated(
    data: IFindPaymentMethodPaginated,
  ): Promise<[PaymentMethod[], number]>;
  findById(id: string): Promise<PaymentMethod | undefined>;
  create(createCategory: ICreatePaymentMethod): Promise<PaymentMethod>;
  update(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
  delete(id: string): Promise<void>;
}
