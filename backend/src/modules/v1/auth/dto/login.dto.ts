import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '*******',
    description: 'user password',
  })
  @IsString()
  password: string;
}
