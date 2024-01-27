import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'john frade',
    description: 'name of the user',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'a@gmail.com',
    description: 'email of the user',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '******',
    description: 'password of the user',
  })
  @IsString()
  readonly password: string;
}
