import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Users])],
  providers: [CronjobService],
})
export class CronjobModule {}
