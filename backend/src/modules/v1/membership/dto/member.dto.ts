import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../../user/entity/user.entity';

export class memberDto {
  @ApiProperty({
    example: 'Regular',
    description: 'membership type',
  })
  @IsString()
  memberType: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'membership start Date',
  })
  @IsString()
  memberSince: Date;

  @ApiProperty({
    example: '2024-01-01',
    description: 'membership start Date',
  })
  @ApiProperty({
    example: 1,
    description: 'id of user',
  })
  @IsNumber()
  user: UserEntity;
}
