import { DataSource } from 'typeorm';
import { job } from './Entity/Job';
import { User } from './Entity/user';
export var map = new Map();

const defaultDB = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '7454939169',
  database: 'default',
  entities: [User],
  synchronize: true,
});

const DB1 = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '7454939169',
  database: 'DB1',
  entities: [job],
  synchronize: true,
});
const DB3 = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '7454939169',
  database: 'DB3',
  entities: [job],
  synchronize: true,
});
const DB2 = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '7454939169',
  database: 'DB2',
  entities: [job],
  synchronize: true,
});

export function initializeConnections() {
  map.set('defaultDB', defaultDB);
  map.set('DB1', DB1);
  map.set('DB2', DB2);
  map.set('DB3', DB3);
  for (let entry of map.entries()) {
    entry[1]
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized! for - ', entry[0]);
      })
      .catch((err) => {
        console.error(
          'Error during Data Source initialization for -',
          entry[0],
          err,
        );
      });
  }
}
