import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  updatedBy?: string;

  @ApiProperty()
  createdBy?: string;

  @ApiProperty()
  deletedBy?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  middleName?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  profileId?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  passWord?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  mobile?: string;
}
