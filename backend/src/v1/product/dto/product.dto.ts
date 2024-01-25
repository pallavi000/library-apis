import { IsNumber, IsString } from 'class-validator';

export class productDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly detail: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly categoryId: number;
}
