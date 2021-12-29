import { ApiProperty } from '@nestjs/swagger';
import { FormPaymentType } from '@transactions/types/formPaymentType';
import { TransactionType } from '@transactions/types/transactionType';

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsIn,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Categoria obrigatória' })
  category_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Valor obrigatório' })
  value: number;

  @ApiProperty()
  @IsIn(['income', 'expense'])
  @IsNotEmpty({ message: 'Tipo obrigatório' })
  type: TransactionType;

  @ApiProperty()
  @IsIn(['cash', 'installments'])
  @IsNotEmpty({ message: 'Forma de pagamento obrigatório' })
  form_payment: FormPaymentType;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Conta obrigatória' })
  account_id: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty({ message: 'Data obrigatória' })
  date: Date;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  payment_method_id?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  number_installments?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Descrição obrigatória' })
  description: string;
}
