import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [HttpModule],
  providers: [CronjobService],
})
export class CronjobModule {}
