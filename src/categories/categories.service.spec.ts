import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: jest.Mocked<Partial<Repository<Category>>>;

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([{ id: 1, name: 'Category 1' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Category),
          useValue: repository,
        },
        CategoriesService,
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  // Needs to be done
  describe('Categories', () => {
    it('should return all categories', async () => {
      const categories = await service.findAll();
      expect(categories).toEqual([{ id: 1, name: 'Category 1' }]);
    });

    it('should return a category by id', async () => {
      const category = await service.findOne(1);
      expect(category).toEqual({ id: 1, name: 'Category 1' });
    });
  });
});
