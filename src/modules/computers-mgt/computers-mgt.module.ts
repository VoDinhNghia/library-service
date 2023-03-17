import { Module } from '@nestjs/common';
import { ComputersMgtController } from './computers-mgt.controller';
import { ComputersMgtService } from './computers-mgt.service';

@Module({
  controllers: [ComputersMgtController],
  providers: [ComputersMgtService]
})
export class ComputersMgtModule {}
