import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmployersModule } from './employers/employers.model';
import { DatabaseModule } from './infra/mongoose/database.module';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModelsModule } from './schemas/mongoose-model.module';
import { StudentsModule } from './students/students.model';
import { UsersModule } from './users/users.module';
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
