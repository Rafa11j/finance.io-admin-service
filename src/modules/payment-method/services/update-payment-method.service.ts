import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';
import { IPaymentMethodResponse } from '@payment-method/interfaces/payment-method-response';
import { IUpdatePaymentMethod } from '@payment-method/interfaces/update-payment-method';
import { translatePaymentType } from '@shared/models/translatePaymentMethods';

@Injectable()
export class UpdatePaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute({
    id,
    name,
    types,
  }: IUpdatePaymentMethod): Promise<IPaymentMethodResponse> {
    const paymentMethod = await this.paymentMethodRepository.findById(id);

    if (!paymentMethod) {
      throw new HttpException(
        'Método de pagamento não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    paymentMethod.name = name;
    paymentMethod.types = types.join(', ');

    this.paymentMethodRepository.update(paymentMethod);

    return this.buildPaymentMethod(paymentMethod);
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
