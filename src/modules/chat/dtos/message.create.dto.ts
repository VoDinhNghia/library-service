import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ required: true })
  conversationId?: string;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  userSendId?: string;

  @ApiProperty()
  userReceiveId?: string;
}
