import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';

@Injectable()
export class DeletePaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const paymentMethod = await this.paymentMethodRepository.findById(id);

    if (!paymentMethod) {
      throw new HttpException(
        'Método de pagamento não encontrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.paymentMethodRepository.delete(id);
  }
}
