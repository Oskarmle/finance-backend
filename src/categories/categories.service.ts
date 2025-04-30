import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { userEntityId, ...categoryData } = createCategoryDto;

    const user = await this.userEntityRepository.findOne({
      where: { id: userEntityId },
    });
    const newCategory = this.categoryRepository.create({
      ...categoryData,
      userEntity: user,
    });

    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['entries'] });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
