import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobDocument, JOB_MODEL } from '../schemas/job';
import { Model } from 'mongoose';
import { CreateJobDTO, UpdateJobDTO } from './dto';
import { UsersService } from '../users/users.service';
import { ACCOUNT_TYPE } from '../../shared/constants';


@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JOB_MODEL) private readonly jobModel: Model<JobDocument>,
    private readonly usersService: UsersService
  ) {}

  async create(createJobDto: CreateJobDTO) {
    try {
      const user = await this.usersService.findOne(createJobDto.userId);
      if (!user) {
        throw new Error('User not found');
      } else if(user.accountType !== ACCOUNT_TYPE.EMPLOYER){
        throw new Error('User is not an employer');
      }

      return this.jobModel.create({
        ...createJobDto,
        employer: createJobDto.userId
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.jobModel.find();
  }

  async findOne(id: string) {
    const job = await this.jobModel.findById(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDTO) {
    const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async remove(id: string) {
    const job = await this.jobModel.findByIdAndDelete(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return {
      _id: job._id,
    };
  }

}
