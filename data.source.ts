import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Category } from 'src/categories/entities/category.entity';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // autoLoadEntities: true,
  synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  // entities: ['dist/**/*.entity{.ts,.js}'], // This broke the e2e test
  entities: [UserEntity, Entry, Category], // This makes the e2e test work
  migrations: ['dist/src/migrations/*{.ts,.js}'],
};

const datasource = new DataSource(dbConfig as DataSourceOptions);
export default datasource;

// export const dbConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: isTest ? process.env.DB_USERNAME_TEST : process.env.DB_USERNAME,
//   password: isTest ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD,
//   database: isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME,
//   // autoLoadEntities: true,
//   synchronize: isTest ? true : false, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
//   // entities: ['dist/**/*.entity{.ts,.js}'], // This broke the e2e test
//   entities: [UserEntity, Entry, Category], // This makes the e2e test work
//   migrations: ['dist/src/migrations/*{.ts,.js}'],
// };

// const datasource = new DataSource(dbConfig as DataSourceOptions);
// export default datasource;
