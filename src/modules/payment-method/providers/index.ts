import { PaymentMethodRepository } from '@payment-method/repositories/payment-method.repository';

export const paymentMethodsProviders = [
  {
    provide: 'PaymentMethodRepository',
    useClass: PaymentMethodRepository,
  },
];
