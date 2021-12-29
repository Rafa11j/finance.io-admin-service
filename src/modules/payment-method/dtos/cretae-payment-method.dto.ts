import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodsTypes } from '@payment-method/enums/payment-methods';
import { IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nome obrigatório' })
  name: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(PaymentMethodsTypes, { each: true })
  types: PaymentMethodsTypes[];
}
