import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { keyAccessBackend, linkAccessService } from 'src/constants/constant';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {}

  @Cron('0 54 * * * *')
  cronjobSyncData() {
    this.logger.log('every Second');
    this.syncUsersDataFromBackend();
  }

  async syncUsersDataFromBackend() {
    try {
      const getUsers = this.httpService.get(
        `${linkAccessService.BACKEND}/api/sync-service/users`,
        {
          headers: {
            'key-access-secret': keyAccessBackend,
          },
        },
      );
      const results = await getUsers.toPromise();
      console.log('results', results?.data?.data);
      return results?.data?.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
