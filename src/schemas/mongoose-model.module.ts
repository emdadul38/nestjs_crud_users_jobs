import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerSchema, EMPLOYER_MODEL } from './employer';
import { JOB_MODEL, JobSchema } from './job/job.schema';
import { StudentSchema, STUDENT_MODEL } from './student';
import { USER_MODEL, UserSchema } from './user/user.schema';

const MODULES = [
  { 
    name: USER_MODEL, 
    schema: UserSchema,
    discriminators: [
      { name: EMPLOYER_MODEL, schema: EmployerSchema },
      { name: STUDENT_MODEL, schema: StudentSchema }
    ],
  },
  { name: JOB_MODEL, schema: JobSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODULES)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}


// For discriminator rules
// 1. Set discriminator Key on Parent Schema ( User Schema )
// 2. Register Discriminator on Parent Model ( User Model )