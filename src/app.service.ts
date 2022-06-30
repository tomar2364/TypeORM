import { Injectable } from '@nestjs/common';
import { userInterface } from './interface/app.userInterface';
import { User } from './Entity/user';
import { map } from './app.dataSource';
import { job } from './Entity/Job';
import { DataSource, DataSourceOptions } from 'typeorm';
import { jsonData } from '../ormconfig';
@Injectable()
export class AppService {
  private dataSource;
  constructor() {} // private readonly jobPostrepository: Repository<JobPostEntity>, // @InjectRepository(JobPostEntity)

  async createConnection(uid) {
    uid = parseInt(uid);

    this.dataSource = map.get(uid);
    await this.dataSource.initialize();
  }
  async destroyConnection(uid) {
    await this.dataSource.destroy();
  }

  async createJob(uid: number, Data) {
    await this.createConnection(uid);
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
    this.destroyConnection(uid);
  }

  async getData(Data) {
    await this.createConnection(Data.uid);
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
    await this.destroyConnection(Data.uid);
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
    await this.createConnection(uid);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    console.log(await queryRunner.query(`select * from job where Id = ${Id}`));
    const users = await queryRunner.manager.findBy(job, { id: Id });
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
    await this.destroyConnection(uid);
    return users;
  }

  async deleteJobById(uid: number, Id: number) {
    await this.createConnection(uid);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    console.log(await queryRunner.query(`delete from job where Id = ${Id}`));
    const users = await queryRunner.manager.findBy(job, { id: Id });
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
    await this.destroyConnection(uid);
    return users;
  }

  async updateUser(uid: number, Id: number, Data) {
    await this.createConnection(uid);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    console.log(typeof Data.jobName);
    console.log(
      await queryRunner.query(
        `update job set jobname =' ${Data.jobName} ' where Id = ${Id}`,
      ),
    );
    const users = await queryRunner.manager.findBy(job, { id: Id });
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
    await this.destroyConnection(uid);
    return users;
  }
  // async clearJobs() {
  //   await this.jobPostrepository.clear();
  // }
}
