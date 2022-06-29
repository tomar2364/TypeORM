import { Injectable } from '@nestjs/common';
import { userInterface } from './interface/app.userInterface';
import { User } from './Entity/user';
// import { map } from './app.dataSource';
import { job } from './Entity/Job';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class AppService {
  private dataSourceOptions: DataSourceOptions;
  private dataSource;
  constructor() {
    this.dataSourceOptions = {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '7454939169',
      database: 'default',
      entities: [job],
      synchronize: true,
    };
  } // private readonly jobPostrepository: Repository<JobPostEntity>, // @InjectRepository(JobPostEntity)
  async setDataSourceOptions(uid: number) {
    this.dataSourceOptions = {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '7454939169',
      database: 'default',
      entities: [job],
      synchronize: true,
    };
  }
  async createConnection() {
    this.dataSource = new DataSource(this.dataSourceOptions);
    await this.dataSource.initialize();
  }

  async createJob(uid: number, Data) {
    await this.setDataSourceOptions(uid);
    await this.createConnection();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // console.log(await queryRunner.query('Insert into job values(5,5)'));
    const users = await queryRunner.manager.find(job);
    await queryRunner.startTransaction();
    try {
      // execute some operations on this transaction:
      await queryRunner.manager.save(job, Data);

      // commit transaction now:
      await queryRunner.commitTransaction();
      console.log(await queryRunner.query('SELECT * FROM job'));
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    await this.dataSource.destroy();
  }

  async getData(uid: number) {
    await this.setDataSourceOptions(uid);
    await this.createConnection();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let data;
    try {
      // execute some operations on this transaction:
      data = await queryRunner.manager.find(job);

      // commit transaction now:

      console.log(await queryRunner.query('SELECT * FROM job'));
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    await this.dataSource.destroy();
    return data;
  }
  // async postData(data: userInterface) {
  //   await map
  //     .get('defaultDB')
  //     .createQueryBuilder()
  //     .insert()
  //     .into(User)
  //     .values([
  //       { userId: data.userId, DBName: data.DBName, userName: data.userName },
  //     ])
  //     .execute();
  // }

  async getJobById(uid: number, Id: number) {
    await this.setDataSourceOptions(uid);
    await this.createConnection();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // console.log(await queryRunner.query('Insert into job values(5,5)'));
    const users = await queryRunner.manager.find(job, { id: Id });
    await queryRunner.startTransaction();
    try {
      // execute some operations on this transaction:
      // await queryRunner.manager.save(job, Data);

      // commit transaction now:
      await queryRunner.commitTransaction();
      console.log(await queryRunner.query('SELECT * FROM job'));
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    await this.dataSource.destroy();
  }

  // async deleteJobById(userId: number, Id: number) {
  //   const DBName = await this.getData(userId);
  //   console.log(DBName);
  //   const ans = await map
  //     .get(DBName)
  //     .createQueryBuilder()
  //     .delete()
  //     .from(job)
  //     .where('Id = :id', { id: Id })
  //     .execute();
  //   return ans;
  // }

  // async updateUser(userId: number, Id: number, Data) {
  //   const DBName = await this.getData(userId);
  //   await map
  //     .get(DBName)
  //     .createQueryBuilder()
  //     .update(job)
  //     .set({
  //       JobName: Data.jobName,
  //     })
  //     .where('Id = :id', { id: Id })
  //     .execute();
  // }
  // async clearJobs() {
  //   await this.jobPostrepository.clear();
  // }
}
