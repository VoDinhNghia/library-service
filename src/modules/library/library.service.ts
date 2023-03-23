import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { numberIdLibrary } from 'src/constants/constant';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dtos/library.create.dto';
import { UpdateLibraryDto } from './dtos/library.update.dto';
import { Library } from './entities/library.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
  ) {}

  async initLibrary(libraryDto: CreateLibraryDto): Promise<void> {
    const existed = await this.libraryRepository.findOneBy({
      numberId: numberIdLibrary,
    });
    if (!existed) {
      const result = this.libraryRepository.create(libraryDto);
      await this.libraryRepository.save(result);
    }
  }

  async updateLibrary(libraryDto: UpdateLibraryDto): Promise<Library> {
    const dto: Record<string, any> = {
      ...libraryDto,
      updatedAt: new Date(),
    };
    await this.libraryRepository.update({ numberId: numberIdLibrary }, dto);
    const result = await this.getLibraryInfo();
    return result;
  }

  async getLibraryInfo(): Promise<Library> {
    const result = await this.libraryRepository.findOne({
      where: { numberId: numberIdLibrary },
      relations: { librarian: true },
    });
    if (!result) {
      new CommonException(404, 'Room not found.');
    }
    return result;
  }
}
