import { Category } from 'src/categories/entities/category.entity';
import { DeepPartial } from 'typeorm';

export class CreateEntryDto {
  amount: number;

  title: string;

  datetime: Date;

  currency: string;

  paymentMethod: string;

  category: DeepPartial<Category>;
}
