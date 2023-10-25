import { Controller } from '@nestjs/common';
import { LibraryServicesService } from './library-services.service';
import { libraryServiceController } from 'src/constants/constants.controller.name';
import { ApiTags } from '@nestjs/swagger';

@Controller(libraryServiceController.name)
@ApiTags(libraryServiceController.tag)
export class LibraryServicesController {
  constructor(private readonly service: LibraryServicesService) {}
}
