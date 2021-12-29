import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { AccountType } from '../enums/account';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nome obrigatório' })
  name: string;

  @ApiProperty()
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty()
  @IsNumber()
  balance: number;
}
