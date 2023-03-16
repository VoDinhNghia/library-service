import { ApiProperty } from '@nestjs/swagger';
import { EtypeRoom } from 'src/constants/constant';

export class CreateRoomDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true, default: 100 })
  capacity: number;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: true, default: false })
  status: boolean;

  @ApiProperty({ default: EtypeRoom.BOOK, required: true })
  type?: string;
}
