import { IsString } from 'class-validator';

export class genraDto {
  @IsString()
  name: string;
}
