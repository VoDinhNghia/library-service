import { Test, TestingModule } from '@nestjs/testing';
import { ComputersMgtService } from './computers-mgt.service';

describe('ComputersMgtService', () => {
  let service: ComputersMgtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComputersMgtService],
    }).compile();

    service = module.get<ComputersMgtService>(ComputersMgtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
