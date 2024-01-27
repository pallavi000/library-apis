import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class bookDto {
  @IsString()
  title: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  author: number;

  @IsNumber()
  genra: number;

  @IsString()
  publisher: string;

  @IsNumber()
  publishedYear: number;
}
