import { Module } from '@nestjs/common';
import { LibraryServicesController } from './library-services.controller';
import { LibraryServicesService } from './library-services.service';

@Module({
  controllers: [LibraryServicesController],
  providers: [LibraryServicesService],
})
export class LibraryServicesModule {}
