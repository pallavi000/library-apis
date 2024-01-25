import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
