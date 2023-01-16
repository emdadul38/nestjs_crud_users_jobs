import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [UsersModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
