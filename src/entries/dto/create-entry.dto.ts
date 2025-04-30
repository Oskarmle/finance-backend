import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DeepPartial } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntryDto {
  @ApiProperty({ example: 199, description: 'Amount of the entry' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Food', description: 'Title of the entry' })
  @IsString()
  title: string;

  @ApiProperty({
    example: '2025-05-24 15:00:00',
    description: 'Title of the entry',
  })
  @IsDate()
  @Transform(({ value }) => new Date(`${value}T00:00:00Z`))
  datetime: Date;

  @ApiProperty({ example: 'Cash', description: 'Payment method of the entry' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    type: () => Category,
    description: 'Category of the entry',
  })
  @ValidateNested()
  @Type(() => Category)
  category: DeepPartial<Category>;

  @IsInt()
  userEntityId: number;
}
