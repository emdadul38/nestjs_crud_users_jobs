import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { EmployersModule } from './modules/employers/employers.model';
import { DatabaseModule } from './modules/infra/mongoose/database.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { MongooseModelsModule } from './modules/schemas/mongoose-model.module';
import { StudentsModule } from './modules/students/students.model';
import { UsersModule } from './modules/users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    JobsModule,
    MongooseModelsModule,
    EmployersModule,
    StudentsModule,
  ],
})
export class AppModule {}
