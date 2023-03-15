import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CronjobModule } from './modules/cronjob/cronjob.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: parseInt(config.get('MYSQL_PORT')),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASS'),
        database: config.get('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    CronjobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
