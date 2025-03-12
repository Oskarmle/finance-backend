import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { AppModule } from '../src/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../src/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersRepository: Repository<UserEntity>;
  let usersService: UsersService; // WHYYYY
  let authService: AuthService; // WHYYYY

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([UserEntity])],
    }).compile();

    usersService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
    usersRepository = moduleFixture.get(getRepositoryToken(UserEntity));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Signup', () => {
    it('Should create a user', async () => {
      const user = { username: 'testPerson99', password: '12345678' };

      const { body } = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user)
        .expect(201);

      expect(body.username).toEqual('testPerson99');
      expect(body.role).toEqual('USER');
      expect(body.id).toBeDefined();
    });
  });

  describe('Signin', () => {
    it('Should signin a user', async () => {
      const user = { username: 'testPerson99', password: '12345678' };

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(200);

      expect(body.access_token).toBeDefined();
    });

    it('Should fail to signin', async () => {
      const user = { username: 'testPerson99', password: 'abcdefgh' };

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(401);

      expect(body.access_token).toBeUndefined();
    });
  });

  afterAll(async () => {
    await usersRepository.query(
      "DELETE FROM user_entity WHERE username = 'testPerson99'",
    );
    app.close();
  });
});
