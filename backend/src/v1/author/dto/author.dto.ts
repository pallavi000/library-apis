import { IsString } from 'class-validator';

export class authorDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  bio: string;
}
