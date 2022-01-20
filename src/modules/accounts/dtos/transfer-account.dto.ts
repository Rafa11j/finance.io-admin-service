import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransferAccountDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Valor obrigatório' })
  value: number;
}
