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

  @Cron('0 0 04,12,23 * * *') // run at 04, 12, 23h every day
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
    console.log(users);
    try {
      const userDto = [];
      for (const user of users) {
        const dto = {
          email: user?.email,
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          middleName: user?.profile?.middleName,
          userId: user?._id,
          isDeleted: user?.isDeleted,
          code: user?.profile?.code,
          profileId: user?.profile?._id,
          passWord: user?.passWord,
          avatar: user?.profile?.avatar,
          status: user?.status,
          role: user?.role,
          mobile: user?.profile?.mobile,
        };
        const checkUser = await this.usersRepository.findOneBy({
          userId: user?._id,
        });
        if (checkUser) {
          await this.usersRepository.update(checkUser.id, {
            ...dto,
            updatedAt: new Date(),
          });
        } else {
          userDto.push(dto);
        }
      }
      const results = this.usersRepository.create(userDto);
      await this.usersRepository.save(results);
      this.logger.log('Sync data success!');
    } catch (error) {
      console.log(error);
      this.logger.log('Sync data failed!');
    }
  }
}
