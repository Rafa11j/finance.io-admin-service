import { IFindCategoryPaginated } from '@categories/interfaces/find-category-paginated';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';
import { IPaymentMethodResponse } from '@payment-method/interfaces/payment-method-response';
import { IPaginated } from '@shared/models/paginated';
import { translatePaymentType } from '@shared/models/translatePaymentMethods';

@Injectable()
export class FindAllPaymentMethodsPaginatedService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly paymentMethodRepository: IPaymentMethodRepository,
  ) {}

  async execute({
    user_id,
    page,
    size,
  }: IFindCategoryPaginated): Promise<IPaginated<IPaymentMethodResponse>> {
    const [paymentMethods, count] =
      await this.paymentMethodRepository.findAllPaginated({
        page: Number(page) * Number(size),
        size: Number(size),
        user_id,
      });

    const total_pages = Math.ceil(count / Number(size));
    const data = paymentMethods.map(paymentMethod =>
      this.buildPaymentMethod(paymentMethod),
    );

    return {
      data,
      page: Number(page),
      elements_in_page: paymentMethods.length,
      elements_per_page: Number(size),
      total_elements: count,
      total_pages,
      first_page: Number(page) === 0,
      last_page: Number(page) === total_pages - 1,
    };
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
