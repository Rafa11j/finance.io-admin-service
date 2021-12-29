import { Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { ICreatePaymentMethod } from '@payment-method/interfaces/create-payment-method';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';

@Injectable()
export class CreatePaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute({
    name,
    types,
    user_id,
  }: ICreatePaymentMethod): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.create({
      name,
      types,
      user_id,
    });

    return paymentMethod;
  }
}
