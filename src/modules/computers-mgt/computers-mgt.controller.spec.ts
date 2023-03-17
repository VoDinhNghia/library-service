import { Test, TestingModule } from '@nestjs/testing';
import { ComputersMgtController } from './computers-mgt.controller';

describe('ComputersMgtController', () => {
  let controller: ComputersMgtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComputersMgtController],
    }).compile();

    controller = module.get<ComputersMgtController>(ComputersMgtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
