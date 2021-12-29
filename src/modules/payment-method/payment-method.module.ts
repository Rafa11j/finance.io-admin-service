import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method';
import { PaymentMethodEntityRepository } from './interfaces/payment-method-entity-repository';
import { PaymentMethodController } from './payment-method.controller';
import { paymentMethodsProviders } from './providers';
import { CreatePaymentMethodService } from './services/create-payment-method.service';
import { DeletePaymentMethodService } from './services/delete-payment-method.service';
import { FindAllPaymentMethodService } from './services/find-all-payment-method.service';
import { FindAllPaymentMethodsPaginatedService } from './services/find-all-payment-methods-paginated.service';
import { FindPaymentMethodService } from './services/find-payment-method.service';
import { UpdatePaymentMethodService } from './services/update-payment-method.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethod, PaymentMethodEntityRepository]),
  ],
  controllers: [PaymentMethodController],
  providers: [
    ...paymentMethodsProviders,
    CreatePaymentMethodService,
    FindAllPaymentMethodService,
    FindAllPaymentMethodsPaginatedService,
    FindPaymentMethodService,
    UpdatePaymentMethodService,
    DeletePaymentMethodService,
  ],
})
export class PaymentMethodModule {}
