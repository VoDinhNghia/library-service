import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { keyAccessBackend, linkAccessService } from 'src/constants/constant';
import { Http } from 'src/utils/http.sync-service';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  @Cron('0 14 * * * *')
  public cronjobSyncData() {
    this.syncUsersDataFromBackend();
  }

  async syncUsersDataFromBackend() {
    const url = `${linkAccessService.BACKEND}/api/sync-service/users`;
    const users = await new Http().get(url, keyAccessBackend);
    if (!users) {
      this.logger.log('Call BE failed!');
      return null;
    }
    try {
      const userIds = users.map((user: any) => {
        return String(user?._id);
      });
      console.log(userIds);
      await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from('users')
        .where('users.userId IN (:...userId)', { userId: userIds })
        .execute();
      const userDto = users.map((user: any) => {
        const dto = {
          email: user?.email,
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          middleName: user?.profile?.middleName,
          userId: user?._id,
          code: user?.profile?.code,
          profileId: user?.profile?._id,
          passWord: user?.passWord,
          avatar: user?.profile?.avatar,
          status: user?.status,
          role: user?.role,
          mobile: user?.profile?.mobile,
        };
        return dto;
      });
      const results = this.usersRepository.create(userDto);
      await this.usersRepository.save(results);
      this.logger.log('Sync data success!');
    } catch (error) {
      console.log(error);
      this.logger.log('Sync data failed!');
    }
  }
}
