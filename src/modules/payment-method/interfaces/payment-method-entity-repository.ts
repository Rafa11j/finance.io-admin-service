import { PaymentMethod } from '@payment-method/entities/payment-method';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaymentMethod)
export class PaymentMethodEntityRepository extends Repository<PaymentMethod> {}
