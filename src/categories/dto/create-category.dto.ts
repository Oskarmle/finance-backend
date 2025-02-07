import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
