import { Controller } from '@nestjs/common';
import { LibraryServicesService } from './library-services.service';

@Controller('library-services')
export class LibraryServicesController {
  constructor(private readonly service: LibraryServicesService) {}
}
