import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { AuthorEntity } from "../../author/entity/authot.entity";
import { GenraEntity } from "../../genra/entity/genra.entity";

export class bookDto {
  @ApiProperty({
    example: "Deep Work",
    description: "title of the Book",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: true,
    description: "is book available",
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    example: 1,
    description: "author id of the Book",
  })
  @IsNumber()
  author: AuthorEntity;

  @ApiProperty({
    example: 1,
    description: "genra id of the Book",
  })
  @IsNumber()
  genra: GenraEntity;

  @ApiProperty({
    example: "Jonas publication",
    description: "publication house of the Book",
  })
  @IsString()
  publisher: string;

  @ApiProperty({
    example: 2023,
    description: "book published  year",
  })
  @IsNumber()
  publishedYear: number;
}
