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

  @Cron('0 40 * * * *')
  public cronjobSyncData() {
    this.syncUsersDataFromBackend();
  }

  async syncUsersDataFromBackend() {
    // dữ liệu ít thì không vấn đề gì nhưng dữ liệu nhiều thì có (tìm cách migrate data 1 lần duy nhất) sau đó =>
    // list users được lấy từ BE theo field updateAt, createdAt, bên này chỉ làm nhiệm vụ update hoặc tạo nếu tìm không thấy
    const url = `${linkAccessService.BACKEND}/api/sync-service/users`;
    const users = await new Http().get(url, keyAccessBackend);
    if (!users) {
      this.logger.log('Call BE failed!');
      return null;
    }
    try {
      await this.usersRepository.clear();
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
    } catch {
      this.logger.log('Sync data failed!');
    }
  }
}
