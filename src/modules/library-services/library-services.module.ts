import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entities/library-services.entities';
import { ServiceGroupStudy } from './entities/library-services.group-study.entity';
import { LibraryServicesController } from './library-services.controller';
import { LibraryServicesService } from './library-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Services, ServiceGroupStudy])],
  controllers: [LibraryServicesController],
  providers: [LibraryServicesService],
})
export class LibraryServicesModule {}
