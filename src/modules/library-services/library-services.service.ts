import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from './entities/library-services.entities';
import { ServiceGroupStudy } from './entities/library-services.group-study.entity';

@Injectable()
export class LibraryServicesService {
  constructor(
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
    @InjectRepository(ServiceGroupStudy)
    private readonly groupRepository: Repository<ServiceGroupStudy>,
  ) {}
}
