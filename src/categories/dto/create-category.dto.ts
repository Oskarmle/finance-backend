import { IsInt, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category: string;

  @IsInt()
  userEntityId: number;
}
