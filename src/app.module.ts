import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CronjobModule } from './modules/cronjob/cronjob.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mgt_library',
      entities: [],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
