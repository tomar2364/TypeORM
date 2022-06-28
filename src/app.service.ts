import { Injectable } from '@nestjs/common';
import { userInterface } from './interface/app.userInterface';
import { User } from './Entity/user';
import { map } from './app.dataSource';
import { job } from './Entity/Job';
@Injectable()
export class AppService {
  constructor() {} // private readonly jobPostrepository: Repository<JobPostEntity>, // @InjectRepository(JobPostEntity)

  // createJob(Data): Observable<jobPostInterface> {
  //   return from(this.jobPostrepository.save(Data));
  // }
  async getData(userId: number) {
    const firstUser = await map
      .get('defaultDB')
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :id', { id: userId })
      .getOne();
    console.log(firstUser);
    return firstUser.DBName;
  }
  async postData(data: userInterface) {
    await map
      .get('defaultDB')
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { userId: data.userId, DBName: data.DBName, userName: data.userName },
      ])
      .execute();
  }

  async getJobById(userId: number, Id: number) {
    const DBName = await this.getData(userId);
    console.log(DBName);
    const temp = map
      .get(DBName)
      .getRepository(job)
      .createQueryBuilder('job')
      .where('job.Id = :id', { id: Id })
      .getOne();
    return temp;
  }

  async deleteJobById(userId: number, Id: number) {
    const DBName = await this.getData(userId);
    console.log(DBName);
    const ans = await map
      .get(DBName)
      .createQueryBuilder()
      .delete()
      .from(job)
      .where('Id = :id', { id: Id })
      .execute();
    return ans;
  }

  async updateUser(userId: number, Id: number, Data) {
    const DBName = await this.getData(userId);
    await map
      .get(DBName)
      .createQueryBuilder()
      .update(job)
      .set({
        JobName: Data.jobName,
      })
      .where('Id = :id', { id: Id })
      .execute();
  }
  // async clearJobs() {
  //   await this.jobPostrepository.clear();
  // }
}
