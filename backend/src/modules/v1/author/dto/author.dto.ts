import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class authorDto {
  @ApiProperty({
    example: 'Jonas',
    description: 'Name  of Author',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Image Link',
    description: 'Image  of Author',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Life is beautiful',
    description: 'Bio of Author',
  })
  @IsString()
  bio: string;
}
