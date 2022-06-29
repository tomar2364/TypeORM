import { DataSource, DataSourceOptions, Driver, EntityManager } from 'typeorm';
import { job } from './Entity/Job';
import { User } from './Entity/user';
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '7454939169',
  database: 'default',
  entities: [job],
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
const isInitialized: boolean = dataSource.isInitialized;
// console.log(isInitialized);
// const driver: Driver = dataSource.driver;
// console.log(driver);
// const manager: EntityManager = dataSource.manager;
// you can call manager methods, for example find:
// const users = await manager.find()

// await dataSource.initialize()
