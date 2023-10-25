import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibraryDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false, default: '2023-02-17' })
  foundYear?: Date;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  librarian?: number;
}
