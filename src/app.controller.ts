import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { jobInterface } from './interface/jobInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // //get all the data
  @Get('')
  async getAllData(@Body() data: { uid: number }) {
    return await this.appService.getData(data);
  }
  // //insert
  @Post('/:id')
  createJob(@Param('id') uid: number, @Body() data: jobInterface) {
    return this.appService.createJob(uid, data);
  }
  // // //get by id
  @Get('/:id')
  getJobById(@Param('id') id: number, @Body() data) {
    return this.appService.getJobById(data.userId, id);
  }
  // // //delete
  @Delete('/:id')
  deleteUserById(@Param('id') id: number, @Body() data) {
    this.appService.deleteJobById(data.userId, id);
  }
  // //update
  @Patch('/:id')
  updateUserById(@Param('id') id: number, @Body() data: jobInterface) {
    return this.appService.updateUser(data.userId, id, data);
  }
  // @Delete()
  // clearData() {
  //   this.appService.clearJobs();
  // }
}
