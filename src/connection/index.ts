import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

export const connection = async (): Promise<DataSource | null> => {
  try {
    const dataApp = await AppDataSource.initialize();
    console.log('database app connected!');
    return dataApp;
  } catch (error) {
    console.error('error: ', error);
  }
  return null;
};
