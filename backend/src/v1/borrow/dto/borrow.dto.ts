import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { BookEntity } from 'src/v1/book/entity/book.entity';
import { UserEntity } from 'src/v1/user/entity/user.entity';

export class borrowDto {
  @ApiProperty({
    example: 1,
    description: 'id of borrow book',
  })
  @IsNumber()
  book: BookEntity;

  @ApiProperty({
    example: 1,
    description: 'id of user',
  })
  @IsNumber()
  user: UserEntity;

  @ApiProperty({
    example: '23/01/2024',
    description: 'book borrow date',
  })
  @IsString()
  borrowDate: Date;

  @ApiProperty({
    example: '23/01/2024',
    description: 'book return date ',
  })
  @IsString()
  returnDate: Date;
}
