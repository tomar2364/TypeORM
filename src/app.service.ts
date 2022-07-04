import { Injectable } from '@nestjs/common';
import { userInterface } from './interface/app.userInterface';
import { policyViolationsmail } from './Entity/policyviolationsmails';
import { map } from './app.dataSource';
import { policyViolations } from './Entity/policyviolations';
import { policyVoilationInterface } from './interface/jobInterface';
@Injectable()
export class AppService {
  private dataSource;
  private insertData: policyVoilationInterface[] = [
    {
      snapshotid: 0,
      domainid: 1,
      collaborator: '[]',
      owner: 'clark@testingtap.info',
      violationtime: 1656581798,
      violationtype: 10,
      exsitingaccess: 4,
      allowedaccess: 4,
      policyid: 41398,
      cloudid: 1,
      summarydetails:
        '{"Description":"Confidential Data","Match":["SSN"],"encodedMatch":["SSN"]}',
      thresholdpriority: 2,
      frequency: 1,
      isresolved: 0,
      isfalse: 0,
      isflag: 0,
      confidencelevel: 80,
      begin_document: '',
      end_document:
        '89,s 91,struggling 98,in 105,various 113,subjects 122,including 132,math 137,and 141,science 149,his 150,is 153,gpa 160,4 162,but 170,sat 174,score 180,was 184,2000',
      intent1: 0,
      intent2: 0,
      intent3: 0,
      intent4: 0,
      intent5: 0,
    },
  ];
  constructor() {} // private readonly jobPostrepository: Repository<JobPostEntity>, // @InjectRepository(JobPostEntity)

  async createConnection(uid) {
    uid = parseInt(uid);

    this.dataSource = map.get(uid);
    await this.dataSource.initialize();
  }
  async destroyConnection(uid) {
    await this.dataSource.destroy();
  }

  async createPolicyViolations(uid: number, Data: policyVoilationInterface) {
    await this.createConnection(uid);
    const queryRunner = this.dataSource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    if (Data.violationid != undefined) {
      let res = await queryRunner.query(
        `SELECT count(*) FROM dbo.policyviolations as  pv where violationid = ${Data.violationid}`,
      );
      if (res.count != 0) {
        console.log('violationid already exsist');
        await queryRunner.release();
        this.destroyConnection(uid);
        return;
      }
    }

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      await queryRunner.manager.save(policyViolations, this.insertData);

      // commit transaction now:
      await queryRunner.commitTransaction();
      // console.log(users);
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
      data = await queryRunner.manager.find(policyViolations);

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
    const users = await queryRunner.manager.findBy(policyViolations, {
      id: Id,
    });
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
    const users = await queryRunner.manager.findBy(policyViolations, {
      id: Id,
    });
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
    const users = await queryRunner.manager.findBy(policyViolations, {
      id: Id,
    });
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
