import { Module } from '@nestjs/common';
import { BookSheftsController } from './book-shefts.controller';
import { BookSheftsService } from './book-shefts.service';

@Module({
  controllers: [BookSheftsController],
  providers: [BookSheftsService],
})
export class BookSheftsModule {}
