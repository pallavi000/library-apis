import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { BookEntity } from "../../book/entity/book.entity";
import { UserEntity } from "../../user/entity/user.entity";

export class borrowDto {
  @ApiProperty({
    example: 1,
    description: "id of borrow book",
  })
  @IsNumber()
  book: number;

  @ApiProperty({
    example: 1,
    description: "id of user",
  })
  @IsNumber()
  user: number;

  @ApiProperty({
    example: "23/01/2024",
    description: "book borrow date",
  })
  @IsString()
  @IsOptional()
  borrowDate: Date;

  @ApiProperty({
    example: "23/01/2024",
    description: "book due date",
  })
  @IsString()
  dueDate: Date;

  @ApiProperty({
    example: "23/01/2024",
    description: "book return date ",
  })
  @IsOptional()
  @IsString()
  returnDate: Date;
}
