import { DataSource, DataSourceOptions, Driver, EntityManager } from 'typeorm';

import { jsonData } from 'ormconfig';
import { job } from './Entity/Job';
import { Type } from './interface/typeInterface';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// export const dataSource = new DataSource(dataSourceOptions);
// const isInitialized: boolean = dataSource.isInitialized;
// console.log(isInitialized);
// const driver: Driver = dataSource.driver;
// console.log(driver);
// const manager: EntityManager = dataSource.manager;
// you can call manager methods, for example find:
// const users = await manager.find()

// await dataSource.initialize()
export let map = new Map<number, any>();
export const mapDataSource = () => {
  jsonData.forEach((val) => {
    let key: number = val.uid;

    let dataSourceOptions: PostgresConnectionOptions = {
      type: val.type,
      host: val.host,
      port: val.port,
      username: val.username,
      password: val.password,
      database: val.database,
      entities: [job],
      synchronize: true,
    };
    const dataSource = new DataSource(dataSourceOptions);

    map.set(key, dataSource);
  });
};
