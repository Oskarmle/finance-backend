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

export class CreateEntryDto {
  @IsNumber()
  amount: number;

  @IsString()
  title: string;

  @IsDate()
  @Transform(({ value }) => new Date(`${value}T00:00:00Z`))
  datetime: Date;

  @IsString()
  paymentMethod: string;

  @ValidateNested()
  @Type(() => Category)
  category: DeepPartial<Category>;

  @IsInt()
  userEntityId: number;
}
