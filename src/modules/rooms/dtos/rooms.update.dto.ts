import { ApiProperty } from '@nestjs/swagger';
import { EtypeRoom } from 'src/constants/constant';

export class UpdateRoomDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false, default: 100 })
  capacity: number;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false, default: false })
  status: boolean;

  @ApiProperty({ default: EtypeRoom.BOOK, required: false })
  type?: string;
}
