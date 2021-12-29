import { Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';
import { IPaymentMethodResponse } from '@payment-method/interfaces/payment-method-response';
import { translatePaymentType } from '@shared/models/translatePaymentMethods';

@Injectable()
export class FindAllPaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute(user_id: string): Promise<IPaymentMethodResponse[]> {
    const paymentMethods = await this.paymentMethodRepository.findAll(user_id);

    return paymentMethods.map(paymentMethod =>
      this.buildPaymentMethod(paymentMethod),
    );
  }

  private buildPaymentMethod({
    id,
    name,
    types,
  }: PaymentMethod): IPaymentMethodResponse {
    return {
      id,
      name,
      types: this.formatTypes(types),
    };
  }

  private formatTypes(types: string): string {
    const typesList = types.split(', ');

    return typesList.map(type => translatePaymentType(type)).join(', ');
  }
}
