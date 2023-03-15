import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('0 49 * * * *') // every hour, at the start of the 49th minute
  cronjobSyncData() {
    this.logger.log('every Second');
    this.syncUsersDataFromBackend();
  }

  syncUsersDataFromBackend() {
    console.log('hello');
  }
}
