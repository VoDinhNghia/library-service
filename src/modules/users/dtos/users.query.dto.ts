import { ApiProperty } from '@nestjs/swagger';
import { QueryPagination } from 'src/utils/page.query.pagination.dto';

export class UserQueryDto extends QueryPagination {
  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  role?: string;
}
