import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

// import getEnv
import { getEnv } from '../utils/index';
export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3301,
  username: getEnv.username,
  password: getEnv.password,
  database: getEnv.database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
