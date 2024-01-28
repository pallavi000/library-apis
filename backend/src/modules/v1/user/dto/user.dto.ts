import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, isEmail } from 'class-validator';

export class authorDto {
  @ApiProperty({
    example: 'Jonas',
    description: 'Name  of user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'a@gmail.com',
    description: 'Email  of user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '******',
    description: 'password of Author',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '+358-46****',
    description: 'phone of user',
  })
  @IsString()
  phone: string;
}
