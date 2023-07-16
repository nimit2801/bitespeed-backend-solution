import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Contact } from './entity/Contact';

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
  logging: true,
  entities: [Contact],
  migrations: [],
  subscribers: [],
});
