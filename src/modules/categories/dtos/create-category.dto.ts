import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nome obrigatório' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Cor obrigatória' })
  color: string;
}
