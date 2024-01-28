import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class genraDto {
  @ApiProperty({
    example: 'Drama',
    description: 'Genre of Book',
  })
  @IsString()
  name: string;
}
