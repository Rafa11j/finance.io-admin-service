import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from '@payment-method/entities/payment-method';
import { ICreatePaymentMethod } from '@payment-method/interfaces/create-payment-method';
import { IFindPaymentMethodPaginated } from '@payment-method/interfaces/find-payment-method-paginated';
import { PaymentMethodEntityRepository } from '@payment-method/interfaces/payment-method-entity-repository';
import { IPaymentMethodRepository } from '@payment-method/interfaces/payment-method-repository';

@Injectable()
export class PaymentMethodRepository implements IPaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethodEntityRepository)
    private readonly paymentMethodRepository: PaymentMethodEntityRepository,
  ) {}

  async findAll(user_id: string): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find({
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findAllPaginated({
    page,
    size,
    user_id,
  }: IFindPaymentMethodPaginated): Promise<[PaymentMethod[], number]> {
    return this.paymentMethodRepository.findAndCount({
      skip: page,
      take: size,
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<PaymentMethod> {
    return this.paymentMethodRepository.findOne(id);
  }

  async create({
    name,
    types,
    user_id,
  }: ICreatePaymentMethod): Promise<PaymentMethod> {
    const paymentMethod = this.paymentMethodRepository.create({
      name,
      user_id,
      types: types.join(', '),
    });

    await this.paymentMethodRepository.save(paymentMethod);
    return paymentMethod;
  }

  async update(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async delete(id: string): Promise<void> {
    await this.paymentMethodRepository.softDelete(id);
  }
}
