import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';
import { IPaymentMethodResponse } from '@payment-method/interfaces/payment-method-response';
import { translatePaymentType } from '@shared/models/translatePaymentMethods';

@Injectable()
export class FindPaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute(id: string): Promise<IPaymentMethodResponse> {
    const paymentMethod = await this.paymentMethodRepository.findById(id);

    if (!paymentMethod) {
      throw new HttpException(
        'Método de pagamento não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

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
      typesFormated: types.split(', '),
    };
  }

  private formatTypes(types: string): string {
    const typesList = types.split(', ');

    return typesList.map(type => translatePaymentType(type)).join(', ');
  }
}
