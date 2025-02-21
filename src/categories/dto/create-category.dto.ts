import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category: string;

  @IsBoolean()
  isCompleted: boolean;
}
