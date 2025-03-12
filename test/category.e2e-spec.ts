import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let categoriesRepository: Repository<Category>;
  let categoriesService: CategoriesService; // WHYYYYY

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Category])],
    }).compile();

    categoriesService = moduleFixture.get(CategoriesService);
    categoriesRepository = moduleFixture.get(getRepositoryToken(Category));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Create category', () => {
    it('Should create a category', async () => {
      const newCategory = { category: 'TestCategory' };

      const { body } = await request(app.getHttpServer())
        .post('/categories')
        .send(newCategory)
        .expect(201);

      expect(body.category).toEqual('TestCategory');
      expect(body.id).toBeDefined();
    });

    it('Should fail to create category', async () => {
      const badCategory = { title: 'TestCategory2' };

      const { body } = await request(app.getHttpServer())
        .post('/categories')
        .send(badCategory)
        .expect(500);

      expect(body.id).toBeUndefined();
    });
  });

  afterAll(async () => {
    await categoriesRepository.query(
      "DELETE FROM category WHERE category = 'TestCategory'",
    );
    app.close();
  });
});
